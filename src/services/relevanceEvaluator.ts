import type { RelevanceEvaluation } from '../types';

// 텍스트 평가를 위한 간단한 토큰화 함수
const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^\w\s가-힣]/g, '') // 특수문자 제거 (한글 포함)
    .split(/\s+/) // 공백 기준 분리
    .filter(word => word.length > 1); // 1글자 이하 단어 제거
};

// 단어 빈도 계산 함수 (TF)
const calculateTermFrequency = (tokens: string[]): Record<string, number> => {
  const frequency: Record<string, number> = {};
  
  for (const token of tokens) {
    frequency[token] = (frequency[token] || 0) + 1;
  }
  
  return frequency;
};

// TF-IDF 계산을 위한 간단한 시뮬레이션 (IDF 부분은 가상의 문서 집합 가정)
const calculateTfIdf = (
  termFrequency: Record<string, number>, 
  totalTerms: number,
  query?: string[]
): Record<string, number> => {
  const tfIdf: Record<string, number> = {};
  const simulatedIdf = 1.5; // 실제로는 문서 집합에서 계산해야 함
  
  for (const [term, freq] of Object.entries(termFrequency)) {
    // TF 계산 (상대적 빈도)
    const tf = freq / totalTerms;
    
    // 쿼리 관련 단어에 가중치 부여
    let queryBoost = 1.0;
    if (query && query.includes(term)) {
      queryBoost = 2.0;
    }
    
    // TF-IDF 계산
    tfIdf[term] = tf * simulatedIdf * queryBoost;
  }
  
  return tfIdf;
};

// 키워드 밀도 분석 (문서 길이 고려)
const analyzeKeywordDensity = (tokens: string[]): { density: number, level: string } => {
  if (tokens.length === 0) return { density: 0, level: '낮음' };
  
  const termFrequency = calculateTermFrequency(tokens);
  
  // 상위 5개 단어의 비중 계산
  const topKeywords = Object.entries(termFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  const totalTopFrequency = topKeywords.reduce((sum, [_, freq]) => sum + freq, 0);
  const density = (totalTopFrequency / tokens.length) * 100;
  
  // 밀도 레벨 결정
  let level = '낮음';
  if (density >= 25) level = '우수';
  else if (density >= 15) level = '높음';
  else if (density >= 10) level = '중간';
  
  return { density, level };
};

// 쿼리 관련성 분석 (실제 애플리케이션에서는 사용자 입력 쿼리와 비교)
const analyzeQueryRelevance = (text: string, simulatedQuery: string[]): { score: number, level: string } => {
  const tokens = tokenize(text);
  const queryMatches = tokens.filter(token => simulatedQuery.includes(token)).length;
  
  // 쿼리 매칭 점수 계산
  const relevanceScore = (queryMatches / Math.max(1, simulatedQuery.length)) * 100;
  
  // 관련성 레벨 결정
  let level = '낮음';
  if (relevanceScore >= 70) level = '높음';
  else if (relevanceScore >= 40) level = '중간';
  
  return { score: relevanceScore, level };
};

export const evaluateRelevance = (text: string): RelevanceEvaluation => {
  if (!text.trim()) {
    return {
      score: 0,
      keywordDensity: '낮음',
      queryRelevance: '낮음',
      details: '텍스트가 비어 있습니다.'
    };
  }
  
  const tokens = tokenize(text);
  
  // 실제 애플리케이션에서는 사용자의 검색 쿼리 또는 관심사를 받아야 함
  // 여기서는 가상의 쿼리 사용
  const simulatedQuery = ['블로그', '글쓰기', '콘텐츠', '마케팅', '분석'];
  
  // 키워드 밀도 분석
  const { density, level: densityLevel } = analyzeKeywordDensity(tokens);
  
  // 쿼리 관련성 분석
  const { score: queryScore, level: queryLevel } = analyzeQueryRelevance(text, simulatedQuery);
  
  // 단어 빈도 계산
  const termFrequency = calculateTermFrequency(tokens);
  
  // TF-IDF 계산 (시뮬레이션)
  const tfIdf = calculateTfIdf(termFrequency, tokens.length, simulatedQuery);
  
  // 상위 키워드 추출
  const topKeywords = Object.entries(termFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([term, freq]) => `${term} (${freq}회)`);
  
  // 최종 관련성 점수 계산 (키워드 밀도 60%, 쿼리 관련성 40%)
  const finalScore = Math.round((density * 0.6) + (queryScore * 0.4));
  
  return {
    score: Math.min(100, finalScore),
    keywordDensity: densityLevel,
    queryRelevance: queryLevel,
    details: `텍스트 길이: ${tokens.length}단어\n상위 키워드: ${topKeywords.join(', ')}\n키워드 밀도: ${density.toFixed(2)}% (${densityLevel})\n쿼리 관련성 점수: ${queryScore.toFixed(2)} (${queryLevel})\n\n이 텍스트는 주요 키워드의 분포가 ${densityLevel} 수준으로 나타났으며, 검색 쿼리와의 관련성은 ${queryLevel} 수준입니다.`
  };
};

export default evaluateRelevance;