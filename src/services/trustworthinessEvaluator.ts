import type { TrustworthinessEvaluation } from '../types';

// 주관적 표현 목록 (예시)
const subjectiveTerms = [
  '생각한다', '느낌', '추측', '아마도', '개인적으로', '내 생각에', '내 관점에서',
  '~인 것 같다', '~처럼 보인다', '확신한다', '분명히', '절대', '항상', '절대로', '전혀',
  '매우', '너무', '굉장히', '엄청나게', '훨씬', '최고', '최악', '가장', '제일'
];

// 신뢰성 키워드 목록 (예시)
const trustKeywords = [
  '연구에 따르면', '실험 결과', '조사 결과', '통계적으로', '과학적으로', '객관적으로',
  '전문가들은', '증거에 기반하여', '참고문헌', '인용', '출처', '데이터', '분석 결과',
  '연구팀은', '증명되었다', '검증되었다', '입증되었다'
];

// 텍스트 평가를 위한 간단한 토큰화 함수
const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^\w\s가-힣]/g, '') // 특수문자 제거 (한글 포함)
    .split(/\s+/) // 공백 기준 분리
    .filter(word => word.length > 1); // 1글자 이하 단어 제거
};

// 텍스트에서 특정 표현 목록의 포함 횟수 계산
const countTermOccurrences = (text: string, terms: string[]): number => {
  const lowerText = text.toLowerCase();
  let count = 0;
  
  for (const term of terms) {
    const regex = new RegExp(term, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      count += matches.length;
    }
  }
  
  return count;
};

export const evaluateTrustworthiness = (text: string): TrustworthinessEvaluation => {
  if (!text.trim()) {
    return {
      score: 0,
      subjectiveExpressionRatio: '낮음',
      trustKeywordUsage: '낮음',
      details: '텍스트가 비어 있습니다.'
    };
  }
  
  const words = tokenize(text);
  const wordCount = words.length;
  
  // 주관적 표현 비율 계산
  const subjectiveCount = countTermOccurrences(text, subjectiveTerms);
  const subjectiveRatio = (subjectiveCount / wordCount) * 100;
  
  // 신뢰성 키워드 사용량 계산
  const trustKeywordCount = countTermOccurrences(text, trustKeywords);
  const trustKeywordRatio = (trustKeywordCount / wordCount) * 100;
  
  // 주관적 표현이 적을수록, 신뢰성 키워드가 많을수록 높은 점수
  // 주관적 표현 비율에 따른 점수 (최대 50점)
  const subjectiveScore = 50 - Math.min(50, subjectiveRatio * 10);
  
  // 신뢰성 키워드 비율에 따른 점수 (최대 50점)
  const trustKeywordScore = Math.min(50, trustKeywordRatio * 25);
  
  // 최종 신뢰성 점수 계산
  const finalScore = Math.round(subjectiveScore + trustKeywordScore);
  
  // 등급 계산
  const getSubjectiveLevel = (ratio: number) => {
    if (ratio < 2) return '낮음';
    if (ratio < 5) return '중간';
    return '높음';
  };
  
  const getTrustKeywordLevel = (ratio: number) => {
    if (ratio < 1) return '낮음';
    if (ratio < 3) return '중간';
    return '높음';
  };
  
  return {
    score: finalScore,
    subjectiveExpressionRatio: getSubjectiveLevel(subjectiveRatio),
    trustKeywordUsage: getTrustKeywordLevel(trustKeywordRatio),
    details: `총 단어 수: ${wordCount}개\n주관적 표현 수: ${subjectiveCount}개 (${subjectiveRatio.toFixed(2)}%)\n신뢰성 키워드 수: ${trustKeywordCount}개 (${trustKeywordRatio.toFixed(2)}%)\n\n이 텍스트는 ${getSubjectiveLevel(subjectiveRatio)} 수준의 주관적 표현을 사용하고 있으며, 신뢰성 키워드 사용은 ${getTrustKeywordLevel(trustKeywordRatio)} 수준으로 나타났습니다.`
  };
};

export default evaluateTrustworthiness;