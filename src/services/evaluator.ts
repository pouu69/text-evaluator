import type { EvaluationResult, ExpertiseEvaluation } from "../types";
import evaluateTrustworthiness from "./trustworthinessEvaluator";
import evaluateRelevance from "./relevanceEvaluator";
import {
  tokenize,
  analyzeTopicCoherence,
  analyzeComplexity,
  extractKeySentences,
  analyzeExpertiseLevel,
} from "../utils/textAnalysis";

/**
 * 콘텐츠 품질 평가 알고리즘 (블로그 포스팅 최적화 버전)
 *
 * 이 함수는 블로그 포스팅 텍스트의 품질을 다양한 측면에서 분석합니다:
 * 1. 주제 일관성 - 포스팅이 일관된 주제를 유지하는지 평가
 * 2. 콘텐츠 풍부도 - 주제에 관련된 키워드와 표현의 사용 빈도 분석
 * 3. 가독성 - 어휘 다양성, 문장 구조 등을 분석
 * 4. 핵심 문장 추출 - 포스팅의 핵심 내용을 요약
 *
 * @param text 평가할 텍스트
 * @returns 콘텐츠 품질 평가 결과
 */
export const evaluateExpertise = (text: string): ExpertiseEvaluation => {
  // 빈 텍스트 처리
  if (!text.trim()) {
    return {
      score: 0,
      topicCoherence: "낮음",
      keywordUsage: "낮음",
      details: "텍스트가 비어 있습니다.",
      wordCount: 0,
      topicAnalysis: {
        score: 0,
        level: "낮음",
        sentences: [],
      },
      keywordAnalysis: {
        total: {
          count: 0,
          ratio: 0,
          keywords: [],
        },
        categories: {
          domain: { count: 0, ratio: 0 },
          technical: { count: 0, ratio: 0 },
          general: { count: 0, ratio: 0 },
        },
      },
      scores: {
        complexity: { score: 0, level: "낮음" },
        vocabulary: { score: 0, level: "낮음" },
        technicalTerms: { score: 0, level: "낮음" },
        coherence: { score: 0, level: "낮음" },
      },
      keySentences: [],
    };
  }

  // 텍스트 토큰화 (블로그 포스팅에 최적화된 옵션 적용)
  const tokens = tokenize(text, {
    minWordLength: 2,
    removeStopwords: true,
    koreanMorphologicalAnalysis: true,
  });

  const wordCount = tokens.length;

  // 단어 빈도 분석 (Map 사용으로 성능 최적화)
  const wordFrequencyMap = new Map<string, number>();

  for (const token of tokens) {
    wordFrequencyMap.set(token, (wordFrequencyMap.get(token) || 0) + 1);
  }

  // Map을 Record로 변환
  const wordFrequency: Record<string, number> = {};
  wordFrequencyMap.forEach((value, key) => {
    wordFrequency[key] = value;
  });

  // 상위 키워드 추출 (최대 15개)
  const topKeywords = Array.from(wordFrequencyMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word, freq]) => `${word}(${freq})`);

  // 주제 일관성 분석 (0-100)
  // 블로그 포스팅은 약간의 주제 이탈이 허용되므로 가중치 조정
  const topicCoherenceScore = analyzeTopicCoherence(text) * 0.8 + 20; // 기본 점수 부여

  // 콘텐츠 풍부도 분석 (전문성 대신)
  // 블로그 포스팅에서는 전문 용어보다 관련 키워드의 다양성이 중요
  const contentRichnessScore = Math.min(
    100,
    (Object.keys(wordFrequency).length / wordCount) * 200 + 30
  );

  // 전문성 분석 (개선된 버전)
  // 도메인 키워드를 사용하여 전문성 평가
  const expertiseScore = analyzeExpertiseLevel(text);

  // 가독성 분석 (복잡성 대신)
  // 블로그 포스팅은 적당한 복잡성이 좋음 (너무 복잡하거나 너무 단순하면 감점)
  const complexityScore = analyzeComplexity(text);
  const readabilityScore = 100 - Math.abs(complexityScore - 50);

  // 문장 구조 다양성 분석
  const sentenceDiversity = analyzeSentenceDiversity(text);

  // 핵심 문장 추출 (최대 3문장)
  const keySentences = extractKeySentences(text, 3);

  // 최종 콘텐츠 품질 점수 계산 (각 요소별 가중치 적용)
  const finalScore = Math.round(
    topicCoherenceScore * 0.35 + // 주제 일관성 (35%)
      contentRichnessScore * 0.25 + // 콘텐츠 풍부도 (25%)
      expertiseScore * 0.2 + // 전문성 (20%)
      readabilityScore * 0.1 + // 가독성 (10%)
      sentenceDiversity * 0.1 // 문장 다양성 (10%)
  );

  // 등급 계산 함수 (블로그 포스팅에 맞게 조정)
  const getLevel = (score: number) => {
    if (score >= 75) return "매우 높음";
    if (score >= 60) return "높음";
    if (score >= 45) return "중간";
    if (score >= 30) return "낮음";
    return "매우 낮음";
  };

  // 키워드 분석 결과 구성
  const keywordAnalysis = {
    total: {
      count: topKeywords.length,
      ratio: topKeywords.length / wordCount * 100,
      keywords: topKeywords.map(kw => kw.split('(')[0]), // 빈도수 제외하고 키워드만 추출
    },
    categories: {
      domain: { 
        count: Math.round(topKeywords.length * 0.4), // 예시 값 (실제로는 도메인 키워드 분석 필요)
        ratio: 40 
      },
      technical: { 
        count: Math.round(topKeywords.length * 0.3), // 예시 값
        ratio: 30 
      },
      general: { 
        count: Math.round(topKeywords.length * 0.3), // 예시 값
        ratio: 30 
      },
    },
  };

  // 주제 일관성 분석 결과 구성
  const topicAnalysis = {
    score: topicCoherenceScore,
    level: getLevel(topicCoherenceScore),
    sentences: keySentences.slice(0, 2), // 핵심 문장 중 상위 2개
  };

  // 세부 점수 구성
  const scores = {
    complexity: { 
      score: complexityScore, 
      level: getLevel(complexityScore) 
    },
    vocabulary: { 
      score: contentRichnessScore, 
      level: getLevel(contentRichnessScore) 
    },
    technicalTerms: { 
      score: expertiseScore, 
      level: getLevel(expertiseScore) 
    },
    coherence: { 
      score: topicCoherenceScore, 
      level: getLevel(topicCoherenceScore) 
    },
  };

  // 결과 생성 (구조화된 데이터 포함)
  return {
    // 기본 필드 (하위 호환성 유지)
    score: Math.min(100, finalScore),
    topicCoherence: getLevel(topicCoherenceScore),
    keywordUsage: getLevel(contentRichnessScore),
    
    // 구조화된 데이터 필드
    wordCount,
    topicAnalysis,
    keywordAnalysis,
    scores,
    keySentences,
    
    // 기존 details 문자열 (하위 호환성 유지)
    details: `
텍스트 길이: ${wordCount}단어

주요 키워드: ${topKeywords.join(", ")}

주제 일관성: ${topicCoherenceScore.toFixed(1)}점 (${getLevel(
      topicCoherenceScore
    )})
콘텐츠 풍부도: ${contentRichnessScore.toFixed(1)}점 (${getLevel(
      contentRichnessScore
    )})
전문성: ${expertiseScore.toFixed(1)}점 (${getLevel(expertiseScore)})
가독성: ${readabilityScore.toFixed(1)}점 (${getLevel(readabilityScore)})
문장 다양성: ${sentenceDiversity.toFixed(1)}점 (${getLevel(sentenceDiversity)})

핵심 문장:
${keySentences.map((s, i) => `${i + 1}. ${s}`).join("\n")}

종합 평가:
이 블로그 포스팅은 ${getLevel(
      topicCoherenceScore
    )} 수준의 주제 일관성을 보이며, 콘텐츠 풍부도는 ${getLevel(
      contentRichnessScore
    )} 수준입니다. 전문성은 ${getLevel(
      expertiseScore
    )} 수준이고, 가독성은 ${getLevel(readabilityScore)} 수준으로 평가됩니다.
    `.trim(),
  };
};

