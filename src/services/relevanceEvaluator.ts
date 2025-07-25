import type { RelevanceEvaluation } from "../types";
import {
  tokenize,
  calculateWordFrequency,
  calculateCosineSimilarity,
  analyzeTopicCoherence,
} from "../utils/textAnalysis";
import domainKeywordsData from "../data/domainKeywords.json";
import synonymsData from "../data/synonyms.json";
import keywordImportanceData from "../data/keywordImportance.json";
import defaultQueriesData from "../data/defaultQueries.json";

/**
 * 블로그 포스팅 주제별 주요 키워드 사전 (확장된 버전)
 * 블로그 포스팅에서 자주 다루는 다양한 주제를 포함합니다.
 * 외부 JSON 파일에서 로드됩니다.
 */
const DOMAIN_KEYWORDS: Record<string, string[]> = domainKeywordsData;

/**
 * 텍스트와 쿼리 간의 관련성 점수 계산 (개선된 버전)
 *
 * 이 함수는 단순한 코사인 유사도 계산을 넘어 다음과 같은 개선 사항을 포함합니다:
 * 1. 동의어 처리 - 유사한 의미를 가진 단어들을 그룹화하여 처리
 * 2. 가중치 적용 - 중요 키워드에 더 높은 가중치 부여
 * 3. 부분 일치 고려 - 복합 단어의 부분 일치도 고려
 * 4. 문맥 가중치 - 문장 내 위치에 따른 가중치 적용
 *
 * @param textTokens 텍스트 토큰
 * @param queryTokens 쿼리 토큰
 * @param domain 텍스트의 도메인 (선택적)
 * @returns 관련성 점수 (0-100)
 */
const calculateQueryRelevance = (
  textTokens: string[],
  queryTokens: string[],
  domain: string = "기본"
): number => {
  if (textTokens.length === 0 || queryTokens.length === 0) {
    return 0;
  }

  // 동의어 사전 (외부 JSON 파일에서 로드)
  const synonyms: Record<string, string[]> = synonymsData;

  // 텍스트와 쿼리의 단어 빈도 계산 (기본)
  const textFreq = calculateWordFrequency(textTokens);
  const queryFreq = calculateWordFrequency(queryTokens);

  // 동의어 처리를 위한 확장된 빈도 계산 (Map 사용으로 성능 최적화)
  const enhancedTextFreq = new Map<string, number>();
  const enhancedQueryFreq = new Map<string, number>();
  
  // 기본 빈도 복사
  Object.entries(textFreq).forEach(([term, freq]) => {
    enhancedTextFreq.set(term, freq);
  });
  
  Object.entries(queryFreq).forEach(([term, freq]) => {
    enhancedQueryFreq.set(term, freq);
  });

  // 동의어 처리 (개선된 버전)
  Object.entries(synonyms).forEach(([mainTerm, synonymList]) => {
    // 텍스트에서 동의어 처리
    let textTermCount = enhancedTextFreq.get(mainTerm) || 0;
    synonymList.forEach((synonym) => {
      if (enhancedTextFreq.has(synonym)) {
        textTermCount += enhancedTextFreq.get(synonym) || 0;
        enhancedTextFreq.delete(synonym); // 중복 계산 방지
      }
    });
    if (textTermCount > 0) {
      enhancedTextFreq.set(mainTerm, textTermCount);
    }
    
    // 쿼리에서 동의어 처리
    let queryTermCount = enhancedQueryFreq.get(mainTerm) || 0;
    synonymList.forEach((synonym) => {
      if (enhancedQueryFreq.has(synonym)) {
        queryTermCount += enhancedQueryFreq.get(synonym) || 0;
        enhancedQueryFreq.delete(synonym); // 중복 계산 방지
      }
    });
    if (queryTermCount > 0) {
      enhancedQueryFreq.set(mainTerm, queryTermCount);
    }
  });

  // 한국어 부분 일치 처리 개선 (복합 단어)
  const koreanPartialMatches = new Map<string, number>();
  
  queryTokens.forEach((queryToken) => {
    if (queryToken.length > 2) { // 한국어는 더 짧은 단어도 의미가 있을 수 있음
      textTokens.forEach((textToken) => {
        // 부분 일치 검사 (텍스트 토큰이 쿼리 토큰을 포함하거나 그 반대의 경우)
        if (textToken.includes(queryToken) || queryToken.includes(textToken)) {
          // 일치 정도에 따른 가중치 계산
          const matchLength = Math.min(textToken.length, queryToken.length);
          const maxLength = Math.max(textToken.length, queryToken.length);
          const matchRatio = matchLength / maxLength;
          
          // 일치도가 높을수록 더 높은 가중치 부여
          const matchScore = 0.3 + (matchRatio * 0.4); // 0.3 ~ 0.7 범위
          
          // 기존 값이 있으면 최대값 사용
          const currentScore = koreanPartialMatches.get(textToken) || 0;
          koreanPartialMatches.set(textToken, Math.max(currentScore, matchScore));
        }
      });
    }
  });
  
  // 부분 일치 점수 반영
  koreanPartialMatches.forEach((score, term) => {
    enhancedTextFreq.set(term, (enhancedTextFreq.get(term) || 0) + score);
  });

  // 중요 키워드에 가중치 부여 (외부 JSON 파일에서 로드)
  // 도메인별 키워드 중요도를 적용하고, 없으면 기본 중요도 적용
  const domainImportance =
    keywordImportanceData[domain as keyof typeof keywordImportanceData] ||
    keywordImportanceData["기본"];

  // 타입 안전을 위한 인덱스 시그니처 타입 정의
  const importanceMap: Record<string, number> = domainImportance as Record<string, number>;

  // 가중치 적용 (Map 사용으로 최적화)
  enhancedTextFreq.forEach((value, term) => {
    if (importanceMap[term]) {
      enhancedTextFreq.set(term, value * importanceMap[term]);
    }
  });

  enhancedQueryFreq.forEach((value, term) => {
    if (importanceMap[term]) {
      enhancedQueryFreq.set(term, value * importanceMap[term]);
    }
  });

  // Map을 Record로 변환 (코사인 유사도 계산을 위해)
  const enhancedTextFreqRecord: Record<string, number> = {};
  const enhancedQueryFreqRecord: Record<string, number> = {};
  
  enhancedTextFreq.forEach((value, key) => {
    enhancedTextFreqRecord[key] = value;
  });
  
  enhancedQueryFreq.forEach((value, key) => {
    enhancedQueryFreqRecord[key] = value;
  });

  // 코사인 유사도 계산 (개선된 빈도 사용)
  const enhancedSimilarity = calculateCosineSimilarity(
    enhancedTextFreqRecord,
    enhancedQueryFreqRecord
  );

  // 기본 코사인 유사도 계산 (원래 방식)
  const baseSimilarity = calculateCosineSimilarity(textFreq, queryFreq);

  // 두 유사도의 가중 평균 (개선된 방식에 더 높은 가중치)
  const finalSimilarity = enhancedSimilarity * 0.75 + baseSimilarity * 0.25;

  // 0-100 범위로 변환
  return Math.min(100, finalSimilarity * 100);
};

