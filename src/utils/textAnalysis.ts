/**
 * 텍스트 분석을 위한 공통 유틸리티 함수들
 */

import { koreanAnalyzer } from "./koreanAnalysis";

/**
 * 텍스트 전처리 옵션
 */
export interface TokenizationOptions {
  /** 최소 단어 길이 (기본값: 1) */
  minWordLength?: number;
  /** 불용어 제거 여부 (기본값: true) */
  removeStopwords?: boolean;
  /** 어간 추출 여부 (기본값: false) */
  stemming?: boolean;
  /** 한국어 형태소 분석 여부 (기본값: true) */
  koreanMorphologicalAnalysis?: boolean;
}

/**
 * 한국어 불용어 목록
 */
export const KOREAN_STOPWORDS = new Set([
  "이",
  "그",
  "저",
  "것",
  "수",
  "등",
  "들",
  "및",
  "에",
  "에서",
  "의",
  "을",
  "를",
  "이",
  "가",
  "은",
  "는",
  "이다",
  "있다",
  "하다",
  "이런",
  "그런",
  "저런",
  "이렇게",
  "그렇게",
  "저렇게",
  "또한",
  "그리고",
  "하지만",
  "그러나",
  "그래서",
  "따라서",
  "그러므로",
  "그런데",
  "그리하여",
  "때문에",
  "위해",
  "위하여",
  "통해",
  "통하여",
  "으로",
  "로",
  "에게",
  "께",
  "와",
  "과",
  "이나",
  "거나",
  "또는",
  "혹은",
  "뿐",
  "만",
  "까지",
  "부터",
  "에서부터",
  "에게서",
  "로부터",
  "이라고",
  "라고",
  "이라는",
  "라는",
  "이라면",
  "라면",
  "이어서",
  "어서",
  "이어야",
  "어야",
  "이었다",
  "였다",
  "더라도",
  "이더라도",
  "하더라도",
  "든지",
  "이든지",
  "하든지",
  "이건",
  "그건",
  "저건",
]);

/**
 * 영어 불용어 목록
 */
export const ENGLISH_STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "if",
  "because",
  "as",
  "what",
  "which",
  "this",
  "that",
  "these",
  "those",
  "then",
  "just",
  "so",
  "than",
  "such",
  "both",
  "through",
  "about",
  "for",
  "is",
  "of",
  "while",
  "during",
  "to",
  "from",
  "in",
  "out",
  "on",
  "off",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "can",
  "will",
  "just",
  "should",
  "now",
]);

/**
 * 간단한 영어 어간 추출 (Porter 스테밍 알고리즘의 간소화 버전)
 * @param word 어간 추출할 단어
 * @returns 어간이 추출된 단어
 */
export function simpleStemmer(word: string): string {
  // 소문자 변환
  word = word.toLowerCase();

  // 기본적인 어미 제거 규칙
  if (word.endsWith("ing")) {
    // running -> run
    const stem = word.slice(0, -3);
    if (stem.length >= 3) {
      return stem;
    }
  } else if (word.endsWith("ed")) {
    // walked -> walk
    const stem = word.slice(0, -2);
    if (stem.length >= 3) {
      return stem;
    }
  } else if (
    word.endsWith("s") &&
    !word.endsWith("ss") &&
    !word.endsWith("us") &&
    !word.endsWith("is")
  ) {
    // cats -> cat, but not pass, bus, this
    return word.slice(0, -1);
  } else if (word.endsWith("ly")) {
    // quickly -> quick
    return word.slice(0, -2);
  } else if (word.endsWith("ful")) {
    // beautiful -> beauty
    return word.slice(0, -3);
  } else if (word.endsWith("est")) {
    // biggest -> big
    const stem = word.slice(0, -3);
    if (stem.length >= 3) {
      return stem;
    }
  } else if (word.endsWith("er")) {
    // bigger -> big
    const stem = word.slice(0, -2);
    if (stem.length >= 3) {
      return stem;
    }
  }

  return word;
}

/**
 * 텍스트를 토큰화하는 고급 함수
 * @param text 토큰화할 텍스트
 * @param options 토큰화 옵션
 * @returns 토큰화된 단어 배열
 */