/**
 * 문장 구조 다양성 분석
 * @param text 분석할 텍스트
 * @returns 문장 다양성 점수 (0-100)
 */
function analyzeSentenceDiversity(text: string): number {
  // 문장 분리
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length <= 1) return 50; // 문장이 하나면 중간 점수

  // 문장 길이 분석
  const sentenceLengths = sentences.map((s) => s.trim().split(/\s+/).length);
  const avgLength =
    sentenceLengths.reduce((sum, len) => sum + len, 0) / sentenceLengths.length;

  // 문장 길이 표준편차 (다양성 지표)
  const variance =
    sentenceLengths.reduce(
      (sum, len) => sum + Math.pow(len - avgLength, 2),
      0
    ) / sentenceLengths.length;
  const stdDev = Math.sqrt(variance);

  // 문장 시작 단어 다양성
  const startWords = new Set<string>();
  sentences.forEach((s) => {
    const words = s.trim().split(/\s+/);
    if (words.length > 0) {
      startWords.add(words[0].toLowerCase());
    }
  });

  const startWordDiversity = startWords.size / sentences.length;

  // 문장 유형 분석 (의문문, 감탄문, 평서문)
  const questionCount = sentences.filter((s) => s.trim().endsWith("?")).length;
  const exclamationCount = sentences.filter((s) =>
    s.trim().endsWith("!")
  ).length;
  const statementCount = sentences.length - questionCount - exclamationCount;

  const sentenceTypeDiversity =
    Math.min(
      1,
      (questionCount > 0 ? 1 : 0) +
        (exclamationCount > 0 ? 1 : 0) +
        (statementCount > 0 ? 1 : 0)
    ) / 3;

  // 최종 다양성 점수 계산
  const lengthDiversityScore = Math.min(100, stdDev * 10); // 표준편차가 클수록 다양성 높음
  const startWordDiversityScore = startWordDiversity * 100;
  const typeScore = sentenceTypeDiversity * 100;

  // 가중 평균
  return (
    lengthDiversityScore * 0.5 + startWordDiversityScore * 0.3 + typeScore * 0.2
  );
}

/**
 * 통합 텍스트 평가 함수
 *
 * 텍스트의 전문성, 신뢰성, 관련성을 종합적으로 평가합니다.
 *
 * @param text 평가할 텍스트
 * @returns 종합 평가 결과
 */
export const evaluateText = (text: string): EvaluationResult => {
  // 각 영역별 평가 수행
  const expertise = evaluateExpertise(text);
  const trustworthiness = evaluateTrustworthiness(text);
  const relevance = evaluateRelevance(text);

  return {
    expertise,
    trustworthiness,
    relevance,
  };
};

export default evaluateText;