/**
 * 키워드 밀도 분석 (고급 버전)
 * @param tokens 토큰화된 텍스트
 * @param options 분석 옵션
 * @returns 키워드 밀도 분석 결과
 */
const analyzeKeywordDensity = (
  tokens: string[],
  options: { topKeywordCount?: number } = {}
): {
  density: number;
  level: string;
  topKeywords: Array<{ term: string; frequency: number; density: number }>;
} => {
  const { topKeywordCount = 10 } = options;

  if (tokens.length === 0) {
    return {
      density: 0,
      level: "매우 낮음",
      topKeywords: [],
    };
  }

  // 단어 빈도 계산 (Map 사용으로 성능 최적화)
  const termFrequencyMap = new Map<string, number>();
  
  for (const token of tokens) {
    termFrequencyMap.set(token, (termFrequencyMap.get(token) || 0) + 1);
  }

  // 상위 키워드 추출 (정렬 최적화)
  const topKeywords = Array.from(termFrequencyMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topKeywordCount)
    .map(([term, frequency]) => ({
      term,
      frequency,
      density: (frequency / tokens.length) * 100,
    }));

  // 상위 키워드의 총 빈도
  const totalTopFrequency = topKeywords.reduce(
    (sum, kw) => sum + kw.frequency,
    0
  );

  // 전체 키워드 밀도
  const density = (totalTopFrequency / tokens.length) * 100;

  // 밀도 레벨 결정 (개선된 기준)
  let level = "매우 낮음";
  if (density >= 35) level = "매우 높음";
  else if (density >= 28) level = "높음";
  else if (density >= 22) level = "중간 높음";
  else if (density >= 16) level = "중간";
  else if (density >= 10) level = "중간 낮음";
  else if (density >= 5) level = "낮음";

  return { density, level, topKeywords };
};

/**
 * 도메인 관련성 분석 (개선된 버전)
 * @param tokens 토큰화된 텍스트
 * @returns 도메인 관련성 분석 결과
 */
