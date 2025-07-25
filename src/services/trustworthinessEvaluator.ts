import type { TrustworthinessEvaluation } from "../types";
import {
  tokenize,
  analyzeSentiment,
  calculateReadabilityScore,
} from "../utils/textAnalysis";

/**
 * 주관적 표현 목록 (확장된 버전)
 * 카테고리별로 구분하여 더 정확한 분석 가능
 */
const SUBJECTIVE_EXPRESSIONS = {
  // 개인적 의견 표현
  opinion: [
    "생각한다",
    "느낌",
    "추측",
    "아마도",
    "개인적으로",
    "내 생각에",
    "내 관점에서",
    "~인 것 같다",
    "~처럼 보인다",
    "확신한다",
  ],

  // 강조 표현
  emphasis: [
    "분명히",
    "절대",
    "항상",
    "절대로",
    "전혀",
    "매우",
    "너무",
    "굉장히",
    "엄청나게",
    "훨씬",
    "최고",
    "최악",
    "가장",
    "제일",
  ],

  // 1인칭 표현
  firstPerson: [
    "나는",
    "내가",
    "나의",
    "우리는",
    "우리가",
    "우리의",
    "저는",
    "제가",
    "저의",
  ],

  // 감정 표현
  emotion: [
    "기쁘다",
    "슬프다",
    "화나다",
    "놀랍다",
    "실망스럽다",
    "만족스럽다",
    "불만이다",
    "좋아한다",
    "싫어한다",
    "사랑한다",
    "미워한다",
    "두렵다",
    "걱정된다",
    "기대된다",
  ],

  // 과장 표현
  exaggeration: [
    "엄청난",
    "대단한",
    "놀라운",
    "믿을 수 없는",
    "상상을 초월하는",
    "전례 없는",
    "혁명적인",
    "획기적인",
    "전무후무한",
    "최고의",
    "최상의",
    "최악의",
    "최저의",
  ],
};

// 주관적 표현 카테고리 목록 (디버깅 및 확장성을 위해 유지)
// const SUBJECTIVE_CATEGORIES = Object.keys(SUBJECTIVE_EXPRESSIONS);

/**
 * 신뢰성 키워드 목록 (확장된 버전)
 * 카테고리별로 구분하여 더 정확한 분석 가능
 */
const TRUST_KEYWORDS = {
  // 연구 및 증거 기반 표현
  research: [
    "연구에 따르면",
    "실험 결과",
    "조사 결과",
    "통계적으로",
    "과학적으로",
    "객관적으로",
    "전문가들은",
    "증거에 기반하여",
    "참고문헌",
    "인용",
    "출처",
    "데이터",
    "분석 결과",
    "연구팀은",
    "증명되었다",
    "검증되었다",
    "입증되었다",
    "발견되었다",
    "관찰되었다",
  ],

  // 학술적 표현
  academic: [
    "논문",
    "학술지",
    "저널",
    "출판물",
    "학회",
    "학계",
    "이론",
    "가설",
    "방법론",
    "결론",
    "요약",
    "서론",
    "본론",
    "결론",
    "초록",
    "개요",
    "참고 문헌",
  ],

  // 데이터 관련 표현
  data: [
    "데이터셋",
    "샘플",
    "표본",
    "모집단",
    "변수",
    "상관관계",
    "인과관계",
    "유의미한",
    "통계량",
    "평균",
    "중앙값",
    "표준편차",
    "분산",
    "백분위",
    "신뢰구간",
    "유의수준",
  ],

  // 객관적 사실 표현
  factual: [
    "사실상",
    "실제로",
    "현실적으로",
    "구체적으로",
    "명확하게",
    "정확하게",
    "정밀하게",
    "공식적으로",
    "합법적으로",
    "공인된",
    "인증된",
    "표준화된",
    "규격화된",
  ],
};

// 신뢰성 키워드 카테고리 목록 (디버깅 및 확장성을 위해 유지)
// const TRUST_CATEGORIES = Object.keys(TRUST_KEYWORDS);

