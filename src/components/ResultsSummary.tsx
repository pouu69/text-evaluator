import type { EvaluationResult } from '../types';

interface ResultsSummaryProps {
  result: EvaluationResult | null;
}

const ResultsSummary = ({ result }: ResultsSummaryProps) => {
  if (!result) return null;

  const { expertise, trustworthiness, relevance } = result;

  const getScoreColorClass = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">평가 결과 요약</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 전문성 결과 */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">전문성</h3>
          <div className={`text-4xl font-bold mb-4 ${getScoreColorClass(expertise.score)}`}>
            {expertise.score}점
          </div>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">토픽 집중도:</span> {expertise.topicCoherence}
            </li>
            <li>
              <span className="font-medium">전문 용어 활용률:</span> {expertise.keywordUsage}
            </li>
          </ul>
        </div>

        {/* 신뢰성 결과 */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">신뢰성</h3>
          <div className={`text-4xl font-bold mb-4 ${getScoreColorClass(trustworthiness.score)}`}>
            {trustworthiness.score}점
          </div>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">주관적 표현 비중:</span> {trustworthiness.subjectiveExpressionRatio}
            </li>
            <li>
              <span className="font-medium">신뢰 기반 키워드 사용량:</span> {trustworthiness.trustKeywordUsage}
            </li>
          </ul>
        </div>

        {/* 관련성 결과 */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">관련성</h3>
          <div className={`text-4xl font-bold mb-4 ${getScoreColorClass(relevance.score)}`}>
            {relevance.score}점
          </div>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">키워드 밀도:</span> {relevance.keywordDensity}
            </li>
            <li>
              <span className="font-medium">검색 쿼리 적합도:</span> {relevance.queryRelevance}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;