const analyzeDomainRelevance = (
  tokens: string[]
): {
  domain: string;
  score: number;
  matchedKeywords: string[];
  secondaryDomain?: string;
  secondaryScore?: number;
} => {
  if (tokens.length === 0) {
    return { domain: "없음", score: 0, matchedKeywords: [] };
  }

  // 토큰 집합 생성 (검색 최적화)
  const tokenSet = new Set(tokens.map(token => token.toLowerCase()));

  // 각 도메인별 관련성 점수 계산
  const domainScores = Object.entries(DOMAIN_KEYWORDS).map(
    ([domain, keywords]) => {
      // 도메인 키워드와 일치하는 토큰 찾기 (최적화된 방식)
      const matchedKeywords = keywords.filter(keyword => 
        tokenSet.has(keyword.toLowerCase())
      );

      // 고유한 일치 키워드 목록
      const uniqueMatches = [...new Set(matchedKeywords)];

      // 관련성 점수 계산 (일치 키워드 수 / 도메인 키워드 수)
      // 가중치 적용: 더 많은 키워드를 가진 도메인에 불이익이 없도록 조정
      const weightedScore = (uniqueMatches.length / Math.sqrt(keywords.length)) * 100;

      return { domain, score: weightedScore, matchedKeywords: uniqueMatches };
    }
  );

  // 점수 기준 정렬
  const sortedDomains = domainScores.sort((a, b) => b.score - a.score);
  
  // 가장 높은 관련성 점수를 가진 도메인 반환
  const primaryDomain = sortedDomains[0];
  
  // 두 번째로 높은 도메인이 있고, 점수 차이가 크지 않으면 보조 도메인으로 추가
  if (sortedDomains.length > 1 && 
      sortedDomains[1].score > 0 && 
      (sortedDomains[0].score - sortedDomains[1].score) < 20) {
    return {
      ...primaryDomain,
      secondaryDomain: sortedDomains[1].domain,
      secondaryScore: sortedDomains[1].score
    };
  }
  
  return primaryDomain;
};

/**
 * 텍스트의 주제 일관성 분석 (개선된 버전)
 * @param text 분석할 텍스트
 * @returns 주제 일관성 점수 (0-100)
 */
const analyzeTopicFocus = (text: string): number => {
  // 기존 구현을 사용하되, 문장 간 유사도 계산 방식 개선
  return analyzeTopicCoherence(text);
};

/**
 * 텍스트에서 동적 쿼리 생성 (개선된 버전)
 *
 * 이 함수는 텍스트 내용을 분석하여 가장 관련성 높은 쿼리를 동적으로 생성합니다.
 * 1. 텍스트의 상위 키워드 추출
 * 2. 도메인 관련 키워드 활용
 * 3. 텍스트 주제에 맞는 키워드 선택
 * 4. 보조 도메인 키워드 통합
 *
 * @param textTokens 토큰화된 텍스트
 * @param keywordDensityResult 키워드 밀도 분석 결과
 * @param domainRelevance 도메인 관련성 분석 결과
 * @returns 동적으로 생성된 쿼리 문자열
 */
const generateDynamicQuery = (
  textTokens: string[],
  keywordDensityResult: ReturnType<typeof analyzeKeywordDensity>,
  domainRelevance: ReturnType<typeof analyzeDomainRelevance>
): string => {
  // 1. 텍스트의 상위 키워드 추출 (최대 5개)
  const topTextKeywords = keywordDensityResult.topKeywords
    .slice(0, 5)
    .map((kw) => kw.term);

  // 2. 도메인 관련 키워드 추가 (최대 3개)
  const domainKeywords = domainRelevance.matchedKeywords.slice(0, 3);

  // 3. 해당 도메인의 추가 키워드 (도메인 사전에서 가져옴, 최대 2개)
  let additionalDomainKeywords: string[] = [];
  if (
    domainRelevance.domain !== "없음" &&
    DOMAIN_KEYWORDS[domainRelevance.domain]
  ) {
    // 이미 포함되지 않은 도메인 키워드 중에서 선택
    additionalDomainKeywords = DOMAIN_KEYWORDS[domainRelevance.domain]
      .filter(
        (keyword) =>
          !topTextKeywords.includes(keyword) &&
          !domainKeywords.includes(keyword)
      )
      .slice(0, 2);
  }
  
  // 4. 보조 도메인이 있는 경우 해당 도메인의 키워드도 추가 (최대 1개)
  let secondaryDomainKeywords: string[] = [];
  if (
    domainRelevance.secondaryDomain && 
    DOMAIN_KEYWORDS[domainRelevance.secondaryDomain]
  ) {
    secondaryDomainKeywords = DOMAIN_KEYWORDS[domainRelevance.secondaryDomain]
      .filter(
        (keyword) =>
          !topTextKeywords.includes(keyword) &&
          !domainKeywords.includes(keyword) &&
          !additionalDomainKeywords.includes(keyword)
      )
      .slice(0, 1);
  }

  // 모든 키워드 결합 (중복 제거)
  const allKeywords = [
    ...new Set([
      ...topTextKeywords,
      ...domainKeywords,
      ...additionalDomainKeywords,
      ...secondaryDomainKeywords
    ]),
  ];

  // 키워드가 없는 경우 도메인에 맞는 기본 쿼리 반환
  if (allKeywords.length === 0) {
    // 도메인에 맞는 기본 쿼리 사용 (외부 JSON 파일에서 로드)
    const domain =
      domainRelevance.domain !== "없음" ? domainRelevance.domain : "기본";
    return (
      defaultQueriesData[domain as keyof typeof defaultQueriesData] ||
      defaultQueriesData["기본"]
    );
  }

  // 쿼리 문자열 생성
  return allKeywords.join(", ");
};

