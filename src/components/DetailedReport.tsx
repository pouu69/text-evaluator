import { useState, useEffect } from 'react';
import type { EvaluationResult } from '../types';

interface DetailedReportProps {
  result: EvaluationResult | null;
}

const DetailedReport = ({ result }: DetailedReportProps) => {
  const [activeTab, setActiveTab] = useState<'expertise' | 'trustworthiness' | 'relevance'>('expertise');
  const [isVisible, setIsVisible] = useState(false);
  const [isTabChanging, setIsTabChanging] = useState(false);
  
  useEffect(() => {
    // 컴포넌트가 마운트되면 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTabChange = (tab: 'expertise' | 'trustworthiness' | 'relevance') => {
    if (tab === activeTab) return;
    
    setIsTabChanging(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTabChanging(false);
    }, 300);
  };

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

  return (
    <div className={`mt-10 bg-white rounded-3xl shadow-card transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
         style={{ transitionDelay: '200ms' }}>
      <div className="flex items-center justify-center p-8 border-b border-gray-100">
        <div className="p-2 bg-secondary-100 rounded-lg mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold font-display text-gray-800">상세 분석 보고서</h2>
      </div>
      
      {/* 탭 메뉴 */}
      <div className="flex justify-center border-b border-gray-100 bg-gray-50 rounded-t-3xl">
        <div className="flex space-x-2 p-2">
          <button
            className={`py-3 px-6 font-medium rounded-xl transition-all duration-300 ${
              activeTab === 'expertise'
                ? 'bg-white shadow-md text-primary-600 font-semibold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
            onClick={() => handleTabChange('expertise')}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              전문성
            </div>
          </button>
          <button
            className={`py-3 px-6 font-medium rounded-xl transition-all duration-300 ${
              activeTab === 'trustworthiness'
                ? 'bg-white shadow-md text-primary-600 font-semibold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
            onClick={() => handleTabChange('trustworthiness')}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              신뢰성
            </div>
          </button>
          <button
            className={`py-3 px-6 font-medium rounded-xl transition-all duration-300 ${
              activeTab === 'relevance'
                ? 'bg-white shadow-md text-primary-600 font-semibold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
            onClick={() => handleTabChange('relevance')}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              관련성
            </div>
          </button>
        </div>
      </div>
      
      {/* 탭 내용 */}
      <div className="p-8">
        <div className={`transition-opacity duration-300 ${isTabChanging ? 'opacity-0' : 'opacity-100'}`}>
          {activeTab === 'expertise' && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-primary-100 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold font-display">전문성 상세 분석</h3>
              </div>
              
              <div className="mb-8 bg-gray-50 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-medium">종합 점수</h4>
                  <div className={`text-3xl font-bold ${getScoreColorClass(expertise.score)}`}>
                    {expertise.score}/100
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${getScoreGradientClass(expertise.score)}`} 
                    style={{ width: `${expertise.score}%`, transition: 'width 1s ease-in-out' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100">
                  <h4 className="text-lg font-semibold mb-3 text-primary-700">토픽 집중도</h4>
                  <div className="flex items-center mb-4">
                    <div className={`text-2xl font-bold mr-2 ${getScoreColorClass(expertise.score)}`}>
                      {expertise.topicCoherence}
                    </div>
                    <div className="text-sm text-gray-500">
                      {expertise.topicCoherence === '높음' ? '(우수)' : 
                       expertise.topicCoherence === '중간' ? '(양호)' : '(개선 필요)'}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    텍스트가 일관된 주제에 얼마나 잘 집중되어 있는지를 평가합니다. 
                    주제 일관성이 높을수록 독자가 내용을 더 쉽게 이해할 수 있습니다.
                  </p>
                </div>
                
                <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100">
                  <h4 className="text-lg font-semibold mb-3 text-primary-700">전문 용어 활용률</h4>
                  <div className="flex items-center mb-4">
                    <div className={`text-2xl font-bold mr-2 ${getScoreColorClass(expertise.score)}`}>
                      {expertise.keywordUsage}
                    </div>
                    <div className="text-sm text-gray-500">
                      {expertise.keywordUsage === '높음' ? '(우수)' : 
                       expertise.keywordUsage === '중간' ? '(양호)' : '(개선 필요)'}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    해당 분야의 전문 용어와 키워드를 얼마나 적절하게 사용했는지를 측정합니다.
                    적절한 전문 용어 사용은 글의 전문성을 높여줍니다.
                  </p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  상세 분석
                </h4>
                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed">{expertise.details}</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'trustworthiness' && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-secondary-100 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold font-display">신뢰성 상세 분석</h3>
              </div>
              
              <div className="mb-8 bg-gray-50 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-medium">종합 점수</h4>
                  <div className={`text-3xl font-bold ${getScoreColorClass(trustworthiness.score)}`}>
                    {trustworthiness.score}/100
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${getScoreGradientClass(trustworthiness.score)}`} 
                    style={{ width: `${trustworthiness.score}%`, transition: 'width 1s ease-in-out' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
                  <h4 className="text-lg font-semibold mb-3 text-secondary-700">주관적 표현 비중</h4>
                  <div className="flex items-center mb-4">
                    <div className={`text-2xl font-bold mr-2 ${getScoreColorClass(trustworthiness.score)}`}>
                      {trustworthiness.subjectiveExpressionRatio}
                    </div>
                    <div className="text-sm text-gray-500">
                      {trustworthiness.subjectiveExpressionRatio === '낮음' ? '(우수)' : 
                       trustworthiness.subjectiveExpressionRatio === '중간' ? '(양호)' : '(개선 필요)'}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    텍스트에서 주관적인 표현이 차지하는 비중을 분석합니다.
                    객관적인 표현이 많을수록 신뢰도가 높아집니다.
                  </p>
                </div>
                
                <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
                  <h4 className="text-lg font-semibold mb-3 text-secondary-700">신뢰 기반 키워드 사용량</h4>
                  <div className="flex items-center mb-4">
                    <div className={`text-2xl font-bold mr-2 ${getScoreColorClass(trustworthiness.score)}`}>
                      {trustworthiness.trustKeywordUsage}
                    </div>
                    <div className="text-sm text-gray-500">
                      {trustworthiness.trustKeywordUsage === '높음' ? '(우수)' : 
                       trustworthiness.trustKeywordUsage === '중간' ? '(양호)' : '(개선 필요)'}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    신뢰도를 높이는 키워드와 표현의 사용 빈도를 측정합니다.
                    근거, 출처, 데이터 등의 표현이 많을수록 신뢰도가 높아집니다.
                  </p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  상세 분석
                </h4>
                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed">{trustworthiness.details}</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'relevance' && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-warning-100 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold font-display">관련성 상세 분석</h3>
              </div>
              
              <div className="mb-8 bg-gray-50 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-medium">종합 점수</h4>
                  <div className={`text-3xl font-bold ${getScoreColorClass(relevance.score)}`}>
                    {relevance.score}/100
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${getScoreGradientClass(relevance.score)}`} 
                    style={{ width: `${relevance.score}%`, transition: 'width 1s ease-in-out' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-warning-50 p-6 rounded-2xl border border-warning-100">
                  <h4 className="text-lg font-semibold mb-3 text-warning-700">키워드 밀도</h4>
                  <div className="flex items-center mb-4">
                    <div className={`text-2xl font-bold mr-2 ${getScoreColorClass(relevance.score)}`}>
                      {relevance.keywordDensity}
                    </div>
                    <div className="text-sm text-gray-500">
                      {relevance.keywordDensity === '높음' || relevance.keywordDensity === '우수' ? '(우수)' : 
                       relevance.keywordDensity === '중간' ? '(양호)' : '(개선 필요)'}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    중요 키워드가 텍스트 내에서 얼마나 효과적으로 분포되어 있는지를 평가합니다.
                    적절한 키워드 밀도는 검색 엔진 최적화에 도움이 됩니다.
                  </p>
                </div>
                
                <div className="bg-warning-50 p-6 rounded-2xl border border-warning-100">
                  <h4 className="text-lg font-semibold mb-3 text-warning-700">검색 쿼리 적합도</h4>
                  <div className="flex items-center mb-4">
                    <div className={`text-2xl font-bold mr-2 ${getScoreColorClass(relevance.score)}`}>
                      {relevance.queryRelevance}
                    </div>
                    <div className="text-sm text-gray-500">
                      {relevance.queryRelevance === '높음' ? '(우수)' : 
                       relevance.queryRelevance === '중간' ? '(양호)' : '(개선 필요)'}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    검색 쿼리나 주제와의 연관성을 분석합니다.
                    높은 쿼리 적합도는 검색 결과에서 상위 노출될 가능성을 높입니다.
                  </p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-warning-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  상세 분석
                </h4>
                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed">{relevance.details}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedReport;
