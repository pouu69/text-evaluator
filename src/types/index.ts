// 평가 결과를 나타내는 인터페이스
export interface EvaluationResult {
  expertise: ExpertiseEvaluation;
  trustworthiness: TrustworthinessEvaluation;
  relevance: RelevanceEvaluation;
}

// 전문성 평가 인터페이스
export interface ExpertiseEvaluation {
  score: number; // 0-100 점수
  topicCoherence: string; // '낮음' | '중간' | '높음'
  keywordUsage: string; // '낮음' | '중간' | '높음'
  details: string; // 세부 평가 내용
}

// 신뢰성 평가 인터페이스
export interface TrustworthinessEvaluation {
  score: number; // 0-100 점수
  subjectiveExpressionRatio: string; // '낮음' | '중간' | '높음'
  trustKeywordUsage: string; // '낮음' | '중간' | '높음'
  details: string; // 세부 평가 내용
}

// 관련성 평가 인터페이스
export interface RelevanceEvaluation {
  score: number; // 0-100 점수
  keywordDensity: string; // '낮음' | '중간' | '높음' | '우수'
  queryRelevance: string; // '낮음' | '중간' | '높음'
  details: string; // 세부 평가 내용
}