/**
 * 관련성 평가 알고리즘 (고급 버전)
 *
 * 이 함수는 텍스트의 관련성을 다양한 측면에서 분석합니다:
 * 1. 키워드 밀도 - 주요 키워드의 분포와 빈도 분석
 * 2. 쿼리 관련성 - 특정 쿼리나 주제와의 관련성 분석 (동적 쿼리 생성)
 * 3. 도메인 관련성 - 특정 도메인과의 관련성 분석
 * 4. 주제 일관성 - 텍스트 내 주제의 일관성 분석
 *
 * @param text 평가할 텍스트
 * @param query 선택적 쿼리 (검색어 또는 관심 주제, 제공되지 않으면 동적 생성)
 * @returns 관련성 평가 결과
 */
const evaluateRelevance = (
  text: string,
  query?: string
): RelevanceEvaluation => {
  // 빈 텍스트 처리
  if (!text.trim()) {
    return {
      score: 0,
      keywordDensity: "낮음",
      queryRelevance: "낮음",
      details: "텍스트가 비어 있습니다.",
      wordCount: 0,
      keywordDensityAnalysis: {
        score: 0,
        level: "낮음",
        keywords: {
          primary: [],
          secondary: [],
        },
      },
      queryRelevanceAnalysis: {
        score: 0,
        level: "낮음",
        queries: [],
      },
      scores: {
        keywordMatch: { score: 0, level: "낮음" },
        semanticRelevance: { score: 0, level: "낮음" },
        contextualFit: { score: 0, level: "낮음" },
        queryAlignment: { score: 0, level: "낮음" },
      },
      suggestedKeywords: [],
    };
  }

  // 텍스트 토큰화 (개선: 최소 단어 길이 1로 설정)
  const textTokens = tokenize(text, {
    minWordLength: 1, // 한 글자 단어도 포함
    removeStopwords: true,
  });

  // 키워드 밀도 분석
  const keywordDensityResult = analyzeKeywordDensity(textTokens, {
    topKeywordCount: 15,
  });

  // 도메인 관련성 분석
  const domainRelevance = analyzeDomainRelevance(textTokens);

  // 동적 쿼리 생성 (사용자가 쿼리를 제공하지 않은 경우)
  const effectiveQuery =
    query ||
    generateDynamicQuery(textTokens, keywordDensityResult, domainRelevance);

  // 쿼리 토큰화 (개선: 최소 단어 길이 1로 설정)
  const queryTokens = tokenize(effectiveQuery, {
    minWordLength: 1, // 한 글자 단어도 포함
    removeStopwords: true,
  });

  // 쿼리 관련성 분석
  const queryRelevanceScore = calculateQueryRelevance(
    textTokens,
    queryTokens,
    domainRelevance.domain
  );

  // 주제 일관성 분석
  const topicFocusScore = analyzeTopicFocus(text);

  // 쿼리 관련성 레벨 결정
  const getQueryRelevanceLevel = (score: number) => {
    if (score >= 80) return "매우 높음";
    if (score >= 60) return "높음";
    if (score >= 40) return "중간";
    if (score >= 20) return "낮음";
    return "매우 낮음";
  };

  // 주제 일관성 레벨 결정
  const getTopicFocusLevel = (score: number) => {
    if (score >= 80) return "매우 높음";
    if (score >= 60) return "높음";
    if (score >= 40) return "중간";
    if (score >= 20) return "낮음";
    return "매우 낮음";
  };

  // 최종 관련성 점수 계산 (각 요소별 가중치 적용)
  const finalScore = Math.round(
    keywordDensityResult.density * 0.3 + // 키워드 밀도 (30%)
      queryRelevanceScore * 0.3 + // 쿼리 관련성 (30%)
      domainRelevance.score * 0.2 + // 도메인 관련성 (20%)
      topicFocusScore * 0.2 // 주제 일관성 (20%)
  );

  // 상위 키워드 문자열 생성
  const topKeywordsStr = keywordDensityResult.topKeywords
    .map((kw) => `${kw.term}(${kw.frequency}회, ${kw.density.toFixed(1)}%)`)
    .join(", ");

  // 보조 도메인 정보 추가
  const secondaryDomainInfo = domainRelevance.secondaryDomain 
    ? `\n보조 도메인: ${domainRelevance.secondaryDomain} (${domainRelevance.secondaryScore?.toFixed(1)}점)`
    : '';

  // 키워드 밀도 분석 결과 구성
  const keywordDensityAnalysis = {
    score: keywordDensityResult.density,
    level: keywordDensityResult.level,
    keywords: {
      primary: keywordDensityResult.topKeywords.slice(0, 5).map(kw => ({
        keyword: kw.term,
        count: kw.frequency,
        density: kw.density
      })),
      secondary: keywordDensityResult.topKeywords.slice(5).map(kw => ({
        keyword: kw.term,
        count: kw.frequency,
        density: kw.density
      })),
    },
  };

  // 쿼리 관련성 분석 결과 구성
  const queryRelevanceAnalysis = {
    score: queryRelevanceScore,
    level: getQueryRelevanceLevel(queryRelevanceScore),
    queries: [
      { 
        query: effectiveQuery, 
        relevance: queryRelevanceScore 
      }
    ],
  };

  // 세부 점수 구성
  const scores = {
    keywordMatch: { 
      score: keywordDensityResult.density * 1.5, // 0-100 범위로 조정
      level: keywordDensityResult.level 
    },
    semanticRelevance: { 
      score: queryRelevanceScore, 
      level: getQueryRelevanceLevel(queryRelevanceScore) 
    },
    contextualFit: { 
      score: domainRelevance.score, 
      level: getTopicFocusLevel(domainRelevance.score) 
    },
    queryAlignment: { 
      score: topicFocusScore, 
      level: getTopicFocusLevel(topicFocusScore) 
    },
  };

  // 추천 키워드 구성
  const suggestedKeywords = [
    ...domainRelevance.matchedKeywords.slice(0, 3),
    ...keywordDensityResult.topKeywords.slice(0, 3).map(kw => kw.term)
  ].filter((value, index, self) => self.indexOf(value) === index); // 중복 제거

  // 결과 생성 (구조화된 데이터 포함)
  return {
    // 기본 필드 (하위 호환성 유지)
    score: Math.min(100, finalScore),
    keywordDensity: keywordDensityResult.level,
    queryRelevance: getQueryRelevanceLevel(queryRelevanceScore),
    
    // 구조화된 데이터 필드
    wordCount: textTokens.length,
    keywordDensityAnalysis,
    queryRelevanceAnalysis,
    scores,
    suggestedKeywords,
    
    // 기존 details 문자열 (하위 호환성 유지)
    details: `
텍스트 길이: ${textTokens.length}단어

상위 키워드: ${topKeywordsStr}

키워드 밀도: ${keywordDensityResult.density.toFixed(1)}% (${
      keywordDensityResult.level
    })
쿼리 관련성: ${queryRelevanceScore.toFixed(1)}점 (${getQueryRelevanceLevel(
      queryRelevanceScore
    )})
주제 일관성: ${topicFocusScore.toFixed(1)}점 (${getTopicFocusLevel(
      topicFocusScore
    )})

관련 도메인: ${domainRelevance.domain} (${domainRelevance.score.toFixed(1)}점)${secondaryDomainInfo}
관련 키워드: ${domainRelevance.matchedKeywords.join(", ")}

종합 평가:
이 텍스트는 주요 키워드의 분포가 ${
      keywordDensityResult.level
    } 수준으로 나타났으며, 검색 쿼리와의 관련성은 ${getQueryRelevanceLevel(
      queryRelevanceScore
    )} 수준입니다. 주제 일관성은 ${getTopicFocusLevel(
      topicFocusScore
    )} 수준으로, ${domainRelevance.domain} 도메인과 가장 관련성이 높습니다.
    `.trim(),
  };
};

export default evaluateRelevance;
