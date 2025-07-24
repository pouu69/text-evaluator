import { useState } from 'react';
import type { EvaluationResult } from '../types';

interface DetailedReportProps {
  result: EvaluationResult | null;
}

const DetailedReport = ({ result }: DetailedReportProps) => {
  const [activeTab, setActiveTab] = useState<'expertise' | 'trustworthiness' | 'relevance'>('expertise');

  if (!result) return null;

  const { expertise, trustworthiness, relevance } = result;

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">상세 분석 보고서</h2>
      
      {/* 탭 메뉴 */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'expertise'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('expertise')}
        >
          전문성
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'trustworthiness'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('trustworthiness')}
        >
          신뢰성
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'relevance'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('relevance')}
        >
          관련성
        </button>
      </div>
      
      {/* 탭 내용 */}
      <div className="p-4">
        {activeTab === 'expertise' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">전문성 상세 분석</h3>
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">점수: {expertise.score}/100</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${expertise.score}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">토픽 집중도: {expertise.topicCoherence}</h4>
                <p className="text-gray-600">텍스트가 일관된 주제에 얼마나 잘 집중되어 있는지를 평가합니다.</p>
              </div>
              
              <div>
                <h4 className="font-medium">전문 용어 활용률: {expertise.keywordUsage}</h4>
                <p className="text-gray-600">해당 분야의 전문 용어와 키워드를 얼마나 적절하게 사용했는지를 측정합니다.</p>
              </div>
              
              <div>
                <h4 className="font-medium">상세 분석:</h4>
                <p className="text-gray-800 whitespace-pre-line">{expertise.details}</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'trustworthiness' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">신뢰성 상세 분석</h3>
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">점수: {trustworthiness.score}/100</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${trustworthiness.score}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">주관적 표현 비중: {trustworthiness.subjectiveExpressionRatio}</h4>
                <p className="text-gray-600">텍스트에서 주관적인 표현이 차지하는 비중을 분석합니다.</p>
              </div>
              
              <div>
                <h4 className="font-medium">신뢰 기반 키워드 사용량: {trustworthiness.trustKeywordUsage}</h4>
                <p className="text-gray-600">신뢰도를 높이는 키워드와 표현의 사용 빈도를 측정합니다.</p>
              </div>
              
              <div>
                <h4 className="font-medium">상세 분석:</h4>
                <p className="text-gray-800 whitespace-pre-line">{trustworthiness.details}</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'relevance' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">관련성 상세 분석</h3>
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2">점수: {relevance.score}/100</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${relevance.score}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">키워드 밀도: {relevance.keywordDensity}</h4>
                <p className="text-gray-600">중요 키워드가 텍스트 내에서 얼마나 효과적으로 분포되어 있는지를 평가합니다.</p>
              </div>
              
              <div>
                <h4 className="font-medium">검색 쿼리 적합도: {relevance.queryRelevance}</h4>
                <p className="text-gray-600">검색 쿼리나 주제와의 연관성을 분석합니다.</p>
              </div>
              
              <div>
                <h4 className="font-medium">상세 분석:</h4>
                <p className="text-gray-800 whitespace-pre-line">{relevance.details}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedReport;