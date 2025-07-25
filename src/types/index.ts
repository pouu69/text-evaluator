// 평가 결과를 나타내는 인터페이스
export interface EvaluationResult {
  expertise: ExpertiseEvaluation;
  trustworthiness: TrustworthinessEvaluation;
  relevance: RelevanceEvaluation;
}

// 주제 일관성 분석 결과
export interface TopicCoherenceAnalysis {
  score: number; // 주제 일관성 점수
  level: string; // 등급 (낮음, 중간, 높음)
  sentences: string[]; // 주요 문장
}

// 키워드 분석 결과
export interface KeywordAnalysis {
  total: {
    count: number; // 총 개수
    ratio: number; // 비율 (%)
    keywords: string[]; // 주요 키워드 목록
  };
  categories?: {
    domain: { count: number; ratio: number }; // 도메인 키워드
    technical: { count: number; ratio: number }; // 기술 키워드
    general: { count: number; ratio: number }; // 일반 키워드
  };
}

// 전문성 점수 분석 결과
export interface ExpertiseScores {
  complexity: { score: number; level: string }; // 복잡성 점수
  vocabulary: { score: number; level: string }; // 어휘 다양성 점수
  technicalTerms: { score: number; level: string }; // 전문 용어 점수
  coherence: { score: number; level: string }; // 일관성 점수
}

// 전문성 평가 인터페이스 (확장된 버전)
export interface ExpertiseEvaluation {
  score: number; // 0-100 점수
  topicCoherence: string; // '낮음' | '중간' | '높음'
  keywordUsage: string; // '낮음' | '중간' | '높음'
  details: string; // 세부 평가 내용 (하위 호환성 유지)
  
  // 구조화된 데이터 (UI 컴포넌트에서 쉽게 사용 가능)
  wordCount: number; // 총 단어 수
  topicAnalysis: TopicCoherenceAnalysis; // 주제 일관성 분석
  keywordAnalysis: KeywordAnalysis; // 키워드 분석
  scores: ExpertiseScores; // 세부 점수
  keySentences: string[]; // 핵심 문장
}

// 감정 분석 결과 인터페이스
export interface EmotionalContext {
  score: number; // 감정 점수 (-1 ~ 1)
  dominantEmotion: string; // '긍정' | '부정' | '중립' | '혼합'
  emotionalExpressions: string[]; // 감정 표현 목록
}

// 카테고리별 주관적 표현 분석 결과
export interface SubjectiveExpressionAnalysis {
  total: {
    count: number; // 총 개수
    ratio: number; // 비율 (%)
    expressions: string[]; // 주요 표현 목록
  };
  categories: {
    opinion: { count: number; ratio: number }; // 의견 표현
    emphasis: { count: number; ratio: number }; // 강조 표현
    firstPerson: { count: number; ratio: number }; // 1인칭 표현
    emotion: { count: number; ratio: number }; // 감정 표현
    exaggeration: { count: number; ratio: number }; // 과장 표현
  };
}

// 신뢰 요소 분석 결과
export interface TrustElementAnalysis {
  total: {
    count: number; // 총 개수
    ratio: number; // 비율 (%)
    elements: string[]; // 주요 신뢰 요소 목록
  };
  categories: {
    research: { count: number; ratio: number }; // 연구 및 증거 기반 표현
    academic: { count: number; ratio: number }; // 학술적 표현
    data: { count: number; ratio: number }; // 데이터 관련 표현
    factual: { count: number; ratio: number }; // 객관적 사실 표현
  };
}

// 신뢰성 점수 분석 결과
export interface TrustworthinessScores {
  authenticity: { score: number; level: string }; // 진정성 점수
  emotionalExpression: { score: number; level: string }; // 감정 표현 점수
  readability: { score: number; level: string }; // 가독성 점수
  trustElement: { score: number; level: string }; // 신뢰 요소 점수
}

// 신뢰성 평가 인터페이스 (확장된 버전)
export interface TrustworthinessEvaluation {
  score: number; // 0-100 점수
  subjectiveExpressionRatio: string; // '낮음' | '중간' | '높음'
  trustKeywordUsage: string; // '낮음' | '중간' | '높음'
  details: string; // 세부 평가 내용 (하위 호환성 유지)
  
  // 구조화된 데이터 (UI 컴포넌트에서 쉽게 사용 가능)
  wordCount: number; // 총 단어 수
  subjectiveExpressions: SubjectiveExpressionAnalysis; // 주관적 표현 분석
  trustElements: TrustElementAnalysis; // 신뢰 요소 분석
  emotionalContext: EmotionalContext; // 감정 분석
  scores: TrustworthinessScores; // 세부 점수
}

// 키워드 밀도 분석 결과
export interface KeywordDensityAnalysis {
  score: number; // 키워드 밀도 점수
  level: string; // 등급 (낮음, 중간, 높음, 우수)
  keywords: {
    primary: { keyword: string; count: number; density: number }[]; // 주요 키워드
    secondary: { keyword: string; count: number; density: number }[]; // 보조 키워드
  };
}

// 쿼리 관련성 분석 결과
export interface QueryRelevanceAnalysis {
  score: number; // 쿼리 관련성 점수
  level: string; // 등급 (낮음, 중간, 높음)
  queries: { query: string; relevance: number }[]; // 쿼리별 관련성
}

// 관련성 점수 분석 결과
export interface RelevanceScores {
  keywordMatch: { score: number; level: string }; // 키워드 일치 점수
  semanticRelevance: { score: number; level: string }; // 의미적 관련성 점수
  contextualFit: { score: number; level: string }; // 문맥 적합성 점수
  queryAlignment: { score: number; level: string }; // 쿼리 정렬 점수
}

// 관련성 평가 인터페이스 (확장된 버전)
export interface RelevanceEvaluation {
  score: number; // 0-100 점수
  keywordDensity: string; // '낮음' | '중간' | '높음' | '우수'
  queryRelevance: string; // '낮음' | '중간' | '높음'
  details: string; // 세부 평가 내용 (하위 호환성 유지)
  
  // 구조화된 데이터 (UI 컴포넌트에서 쉽게 사용 가능)
  wordCount: number; // 총 단어 수
  keywordDensityAnalysis: KeywordDensityAnalysis; // 키워드 밀도 분석
  queryRelevanceAnalysis: QueryRelevanceAnalysis; // 쿼리 관련성 분석
  scores: RelevanceScores; // 세부 점수
  suggestedKeywords: string[]; // 추천 키워드
}