export function tokenize(
  text: string,
  options: TokenizationOptions = {}
): string[] {
  // 기본 옵션 설정
  const {
    minWordLength = 1,
    removeStopwords = true,
    stemming = false,
    koreanMorphologicalAnalysis = true,
  } = options;

  // 한국어 텍스트 감지 (자음/모음 포함)
  const hasKorean = /[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(text);

  // 한국어 형태소 분석 (개선된 버전)
  if (hasKorean && koreanMorphologicalAnalysis) {
    return koreanAnalyzer.analyze(text, {
      removeStopwords,
      minLength: minWordLength,
      handleInternetTerms: true,
      decomposeCompounds: true,
    });
  }

  // 기본 토큰화 (영어 및 기타 언어)
  let tokens = text
    .toLowerCase()
    .replace(/[^\w\s가-힣]/g, "") // 특수문자 제거 (한글 포함)
    .split(/\s+/) // 공백 기준 분리
    .filter((word) => word.length >= minWordLength); // 최소 길이 필터링

  // 불용어 제거
  if (removeStopwords) {
    tokens = tokens.filter((token) => {
      if (hasKorean) {
        return !KOREAN_STOPWORDS.has(token);
      }
      return !ENGLISH_STOPWORDS.has(token);
    });
  }

  // 어간 추출 (영어만 적용)
  if (stemming && !hasKorean) {
    tokens = tokens.map((token) => simpleStemmer(token));
  }

  return tokens;
}

/**
 * 단어 빈도 계산 함수
 * @param tokens 토큰화된 단어 배열
 * @returns 단어별 빈도 객체
 */
export function calculateWordFrequency(
  tokens: string[]
): Record<string, number> {
  const frequency: Record<string, number> = {};

  for (const token of tokens) {
    frequency[token] = (frequency[token] || 0) + 1;
  }

  return frequency;
}

/**
 * TF (Term Frequency) 계산
 * @param termFreq 단어 빈도
 * @param totalTerms 전체 단어 수
 * @returns 단어별 TF 값
 */
export function calculateTF(
  termFreq: Record<string, number>,
  totalTerms: number
): Record<string, number> {
  const tf: Record<string, number> = {};

  for (const [term, freq] of Object.entries(termFreq)) {
    tf[term] = freq / totalTerms;
  }

  return tf;
}

/**
 * 코사인 유사도 계산
 * @param vecA 첫 번째 벡터 (단어 빈도)
 * @param vecB 두 번째 벡터 (단어 빈도)
 * @returns 코사인 유사도 (0~1)
 */
export function calculateCosineSimilarity(
  vecA: Record<string, number>,
  vecB: Record<string, number>
): number {
  // 모든 고유 단어 수집
  const allTerms = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);

  // 내적 계산
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (const term of allTerms) {
    const weightA = vecA[term] || 0;
    const weightB = vecB[term] || 0;

    dotProduct += weightA * weightB;
    magnitudeA += weightA * weightA;
    magnitudeB += weightB * weightB;
  }

  // 벡터의 크기
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  // 코사인 유사도 계산
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * 텍스트의 가독성 점수 계산 (Flesch-Kincaid 가독성 지수 변형)
 * @param text 분석할 텍스트
 * @returns 가독성 점수 (0~100)
 */
export function calculateReadabilityScore(text: string): number {
  // 문장 수 계산
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = Math.max(1, sentences.length);

  // 단어 수 계산
  const words = text.split(/\s+/).filter((w) => w.trim().length > 0);
  const wordCount = Math.max(1, words.length);

  // 음절 수 계산 (영어 기준 근사치)
  const syllableCount = words.reduce((count, word) => {
    // 한국어인 경우 글자 수를 음절 수로 간주
    if (/[가-힣]/.test(word)) {
      return count + word.replace(/[^가-힣]/g, "").length;
    }

    // 영어인 경우 모음 수를 음절 수로 간주 (근사치)
    const vowelCount = (word.match(/[aeiouy]/gi) || []).length;
    return count + Math.max(1, vowelCount);
  }, 0);

  // 평균 문장 길이 (단어 수)
  const avgSentenceLength = wordCount / sentenceCount;

  // 평균 단어 길이 (음절 수)
  const avgWordLength = syllableCount / wordCount;

  // Flesch-Kincaid 가독성 지수 변형 (0~100 범위로 정규화)
  const readability =
    206.835 - 1.015 * avgSentenceLength - 84.6 * avgWordLength;

  // 0~100 범위로 정규화
  return Math.max(0, Math.min(100, readability));
}

/**
 * 텍스트의 감정 분석 (간단한 감정 사전 기반)
 * @param text 분석할 텍스트
 * @returns 감정 점수 (-1~1, 부정~긍정)
 */
export function analyzeSentiment(text: string): number {
  // 간단한 감정 사전 (실제로는 더 큰 사전이 필요)
  const sentimentDictionary: Record<string, number> = {
    // 긍정적인 단어
    좋은: 0.8,
    훌륭한: 0.9,
    멋진: 0.8,
    아름다운: 0.7,
    행복한: 0.9,
    기쁜: 0.8,
    즐거운: 0.7,
    만족: 0.6,
    성공: 0.8,
    발전: 0.6,
    개선: 0.5,
    향상: 0.5,
    효과적인: 0.6,
    유용한: 0.6,
    도움: 0.5,

    // 부정적인 단어
    나쁜: -0.8,
    형편없는: -0.9,
    실망: -0.7,
    불만: -0.6,
    문제: -0.5,
    어려운: -0.5,
    힘든: -0.6,
    불행한: -0.8,
    슬픈: -0.7,
    화난: -0.8,
    실패: -0.7,
    하락: -0.6,
    감소: -0.5,
    부족한: -0.6,
    부적절한: -0.7,
  };

  // 텍스트 토큰화
  const tokens = tokenize(text, { removeStopwords: true });

  // 감정 점수 계산
  let totalScore = 0;
  let matchedWords = 0;

  for (const token of tokens) {
    if (token in sentimentDictionary) {
      totalScore += sentimentDictionary[token];
      matchedWords++;
    }
  }

  // 매칭된 단어가 없으면 중립(0) 반환
  if (matchedWords === 0) {
    return 0;
  }

  // 평균 감정 점수 반환
  return totalScore / matchedWords;
}

/**
 * 텍스트의 복잡성 분석
 * @param text 분석할 텍스트
 * @returns 복잡성 점수 (0~100)
 */
export function analyzeComplexity(text: string): number {
  // 토큰화
  const tokens = tokenize(text);
  if (tokens.length === 0) return 0;

  // 고유 단어 비율
  const uniqueWords = new Set(tokens);
  const lexicalDiversity = uniqueWords.size / tokens.length;

  // 평균 단어 길이
  const avgWordLength =
    tokens.reduce((sum, word) => sum + word.length, 0) / tokens.length;

  // 긴 단어 비율 (6자 이상)
  const longWords = tokens.filter((word) => word.length >= 6);
  const longWordRatio = longWords.length / tokens.length;

  // 복잡성 점수 계산 (0~100)
  const complexityScore =
    lexicalDiversity * 40 + // 어휘 다양성 (최대 40점)
    Math.min(10, avgWordLength) * 3 + // 평균 단어 길이 (최대 30점)
    longWordRatio * 30; // 긴 단어 비율 (최대 30점)

  return Math.min(100, complexityScore * 100);
}

/**
 * 텍스트의 주제 일관성 분석
 * @param text 분석할 텍스트
 * @returns 주제 일관성 점수 (0~100)
 */
export function analyzeTopicCoherence(text: string): number {
  // 문장 분리
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length <= 1) return 100; // 문장이 하나면 일관성 100%

  // 각 문장을 토큰화하고 단어 빈도 계산
  const sentenceVectors: Record<string, number>[] = sentences.map(
    (sentence) => {
      const tokens = tokenize(sentence, { removeStopwords: true });
      return calculateWordFrequency(tokens);
    }
  );

  // 인접한 문장 간의 코사인 유사도 계산
  let totalSimilarity = 0;

  for (let i = 0; i < sentenceVectors.length - 1; i++) {
    const similarity = calculateCosineSimilarity(
      sentenceVectors[i],
      sentenceVectors[i + 1]
    );
    totalSimilarity += similarity;
  }

  // 평균 유사도 계산 (0~1)
  const avgSimilarity = totalSimilarity / (sentences.length - 1);

  // 0~100 범위로 변환
  return avgSimilarity * 100;
}

