import type { EvaluationResult, ExpertiseEvaluation } from '../types';
import evaluateTrustworthiness from './trustworthinessEvaluator';
import evaluateRelevance from './relevanceEvaluator';

// 텍스트 평가를 위한 간단한 토큰화 함수
const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^\w\s가-힣]/g, '') // 특수문자 제거 (한글 포함)
    .split(/\s+/) // 공백 기준 분리
    .filter(word => word.length > 1); // 1글자 이하 단어 제거
};

// 단어 빈도 계산 함수
const calculateWordFrequency = (tokens: string[]): Record<string, number> => {
  const frequency: Record<string, number> = {};
  
  for (const token of tokens) {
    frequency[token] = (frequency[token] || 0) + 1;
  }
  
  return frequency;
};

// 전문성 평가 알고리즘
export const evaluateExpertise = (text: string): ExpertiseEvaluation => {
  if (!text.trim()) {
    return {
      score: 0,
      topicCoherence: '낮음',
      keywordUsage: '낮음',
      details: '텍스트가 비어 있습니다.'
    };
  }

  const tokens = tokenize(text);
  const wordCount = tokens.length;
  const wordFrequency = calculateWordFrequency(tokens);
  
  // 상위 10개 키워드 추출
  const topKeywords = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
  
  // 간단한 토픽 일관성 점수 계산 (같은 단어의 반복 빈도)
  let topicCoherenceScore = 0;
  for (const [, freq] of Object.entries(wordFrequency)) {
    if (freq > 1) {
      topicCoherenceScore += Math.min(freq, 5); // 너무 많은 반복은 제한
    }
  }
  
  // 텍스트 길이에 따른 정규화
  topicCoherenceScore = Math.min(100, (topicCoherenceScore / (wordCount * 0.1)) * 100);
  
  // 전문 용어 활용 점수 (실제로는 도메인 특화 사전이 필요하지만 여기서는 단어 길이로 대체)
  let keywordScore = 0;
  for (const token of tokens) {
    if (token.length > 5) { // 5글자 이상의 단어를 전문 용어로 가정
      keywordScore += 1;
    }
  }
  
  keywordScore = Math.min(100, (keywordScore / (wordCount * 0.2)) * 100);
  
  // 최종 전문성 점수 계산 (토픽 일관성 60%, 키워드 활용 40%)
  const finalScore = Math.round((topicCoherenceScore * 0.6) + (keywordScore * 0.4));
  
  // 등급 계산
  const getLevel = (score: number) => {
    if (score >= 75) return '높음';
    if (score >= 50) return '중간';
    return '낮음';
  };
  
  return {
    score: finalScore,
    topicCoherence: getLevel(topicCoherenceScore),
    keywordUsage: getLevel(keywordScore),
    details: `텍스트 길이: ${wordCount}단어\n주요 키워드: ${topKeywords.join(', ')}\n\n이 텍스트는 ${getLevel(topicCoherenceScore)} 수준의 토픽 일관성을 보이며, 전문용어 활용은 ${getLevel(keywordScore)} 수준으로 나타났습니다.`
  };
};

export const evaluateText = (text: string): EvaluationResult => {
  const expertise = evaluateExpertise(text);
  const trustworthiness = evaluateTrustworthiness(text);
  const relevance = evaluateRelevance(text);
  
  return {
    expertise,
    trustworthiness,
    relevance
  };
};

export default evaluateText;