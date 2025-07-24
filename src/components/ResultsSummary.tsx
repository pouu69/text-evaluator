import { useState, useEffect } from 'react';
import type { EvaluationResult } from '../types';

interface ResultsSummaryProps {
  result: EvaluationResult | null;
}

const ResultsSummary = ({ result }: ResultsSummaryProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // 컴포넌트가 마운트되면 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!result) return null;

  const { expertise, trustworthiness, relevance } = result;

  const getScoreColorClass = (score: number) => {
    if (score >= 90) return 'text-success-500';
    if (score >= 70) return 'text-primary-500';
    if (score >= 50) return 'text-warning-500';
    return 'text-danger-500';
  };
  
  const getScoreGradientClass = (score: number) => {
    if (score >= 90) return 'from-success-500 to-success-400';
    if (score >= 70) return 'from-primary-500 to-primary-400';
    if (score >= 50) return 'from-warning-500 to-warning-400';
    return 'from-danger-500 to-danger-400';
  };
  
  const getScoreBgClass = (score: number) => {
    if (score >= 90) return 'bg-success-50 border-success-200';
    if (score >= 70) return 'bg-primary-50 border-primary-200';
    if (score >= 50) return 'bg-warning-50 border-warning-200';
    return 'bg-danger-50 border-danger-200';
  };
  
  const getScoreIcon = (score: number) => {
    if (score >= 90) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    if (score >= 70) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    }
    if (score >= 50) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-warning-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  return (
    <div className={`mt-8 p-8 bg-white rounded-3xl shadow-card transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="flex items-center justify-center mb-8">
        <div className="p-2 bg-primary-100 rounded-lg mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold font-display text-gray-800">평가 결과 요약</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 전문성 결과 */}
        <div className={`p-6 border-2 rounded-2xl transition-all duration-300 hover:shadow-md ${getScoreBgClass(expertise.score)}`}>
          <div className="flex items-center mb-4">
            {getScoreIcon(expertise.score)}
            <h3 className="text-xl font-semibold ml-2 font-display">전문성</h3>
          </div>
          
          <div className="mb-6 relative">
            <div className={`text-5xl font-bold ${getScoreColorClass(expertise.score)}`}>
              {expertise.score}
            </div>
            <div className="absolute top-0 right-0 text-lg font-medium text-gray-400">/ 100</div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div 
              className={`h-2.5 rounded-full bg-gradient-to-r ${getScoreGradientClass(expertise.score)}`} 
              style={{ width: `${expertise.score}%`, transition: 'width 1s ease-in-out' }}
            ></div>
          </div>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 mr-2">
                <span className="text-xs font-semibold text-gray-600">01</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">토픽 집중도:</span> 
                <span className="ml-1 font-semibold">{expertise.topicCoherence}</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 mr-2">
                <span className="text-xs font-semibold text-gray-600">02</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">전문 용어 활용률:</span> 
                <span className="ml-1 font-semibold">{expertise.keywordUsage}</span>
              </div>
            </li>
          </ul>
        </div>

        {/* 신뢰성 결과 */}
        <div className={`p-6 border-2 rounded-2xl transition-all duration-300 hover:shadow-md ${getScoreBgClass(trustworthiness.score)}`}
             style={{ transitionDelay: '100ms' }}>
          <div className="flex items-center mb-4">
            {getScoreIcon(trustworthiness.score)}
            <h3 className="text-xl font-semibold ml-2 font-display">신뢰성</h3>
          </div>
          
          <div className="mb-6 relative">
            <div className={`text-5xl font-bold ${getScoreColorClass(trustworthiness.score)}`}>
              {trustworthiness.score}
            </div>
            <div className="absolute top-0 right-0 text-lg font-medium text-gray-400">/ 100</div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div 
              className={`h-2.5 rounded-full bg-gradient-to-r ${getScoreGradientClass(trustworthiness.score)}`} 
              style={{ width: `${trustworthiness.score}%`, transition: 'width 1s ease-in-out' }}
            ></div>
          </div>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 mr-2">
                <span className="text-xs font-semibold text-gray-600">01</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">주관적 표현 비중:</span> 
                <span className="ml-1 font-semibold">{trustworthiness.subjectiveExpressionRatio}</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 mr-2">
                <span className="text-xs font-semibold text-gray-600">02</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">신뢰 기반 키워드:</span> 
                <span className="ml-1 font-semibold">{trustworthiness.trustKeywordUsage}</span>
              </div>
            </li>
          </ul>
        </div>

        {/* 관련성 결과 */}
        <div className={`p-6 border-2 rounded-2xl transition-all duration-300 hover:shadow-md ${getScoreBgClass(relevance.score)}`}
             style={{ transitionDelay: '200ms' }}>
          <div className="flex items-center mb-4">
            {getScoreIcon(relevance.score)}
            <h3 className="text-xl font-semibold ml-2 font-display">관련성</h3>
          </div>
          
          <div className="mb-6 relative">
            <div className={`text-5xl font-bold ${getScoreColorClass(relevance.score)}`}>
              {relevance.score}
            </div>
            <div className="absolute top-0 right-0 text-lg font-medium text-gray-400">/ 100</div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div 
              className={`h-2.5 rounded-full bg-gradient-to-r ${getScoreGradientClass(relevance.score)}`} 
              style={{ width: `${relevance.score}%`, transition: 'width 1s ease-in-out' }}
            ></div>
          </div>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 mr-2">
                <span className="text-xs font-semibold text-gray-600">01</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">키워드 밀도:</span> 
                <span className="ml-1 font-semibold">{relevance.keywordDensity}</span>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mt-0.5 mr-2">
                <span className="text-xs font-semibold text-gray-600">02</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">검색 쿼리 적합도:</span> 
                <span className="ml-1 font-semibold">{relevance.queryRelevance}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-primary-50 border border-primary-100 rounded-xl text-center">
        <p className="text-gray-700">
          총 평가 점수: <span className="font-bold text-primary-600">{Math.round((expertise.score + trustworthiness.score + relevance.score) / 3)}</span>/100
        </p>
      </div>
    </div>
  );
};

export default ResultsSummary;