/**
 * 텍스트에서 핵심 문장 추출 (텍스트 요약)
 * @param text 원본 텍스트
 * @param sentenceCount 추출할 문장 수
 * @returns 추출된 핵심 문장 배열
 */
export function extractKeySentences(
  text: string,
  sentenceCount: number = 3
): string[] {
  // 문장 분리
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length <= sentenceCount) return sentences;

  // 전체 텍스트 토큰화
  const allTokens = tokenize(text, { removeStopwords: true });
  const wordFreq = calculateWordFrequency(allTokens);

  // 각 문장의 점수 계산
  const sentenceScores = sentences.map((sentence) => {
    const tokens = tokenize(sentence, { removeStopwords: true });

    // 문장 내 단어의 빈도 합계
    let score = 0;
    for (const token of tokens) {
      score += wordFreq[token] || 0;
    }

    // 문장 길이로 정규화 (너무 짧은 문장에 불이익)
    if (tokens.length > 0) {
      score = score / Math.sqrt(tokens.length);
    }

    return { sentence, score };
  });

  // 점수 기준 정렬 및 상위 N개 문장 반환
  return sentenceScores
    .sort((a, b) => b.score - a.score)
    .slice(0, sentenceCount)
    .map((item) => item.sentence);
}

/**
 * 텍스트의 전문성 수준 분석
 * @param text 분석할 텍스트
 * @param domainKeywords 도메인 특화 키워드 (선택 사항)
 * @returns 전문성 점수 (0~100)
 */