/**
 * 텍스트에서 특정 표현 목록의 포함 횟수 계산 (최적화된 버전)
 * @param text 분석할 텍스트
 * @param terms 찾을 표현 목록
 * @param options 검색 옵션
 * @returns 표현 발견 횟수와 발견된 표현 목록
 */
const analyzeTermOccurrences = (
  text: string,
  terms: string[],
  options: { caseSensitive?: boolean; wholeWord?: boolean } = {}
): {
  count: number;
  found: Record<string, number>;
  categories?: Record<string, number>;
} => {
  const { caseSensitive = false, wholeWord = false } = options;
  const searchText = caseSensitive ? text : text.toLowerCase();
  const found: Record<string, number> = {};
  let totalCount = 0;

  // 정규표현식 최적화: 모든 표현을 한 번에 검색
  if (terms.length > 0) {
    // 검색 패턴 생성
    const patterns = terms.map((term) => {
      const searchTerm = caseSensitive ? term : term.toLowerCase();
      if (wholeWord) {
        // 단어 경계를 고려한 검색 (한글 및 영어 모두 지원)
        return `(^|[^\\p{L}\\p{N}])(${searchTerm.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        )})($|[^\\p{L}\\p{N}])`;
      } else {
        // 일반 검색
        return searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    });

    // 각 패턴별로 검색 (정규표현식 컴파일 최적화)
    for (let i = 0; i < terms.length; i++) {
      const term = terms[i];
      const pattern = patterns[i];
      const regex = new RegExp(pattern, caseSensitive ? "gu" : "giu");
      const matches = searchText.match(regex);

      if (matches) {
        const count = matches.length;
        found[term] = count;
        totalCount += count;
      }
    }
  }

  return { count: totalCount, found };
};

/**
 * 카테고리별 표현 분석
 * @param text 분석할 텍스트
 * @param expressionsByCategory 카테고리별 표현 목록
 * @param options 검색 옵션
 * @returns 카테고리별 발견 횟수와 전체 발견 횟수
 */
const analyzeCategorizedExpressions = (
  text: string,
  expressionsByCategory: Record<string, string[]>,
  options: { caseSensitive?: boolean; wholeWord?: boolean } = {}
): {
  totalCount: number;
  found: Record<string, number>;
  categoryCount: Record<string, number>;
} => {
  const found: Record<string, number> = {};
  const categoryCount: Record<string, number> = {};
  let totalCount = 0;

  // 각 카테고리별로 분석
  for (const [category, expressions] of Object.entries(expressionsByCategory)) {
    const result = analyzeTermOccurrences(text, expressions, options);

    // 발견된 표현 통합
    Object.entries(result.found).forEach(([term, count]) => {
      found[term] = count;
    });

    // 카테고리별 카운트 저장
    categoryCount[category] = result.count;
    totalCount += result.count;
  }

  return { totalCount, found, categoryCount };
};

/**
 * 문맥 기반 감정 분석 (개선된 버전)
 * @param text 분석할 텍스트
 * @returns 감정 분석 결과 (감정 점수, 주요 감정 표현)
 */
const analyzeEmotionalContext = (
  text: string
): {
  score: number;
  dominantEmotion: string;
  emotionalExpressions: string[];
} => {
  // 기본 감정 분석
  const sentimentScore = analyzeSentiment(text);

  // 감정 표현 분석
  const emotionResult = analyzeTermOccurrences(
    text,
    SUBJECTIVE_EXPRESSIONS.emotion,
    { wholeWord: true }
  );

  // 발견된 감정 표현
  const emotionalExpressions = Object.keys(emotionResult.found);

  // 주요 감정 결정
  let dominantEmotion = "중립";
  if (sentimentScore > 0.3) dominantEmotion = "긍정";
  else if (sentimentScore < -0.3) dominantEmotion = "부정";

  // 감정 표현이 많지만 감정 점수가 중립에 가까우면 "혼합"으로 판단
  if (emotionalExpressions.length >= 3 && Math.abs(sentimentScore) < 0.2) {
    dominantEmotion = "혼합";
  }

  return {
    score: sentimentScore,
    dominantEmotion,
    emotionalExpressions,
  };
};

/**
 * 신뢰성 평가 알고리즘 (블로그 포스팅 최적화 버전)
 *
 * 이 함수는 블로그 포스팅 텍스트의 신뢰성을 다양한 측면에서 분석합니다:
 * 1. 진정성 - 개인적 경험과 의견의 균형을 분석
 * 2. 감정 표현 - 텍스트의 감정적 표현과 공감 능력을 분석
 * 3. 가독성 - 텍스트의 가독성과 명확성을 평가
 * 4. 신뢰 요소 - 신뢰를 높이는 표현의 사용 빈도 분석
 *
 * @param text 평가할 텍스트
 * @returns 신뢰성 평가 결과
 */
export const evaluateTrustworthiness = (
  text: string
): TrustworthinessEvaluation => {
  // 빈 텍스트 처리
  if (!text.trim()) {
    return {
      score: 0,
      subjectiveExpressionRatio: "낮음",
      trustKeywordUsage: "낮음",
      details: "텍스트가 비어 있습니다.",
      wordCount: 0,
      subjectiveExpressions: {
        total: { count: 0, ratio: 0, expressions: [] },
        categories: {
          opinion: { count: 0, ratio: 0 },
          emphasis: { count: 0, ratio: 0 },
          firstPerson: { count: 0, ratio: 0 },
          emotion: { count: 0, ratio: 0 },
          exaggeration: { count: 0, ratio: 0 },
        },
      },
      trustElements: {
        total: { count: 0, ratio: 0, elements: [] },
        categories: {
          research: { count: 0, ratio: 0 },
          academic: { count: 0, ratio: 0 },
          data: { count: 0, ratio: 0 },
          factual: { count: 0, ratio: 0 },
        },
      },
      emotionalContext: {
        score: 0,
        dominantEmotion: "중립",
        emotionalExpressions: [],
      },
      scores: {
        authenticity: { score: 0, level: "매우 낮음" },
        emotionalExpression: { score: 0, level: "매우 낮음" },
        readability: { score: 0, level: "매우 낮음" },
        trustElement: { score: 0, level: "매우 낮음" },
      },
    };
  }

  // 텍스트 토큰화
  const tokens = tokenize(text, { removeStopwords: true });
  const wordCount = tokens.length;

  // 주관적 표현 분석 (카테고리별 분석)
  const subjectiveAnalysis = analyzeCategorizedExpressions(
    text,
    SUBJECTIVE_EXPRESSIONS,
    { wholeWord: true }
  );

  const personalExprCount = subjectiveAnalysis.totalCount;
  const personalExprFound = subjectiveAnalysis.found;
  const personalExprByCategory = subjectiveAnalysis.categoryCount;

  // 신뢰성 키워드 분석 (카테고리별 분석)
  const trustAnalysis = analyzeCategorizedExpressions(text, TRUST_KEYWORDS);

  const trustElementCount = trustAnalysis.totalCount;
  const trustElementFound = trustAnalysis.found;
  const trustElementByCategory = trustAnalysis.categoryCount;

  // 문맥 기반 감정 분석
  const emotionalContext = analyzeEmotionalContext(text);

  // 진정성 점수 계산 (0-100)
  // 블로그 포스팅에서는 객관성보다 진정성이 중요함
  // 적절한 수준의 주관적 표현은 오히려 진정성을 높임
  const personalExprRatio =
    wordCount > 0 ? (personalExprCount / wordCount) * 100 : 0;

  // 개선된 진정성 점수 계산 (카테고리별 가중치 적용)
  const opinionWeight = 0.7; // 의견 표현은 적당히 있는 것이 좋음
  const emphasisWeight = 0.5; // 강조 표현은 너무 많으면 신뢰성 저하
  const firstPersonWeight = 0.8; // 1인칭 표현은 블로그에서 자연스러움
  const emotionWeight = 0.6; // 감정 표현은 적당히 있는 것이 공감을 얻음
  const exaggerationWeight = 0.3; // 과장 표현은 신뢰성을 크게 저하

  // 카테고리별 비율 계산
  const opinionRatio =
    wordCount > 0
      ? ((personalExprByCategory.opinion || 0) / wordCount) * 100
      : 0;
  const emphasisRatio =
    wordCount > 0
      ? ((personalExprByCategory.emphasis || 0) / wordCount) * 100
      : 0;
  const firstPersonRatio =
    wordCount > 0
      ? ((personalExprByCategory.firstPerson || 0) / wordCount) * 100
      : 0;
  const emotionRatio =
    wordCount > 0
      ? ((personalExprByCategory.emotion || 0) / wordCount) * 100
      : 0;
  const exaggerationRatio =
    wordCount > 0
      ? ((personalExprByCategory.exaggeration || 0) / wordCount) * 100
      : 0;

  // 카테고리별 점수 계산
  const opinionScore =
    opinionRatio < 2
      ? 50 + opinionRatio * 10
      : opinionRatio < 8
      ? 70 + (8 - opinionRatio) * 3
      : 100 - (opinionRatio - 8) * 5;
  const emphasisScore =
    emphasisRatio < 1
      ? 60 + emphasisRatio * 20
      : emphasisRatio < 5
      ? 80 - (emphasisRatio - 1) * 5
      : 100 - (emphasisRatio - 5) * 10;
  const firstPersonScore =
    firstPersonRatio < 3
      ? 60 + firstPersonRatio * 10
      : firstPersonRatio < 10
      ? 90 - (firstPersonRatio - 3) * 3
      : 100 - (firstPersonRatio - 10) * 5;
  const emotionScore =
    emotionRatio < 2
      ? 50 + emotionRatio * 15
      : emotionRatio < 6
      ? 80 - (emotionRatio - 2) * 5
      : 100 - (emotionRatio - 6) * 8;
  const exaggerationScore =
    exaggerationRatio < 1
      ? 80
      : exaggerationRatio < 3
      ? 80 - (exaggerationRatio - 1) * 15
      : 50 - (exaggerationRatio - 3) * 10;

  // 가중 평균으로 최종 진정성 점수 계산
  const authenticityScore =
    (opinionScore * opinionWeight +
      emphasisScore * emphasisWeight +
      firstPersonScore * firstPersonWeight +
      emotionScore * emotionWeight +
      exaggerationScore * exaggerationWeight) /
    (opinionWeight +
      emphasisWeight +
      firstPersonWeight +
      emotionWeight +
      exaggerationWeight);

  // 감정 표현 점수 계산 (개선된 버전)
  // 블로그에서는 중립보다 적절한 감정 표현이 중요함
  const sentimentScore = emotionalContext.score;
  const emotionalExpressionScore =
    Math.abs(sentimentScore) < 0.1
      ? 60 // 감정 표현이 너무 적음
      : Math.abs(sentimentScore) < 0.4
      ? 80 + (0.4 - Math.abs(sentimentScore)) * 50 // 적당한 감정 표현
      : 100 - (Math.abs(sentimentScore) - 0.4) * 100; // 감정 표현이 너무 강함

  // 가독성 점수 계산 (0-100)
  const readabilityScore = calculateReadabilityScore(text);

  // 신뢰 요소 비율 계산
  const trustElementRatio =
    wordCount > 0 ? (trustElementCount / wordCount) * 100 : 0;

  // 카테고리별 신뢰 요소 점수 계산
  const researchWeight = 1.0; // 연구 기반 표현은 신뢰성에 매우 중요
  const academicWeight = 0.8; // 학술적 표현은 신뢰성에 중요
  const dataWeight = 0.9; // 데이터 관련 표현은 신뢰성에 중요
  const factualWeight = 0.7; // 객관적 사실 표현은 신뢰성에 중요

  // 카테고리별 비율 계산
  const researchRatio =
    wordCount > 0
      ? ((trustElementByCategory.research || 0) / wordCount) * 100
      : 0;
  const academicRatio =
    wordCount > 0
      ? ((trustElementByCategory.academic || 0) / wordCount) * 100
      : 0;
  const dataRatio =
    wordCount > 0 ? ((trustElementByCategory.data || 0) / wordCount) * 100 : 0;
  const factualRatio =
    wordCount > 0
      ? ((trustElementByCategory.factual || 0) / wordCount) * 100
      : 0;

  // 카테고리별 신뢰 요소 점수
  const researchScore = Math.min(100, researchRatio * 25);
  const academicScore = Math.min(100, academicRatio * 20);
  const dataScore = Math.min(100, dataRatio * 22);
  const factualScore = Math.min(100, factualRatio * 18);

  // 가중 평균으로 신뢰 요소 점수 계산
  const trustElementScore =
    (researchScore * researchWeight +
      academicScore * academicWeight +
      dataScore * dataWeight +
      factualScore * factualWeight) /
    (researchWeight + academicWeight + dataWeight + factualWeight);

  // 최종 신뢰성 점수 계산 (각 요소별 가중치 적용)
  const finalScore = Math.round(
    authenticityScore * 0.4 + // 진정성 (40%)
      emotionalExpressionScore * 0.3 + // 감정 표현 (30%)
      readabilityScore * 0.1 + // 가독성 (10%)
      trustElementScore * 0.2 // 신뢰 요소 (20%)
  );

  // 등급 계산 함수
  const getLevel = (score: number) => {
    if (score >= 80) return "매우 높음";
    if (score >= 65) return "높음";
    if (score >= 50) return "중간";
    if (score >= 35) return "낮음";
    return "매우 낮음";
  };

  // 주관적 표현 수준 계산
  const getSubjectiveLevel = (ratio: number) => {
    if (ratio < 1) return "매우 낮음";
    if (ratio < 2) return "낮음";
    if (ratio < 4) return "중간";
    if (ratio < 7) return "높음";
    return "매우 높음";
  };

  // 신뢰성 키워드 사용 수준 계산
  const getTrustKeywordLevel = (ratio: number) => {
    if (ratio < 0.5) return "매우 낮음";
    if (ratio < 1) return "낮음";
    if (ratio < 2) return "중간";
    if (ratio < 4) return "높음";
    return "매우 높음";
  };

  // 주요 주관적 표현 추출
  const topPersonalExpressions = Object.entries(personalExprFound)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([term, count]) => `${term}(${count}회)`);

  // 주요 신뢰성 키워드 추출
  const topTrustElements = Object.entries(trustElementFound)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([term, count]) => `${term}(${count}회)`);

  // 주요 표현 추출 (문자열 배열로 변환)
  const topPersonalExpressionsArray = Object.entries(personalExprFound)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([term]) => term);

  // 주요 신뢰 요소 추출 (문자열 배열로 변환)
  const topTrustElementsArray = Object.entries(trustElementFound)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([term]) => term);

  // 감정 표현 추출 (문자열 배열로 변환)
  const emotionalExpressionsArray = emotionalContext.emotionalExpressions;

  // 구조화된 결과 생성
  return {
    // 기본 필드 (하위 호환성 유지)
    score: Math.min(100, finalScore),
    subjectiveExpressionRatio: getSubjectiveLevel(personalExprRatio),
    trustKeywordUsage: getTrustKeywordLevel(trustElementRatio),
    
    // 구조화된 데이터 필드 (UI 컴포넌트에서 쉽게 사용 가능)
    wordCount,
    
    // 주관적 표현 분석
    subjectiveExpressions: {
      total: {
        count: personalExprCount,
        ratio: personalExprRatio,
        expressions: topPersonalExpressionsArray,
      },
      categories: {
        opinion: { 
          count: personalExprByCategory.opinion || 0, 
          ratio: opinionRatio 
        },
        emphasis: { 
          count: personalExprByCategory.emphasis || 0, 
          ratio: emphasisRatio 
        },
        firstPerson: { 
          count: personalExprByCategory.firstPerson || 0, 
          ratio: firstPersonRatio 
        },
        emotion: { 
          count: personalExprByCategory.emotion || 0, 
          ratio: emotionRatio 
        },
        exaggeration: { 
          count: personalExprByCategory.exaggeration || 0, 
          ratio: exaggerationRatio 
        },
      },
    },
    
    // 신뢰 요소 분석
    trustElements: {
      total: {
        count: trustElementCount,
        ratio: trustElementRatio,
        elements: topTrustElementsArray,
      },
      categories: {
        research: { 
          count: trustElementByCategory.research || 0, 
          ratio: researchRatio 
        },
        academic: { 
          count: trustElementByCategory.academic || 0, 
          ratio: academicRatio 
        },
        data: { 
          count: trustElementByCategory.data || 0, 
          ratio: dataRatio 
        },
        factual: { 
          count: trustElementByCategory.factual || 0, 
          ratio: factualRatio 
        },
      },
    },
    
    // 감정 분석
    emotionalContext: {
      score: emotionalContext.score,
      dominantEmotion: emotionalContext.dominantEmotion,
      emotionalExpressions: emotionalExpressionsArray,
    },
    
    // 세부 점수
    scores: {
      authenticity: { 
        score: authenticityScore, 
        level: getLevel(authenticityScore) 
      },
      emotionalExpression: { 
        score: emotionalExpressionScore, 
        level: getLevel(emotionalExpressionScore) 
      },
      readability: { 
        score: readabilityScore, 
        level: getLevel(readabilityScore) 
      },
      trustElement: { 
        score: trustElementScore, 
        level: getLevel(trustElementScore) 
      },
    },
    
    // 기존 details 문자열 (하위 호환성 유지)
    details: `
총 단어 수: ${wordCount}개

개인적 표현: ${personalExprCount}개 (${personalExprRatio.toFixed(2)}%)
주요 개인적 표현: ${
      topPersonalExpressions.length > 0
        ? topPersonalExpressions.join(", ")
        : "없음"
    }

신뢰 요소: ${trustElementCount}개 (${trustElementRatio.toFixed(2)}%)
주요 신뢰 요소: ${
      topTrustElements.length > 0 ? topTrustElements.join(", ") : "없음"
    }

주요 감정 톤: ${
      emotionalContext.dominantEmotion
    } (감정 점수: ${emotionalContext.score.toFixed(2)})
주요 감정 표현: ${
      emotionalContext.emotionalExpressions.length > 0
        ? emotionalContext.emotionalExpressions.join(", ")
        : "없음"
    }

진정성 점수: ${authenticityScore.toFixed(1)}점 (${getLevel(authenticityScore)})
감정 표현: ${emotionalExpressionScore.toFixed(1)}점 (${getLevel(
      emotionalExpressionScore
    )})
가독성: ${readabilityScore.toFixed(1)}점 (${getLevel(readabilityScore)})
신뢰 요소 점수: ${trustElementScore.toFixed(1)}점 (${getLevel(
      trustElementScore
    )})

카테고리별 분석:
- 의견 표현: ${personalExprByCategory.opinion || 0}개 (${opinionRatio.toFixed(
      2
    )}%)
- 강조 표현: ${personalExprByCategory.emphasis || 0}개 (${emphasisRatio.toFixed(
      2
    )}%)
- 1인칭 표현: ${
      personalExprByCategory.firstPerson || 0
    }개 (${firstPersonRatio.toFixed(2)}%)
- 감정 표현: ${personalExprByCategory.emotion || 0}개 (${emotionRatio.toFixed(
      2
    )}%)
- 과장 표현: ${
      personalExprByCategory.exaggeration || 0
    }개 (${exaggerationRatio.toFixed(2)}%)

종합 평가:
이 블로그 포스팅은 ${getSubjectiveLevel(
      personalExprRatio
    )} 수준의 개인적 표현을 사용하고 있으며, 
신뢰 요소 활용은 ${getTrustKeywordLevel(trustElementRatio)} 수준입니다. 
진정성은 ${getLevel(authenticityScore)} 수준이며, 감정 표현은 ${getLevel(
      emotionalExpressionScore
    )} 수준으로 평가됩니다.
주요 감정 톤은 ${emotionalContext.dominantEmotion}이며, 가독성은 ${getLevel(
      readabilityScore
    )} 수준입니다.
    `.trim(),
  };
};

export default evaluateTrustworthiness;