export function analyzeExpertiseLevel(
  text: string,
  domainKeywords: string[] = []
): number {
  // 토큰화
  const tokens = tokenize(text, { removeStopwords: true });
  if (tokens.length === 0) return 0;

  // 평균 단어 길이 (전문적인 글은 보통 긴 단어를 많이 사용)
  const avgWordLength =
    tokens.reduce((sum, word) => sum + word.length, 0) / tokens.length;
  const wordLengthScore = Math.min(1, avgWordLength / 8) * 30; // 최대 30점

  // 어휘 다양성 (전문적인 글은 다양한 어휘 사용)
  const uniqueWords = new Set(tokens);
  const lexicalDiversity = Math.min(
    1,
    uniqueWords.size / (tokens.length * 0.7)
  );
  const diversityScore = lexicalDiversity * 30; // 최대 30점

  // 도메인 특화 키워드 사용 비율
  let domainScore = 0;
  if (domainKeywords.length > 0) {
    const domainKeywordSet = new Set(
      domainKeywords.map((k) => k.toLowerCase())
    );
    const matchedKeywords = tokens.filter((token) =>
      domainKeywordSet.has(token)
    );
    const keywordRatio = matchedKeywords.length / tokens.length;
    domainScore = Math.min(1, keywordRatio * 5) * 40; // 최대 40점
  } else {
    // 도메인 키워드가 없는 경우, 긴 단어(6자 이상) 비율로 대체
    const longWords = tokens.filter((word) => word.length >= 6);
    const longWordRatio = longWords.length / tokens.length;
    domainScore = Math.min(1, longWordRatio * 2) * 40; // 최대 40점
  }

  // 최종 전문성 점수
  return Math.min(100, wordLengthScore + diversityScore + domainScore);
}

/**
 * 텍스트의 객관성 분석
 * @param text 분석할 텍스트
 * @returns 객관성 점수 (0~100)
 */
export function analyzeObjectivity(text: string): number {
  // 주관적 표현 목록
  const subjectiveExpressions = [
    "내 생각에",
    "개인적으로",
    "아마도",
    "추측",
    "느낌",
    "생각한다",
    "~인 것 같다",
    "~처럼 보인다",
    "확신한다",
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
    "나는",
    "내가",
    "우리는",
    "우리가",
  ];

  // 객관적 표현 목록
  const objectiveExpressions = [
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
    "~에 의하면",
    "~에 따르면",
    "~가 나타났다",
  ];

  // 주관적/객관적 표현 카운트
  let subjectiveCount = 0;
  let objectiveCount = 0;

  const lowerText = text.toLowerCase();

  // 주관적 표현 카운트
  for (const expr of subjectiveExpressions) {
    const regex = new RegExp(expr, "gi");
    const matches = lowerText.match(regex);
    if (matches) {
      subjectiveCount += matches.length;
    }
  }

  // 객관적 표현 카운트
  for (const expr of objectiveExpressions) {
    const regex = new RegExp(expr, "gi");
    const matches = lowerText.match(regex);
    if (matches) {
      objectiveCount += matches.length;
    }
  }

  // 1인칭 대명사 카운트 (주관성 지표)
  const firstPersonPronouns = [
    "나",
    "내",
    "나의",
    "나를",
    "나에게",
    "나와",
    "우리",
    "우리의",
    "우리를",
    "우리에게",
    "우리와",
  ];
  for (const pronoun of firstPersonPronouns) {
    const regex = new RegExp(`\\b${pronoun}\\b`, "gi");
    const matches = lowerText.match(regex);
    if (matches) {
      subjectiveCount += matches.length;
    }
  }

  // 총 표현 수
  const totalExpressions = Math.max(1, subjectiveCount + objectiveCount);

  // 객관성 점수 계산 (객관적 표현 비율)
  const objectivityRatio = objectiveCount / totalExpressions;

  // 주관적 표현이 많을수록 감점
  const subjectivityPenalty = Math.min(50, subjectiveCount * 5);

  // 최종 객관성 점수 (0~100)
  return Math.max(
    0,
    Math.min(
      100,
      objectivityRatio * 100 - subjectivityPenalty + objectiveCount * 5
    )
  );
}
