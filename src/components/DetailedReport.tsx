import { useState, useEffect } from "react";
import type { EvaluationResult } from "../types";

interface DetailedReportProps {
  result: EvaluationResult | null;
}

const DetailedReport = ({ result }: DetailedReportProps) => {
  const [activeTab, setActiveTab] = useState<
    "expertise" | "trustworthiness" | "relevance"
  >("expertise");
  const [isVisible, setIsVisible] = useState(false);
  const [isTabChanging, setIsTabChanging] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트되면 애니메이션 시작
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (
    tab: "expertise" | "trustworthiness" | "relevance"
  ) => {
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
    if (score >= 85) return "text-success-600";
    if (score >= 70) return "text-primary-600";
    if (score >= 50) return "text-amber-500";
    return "text-rose-500";
  };

  const getScoreGradientClass = (score: number) => {
    if (score >= 85) return "from-success-500 to-success-400";
    if (score >= 70) return "from-primary-500 to-primary-400";
    if (score >= 50) return "from-amber-500 to-amber-400";
    return "from-rose-500 to-rose-400";
  };

  const getScoreBgClass = (score: number) => {
    if (score >= 85) return "bg-success-50 border-success-200";
    if (score >= 70) return "bg-primary-50 border-primary-200";
    if (score >= 50) return "bg-amber-50 border-amber-200";
    return "bg-rose-50 border-rose-200";
  };

  return (
    <div
      className={`mt-10 bg-white rounded-3xl shadow-card transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: "200ms" }}
    >
      <div className="flex items-center justify-center p-8 border-b border-gray-100">
        <div className="p-2 bg-secondary-100 rounded-lg mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-secondary-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold font-display text-gray-800">
          상세 분석 보고서
        </h2>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex justify-center border-b border-gray-100 bg-gray-50 rounded-t-3xl">
        <div className="flex space-x-2 p-2">
          <button
            className={`py-3 px-6 font-medium rounded-xl transition-all duration-300 ${
              activeTab === "expertise"
                ? "bg-white shadow-md text-primary-600 font-semibold"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
            onClick={() => handleTabChange("expertise")}
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              전문성
            </div>
          </button>
          <button
            className={`py-3 px-6 font-medium rounded-xl transition-all duration-300 ${
              activeTab === "trustworthiness"
                ? "bg-white shadow-md text-primary-600 font-semibold"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
            onClick={() => handleTabChange("trustworthiness")}
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              신뢰성
            </div>
          </button>
          <button
            className={`py-3 px-6 font-medium rounded-xl transition-all duration-300 ${
              activeTab === "relevance"
                ? "bg-white shadow-md text-primary-600 font-semibold"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
            onClick={() => handleTabChange("relevance")}
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              관련성
            </div>
          </button>
        </div>
      </div>

      {/* 탭 내용 */}
      <div className="p-4">
        <div
          className={`transition-opacity duration-300 ${
            isTabChanging ? "opacity-0" : "opacity-100"
          }`}
        >
          {activeTab === "expertise" && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-primary-100 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold font-display">
                  전문성 상세 분석
                </h3>
              </div>

              <div className={`mb-4 p-4 rounded-xl border ${getScoreBgClass(expertise.score)}`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-medium mb-1">종합 점수</h4>
                    <p className="text-sm text-gray-600">콘텐츠 품질 평가 결과</p>
                  </div>
                  <div className="flex items-center">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                          strokeDasharray="62.83"
                          strokeLinecap="round"
                          className="w-24 h-24"
                          transform="translate(12, 12) scale(0.95)"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke={expertise.score >= 85 ? "#10b981" : expertise.score >= 70 ? "#3b82f6" : expertise.score >= 50 ? "#f59e0b" : "#ef4444"}
                          strokeWidth="2"
                          strokeDasharray="62.83"
                          strokeDashoffset={62.83 * (1 - expertise.score / 100)}
                          strokeLinecap="round"
                          className="w-24 h-24"
                          transform="translate(12, 12) scale(0.95)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-3xl font-bold ${getScoreColorClass(expertise.score)}`}>
                          {expertise.score}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-500 mb-1">평가 등급</div>
                      <div className={`text-lg font-bold ${getScoreColorClass(expertise.score)}`}>
                        {expertise.score >= 85 ? "우수" : 
                         expertise.score >= 70 ? "양호" : 
                         expertise.score >= 50 ? "보통" : "개선 필요"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradientClass(expertise.score)}`}
                      style={{
                        width: `${expertise.score}%`,
                        transition: "width 1s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
                
                {/* 핵심 인사이트 섹션 */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <h5 className="text-base font-semibold mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    핵심 인사이트
                  </h5>
                  <div className="bg-white p-3 rounded-lg border border-primary-100 shadow-sm">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span>
                          <strong>주제 일관성:</strong> {expertise.topicCoherence === "높음" ? 
                            "주제에 대한 일관성이 높아 독자가 내용을 쉽게 이해할 수 있습니다." : 
                            expertise.topicCoherence === "중간" ? 
                            "주제 일관성이 적절하나, 일부 내용에서 주제를 벗어나는 경향이 있습니다." : 
                            "주제 일관성이 낮아 독자가 내용을 이해하기 어려울 수 있습니다."}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span>
                          <strong>키워드 활용:</strong> {expertise.keywordUsage === "높음" ? 
                            "전문 용어와 키워드를 효과적으로 활용하여 전문성이 돋보입니다." : 
                            expertise.keywordUsage === "중간" ? 
                            "전문 용어 활용이 적절하나, 일부 핵심 키워드가 부족합니다." : 
                            "전문 용어와 키워드 활용이 부족하여 전문성이 떨어집니다."}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span>
                          <strong>핵심 문장 분석:</strong> {expertise.keySentences && expertise.keySentences.length > 0 ? 
                            "핵심 문장들이 주제를 잘 뒷받침하고 있습니다." : 
                            "핵심 문장이 부족하거나 주제를 명확히 전달하지 못합니다."}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* 개선 제안 섹션 */}
                {expertise.score < 80 && (
                  <div className="mt-3">
                    <h5 className="text-base font-semibold mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      개선 제안
                    </h5>
                    <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-sm">
                      <ul className="space-y-2">
                        {expertise.topicCoherence !== "높음" && (
                          <li className="flex items-start">
                            <span className="text-amber-500 mr-2">•</span>
                            <span>
                              <strong>주제 일관성 개선:</strong> 주제에서 벗어나는 내용을 줄이고, 핵심 주제를 중심으로 내용을 구성하세요.
                              {expertise.topicAnalysis?.sentences && expertise.topicAnalysis.sentences.length > 0 && 
                                ` 특히 "${expertise.topicAnalysis.sentences[0]}" 같은 문장을 중심으로 내용을 전개하는 것이 좋습니다.`}
                            </span>
                          </li>
                        )}
                        {expertise.keywordUsage !== "높음" && (
                          <li className="flex items-start">
                            <span className="text-amber-500 mr-2">•</span>
                            <span>
                              <strong>키워드 활용 개선:</strong> 주제와 관련된 전문 용어와 키워드를 더 많이 활용하세요.
                              {expertise.keywordAnalysis?.total?.keywords && expertise.keywordAnalysis.total.keywords.length > 0 && 
                                ` "${expertise.keywordAnalysis.total.keywords.slice(0, 3).join('", "')}" 같은 키워드를 더 자주 사용하는 것이 좋습니다.`}
                            </span>
                          </li>
                        )}
                        {expertise.scores?.complexity?.score < 60 && (
                          <li className="flex items-start">
                            <span className="text-amber-500 mr-2">•</span>
                            <span>
                              <strong>복잡성 개선:</strong> 문장 구조를 다양화하고, 더 정교한 표현을 사용하여 내용의 깊이를 더하세요.
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-primary-50 p-3 rounded-xl border border-primary-100">
                  <h4 className="text-base font-semibold mb-2 text-primary-700">
                    토픽 집중도
                  </h4>
                  <div className="flex items-center mb-4">
                    <div
                      className={`text-2xl font-bold mr-2 ${getScoreColorClass(
                        expertise.score
                      )}`}
                    >
                      {expertise.topicCoherence}
                    </div>
                    <div className="text-sm text-gray-500">
                      {expertise.topicCoherence === "높음"
                        ? "(우수)"
                        : expertise.topicCoherence === "중간"
                        ? "(양호)"
                        : "(개선 필요)"}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    텍스트가 일관된 주제에 얼마나 잘 집중되어 있는지를
                    평가합니다. 주제 일관성이 높을수록 독자가 내용을 더 쉽게
                    이해할 수 있습니다.
                  </p>
                </div>

                <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100">
                  <h4 className="text-lg font-semibold mb-3 text-primary-700">
                    전문 용어 활용률
                  </h4>
                  <div className="flex items-center mb-4">
                    <div
                      className={`text-2xl font-bold mr-2 ${getScoreColorClass(
                        expertise.score
                      )}`}
                    >
                      {expertise.keywordUsage}
                    </div>
                    <div className="text-sm text-gray-500">
                      {expertise.keywordUsage === "높음"
                        ? "(우수)"
                        : expertise.keywordUsage === "중간"
                        ? "(양호)"
                        : "(개선 필요)"}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    해당 분야의 전문 용어와 키워드를 얼마나 적절하게
                    사용했는지를 측정합니다. 적절한 전문 용어 사용은 글의
                    전문성을 높여줍니다.
                  </p>
                </div>
              </div>

              <div className={`bg-gradient-to-br from-white to-primary-50 border border-primary-100 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-lg`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-semibold flex items-center text-primary-700">
                    <div className="p-2 bg-primary-100 rounded-lg mr-3 shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    상세 분석 리포트
                  </h4>
                  <div className="text-xs text-primary-600 font-medium px-3 py-1 bg-primary-100 rounded-full">
                    AI 분석 결과
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-primary-100 shadow-inner">
                  <div className="mb-3 pb-2 border-b border-primary-100">
                    <div className="text-sm font-medium text-primary-700 mb-1">분석 요약</div>
                    <p className="text-gray-700">
                      이 텍스트는 주제 일관성과 전문 용어 활용도를 기준으로 평가되었습니다.
                    </p>
                  </div>
                  <div className="text-gray-800 space-y-4">
                    {/* 분석 결과 시각화 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="bg-gradient-to-br from-primary-50 to-white p-3 rounded-lg border border-primary-100 shadow-sm">
                        <div className="flex items-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          <h5 className="font-semibold text-primary-700">분석 개요</h5>
                        </div>
                        <p className="text-xs text-gray-700">
                          이 텍스트는 주제 일관성과 전문 용어 활용도를 기준으로 평가되었으며, 
                          {expertise.score >= 70 ? " 우수한 " : expertise.score >= 50 ? " 양호한 " : " 개선이 필요한 "}
                          전문성 점수를 보여줍니다.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-primary-50 to-white p-4 rounded-lg border border-primary-100 shadow-sm">
                        <div className="flex items-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                          <h5 className="font-semibold text-primary-700">주요 지표</h5>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">토픽 집중도:</span>
                            <span className={`text-sm font-medium ${getScoreColorClass(expertise.score)}`}>{expertise.topicCoherence}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">전문 용어 활용률:</span>
                            <span className={`text-sm font-medium ${getScoreColorClass(expertise.score)}`}>{expertise.keywordUsage}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 상세 분석 내용 - 시각적 레이아웃 */}
                    <div>
                      {/* 분석 결과 시각화 - 인포그래픽 스타일 */}
                      <div className="mb-4 bg-gradient-to-r from-primary-50 to-white rounded-lg overflow-hidden border border-primary-100">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 bg-primary-100 p-3 flex flex-col justify-center">
                            <h5 className="text-primary-800 font-bold text-base mb-1 text-left">핵심 분석 결과</h5>
                            <p className="text-primary-700 text-xs text-left">
                              이 텍스트는 {expertise.score >= 70 ? "높은" : expertise.score >= 50 ? "중간" : "낮은"} 
                              전문성을 보이며, 주제 일관성이 {expertise.topicCoherence === "높음" ? "우수" : "개선 필요"}합니다.
                            </p>
                          </div>
                          <div className="md:w-2/3 p-3">
                            <div className="flex items-center mb-2">
                              <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                              <span className="text-sm font-medium text-gray-700 text-left">주요 발견사항</span>
                            </div>
                            <ul className="space-y-2 text-left">
                              {expertise.details
                                .split('\n\n')
                                .filter(p => p.includes(':') || /^\d+\./.test(p))
                                .slice(0, 3)
                                .map((point, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-200 text-primary-700 text-xs font-bold mr-2 mt-0.5">{idx + 1}</span>
                                    <span className="text-sm text-gray-700">{point.replace(/^\d+\.\s*/, '')}</span>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* 분석 세부 내용 - 카드 레이아웃 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {expertise.details.split('\n\n').slice(0, 4).map((paragraph, idx) => {
                          // 제목 또는 섹션 헤더 처리 (콜론이 포함된 짧은 라인)
                          if (paragraph.includes(':') && paragraph.length < 50) {
                            const [title, value] = paragraph.split(':');
                            return (
                              <div key={idx} className="bg-white p-2 rounded-lg border border-primary-100 shadow-sm text-left hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center mb-2">
                                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                                    <span className="text-primary-700 font-bold">{idx + 1}</span>
                                  </div>
                                  <h5 className="text-primary-700 font-semibold">{title}</h5>
                                </div>
                                <p className="text-gray-700 ml-11">{value}</p>
                              </div>
                            );
                          }
                          return null;
                        }).filter(Boolean)}
                      </div>
                      
                      {/* 텍스트 분석 결과 - 향상된 시각화 */}
                      <div className="mb-4">
                        <div className="bg-primary-50 p-2 rounded-t-lg border border-primary-100">
                          <h5 className="text-primary-700 font-semibold text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            상세 분석 내용
                          </h5>
                        </div>
                        
                        {/* 주제 일관성 분석 - 시각화 */}
                        <div className="bg-white p-3 border-x border-b border-primary-100 rounded-b-lg">
                          <div className="mb-3">
                            <h6 className="text-primary-700 font-medium mb-2 text-sm flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                              </svg>
                              주제 일관성 분석
                            </h6>
                            
                            <div className="bg-gradient-to-r from-primary-50 to-white p-2 rounded-lg border border-primary-100">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">일관성 점수</span>
                                <span className="text-sm font-bold text-primary-700">
                                  {expertise.scores?.coherence?.score.toFixed(1)}점 ({expertise.scores?.coherence?.level})
                                </span>
                              </div>
                              
                              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <div
                                  className="h-2 rounded-full bg-primary-500"
                                  style={{
                                    width: `${expertise.scores?.coherence?.score || 0}%`,
                                  }}
                                ></div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div className="bg-white p-2 rounded-lg border border-primary-100 shadow-sm">
                                  <div className="text-xs text-gray-500 mb-1">주제 집중도</div>
                                  <div className="text-sm font-medium text-primary-700">{expertise.topicCoherence}</div>
                                </div>
                                
                                <div className="bg-white p-3 rounded-lg border border-primary-100 shadow-sm">
                                  <div className="text-xs text-gray-500 mb-1">문장 다양성</div>
                                  <div className="text-sm font-medium text-primary-700">
                                    {expertise.scores?.complexity?.level || "중간"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 키워드 분석 - 시각화 */}
                          <div className="mb-3">
                            <h6 className="text-primary-700 font-medium mb-2 text-sm flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                              키워드 분석
                            </h6>
                            
                            <div className="bg-gradient-to-r from-primary-50 to-white p-2 rounded-lg border border-primary-100">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">키워드 활용도</span>
                                <span className="text-sm font-bold text-primary-700">
                                  {expertise.keywordUsage}
                                </span>
                              </div>
                              
                              <div className="mb-4">
                                <div className="text-xs text-gray-500 mb-1">주요 키워드 분포</div>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {expertise.keywordAnalysis?.total?.keywords?.slice(0, 5).map((keyword, idx) => (
                                    <div key={idx} className="relative">
                                      <div className="h-8" style={{ width: `${Math.max(50, 50 + idx * 10)}px` }}>
                                        <div 
                                          className="absolute inset-0 bg-primary-200 rounded-md"
                                          style={{ width: `${Math.max(50, 50 + idx * 10)}px` }}
                                        ></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <span className="text-xs font-medium text-primary-800">{keyword}</span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                                <div className="bg-white p-1.5 rounded-lg border border-primary-100 shadow-sm">
                                  <div className="text-xs text-gray-500 mb-1">도메인 키워드</div>
                                  <div className="text-sm font-medium text-primary-700">
                                    {expertise.keywordAnalysis?.categories?.domain?.count || 0}개
                                  </div>
                                </div>
                                
                                <div className="bg-white p-2 rounded-lg border border-primary-100 shadow-sm">
                                  <div className="text-xs text-gray-500 mb-1">기술 키워드</div>
                                  <div className="text-sm font-medium text-primary-700">
                                    {expertise.keywordAnalysis?.categories?.technical?.count || 0}개
                                  </div>
                                </div>
                                
                                <div className="bg-white p-2 rounded-lg border border-primary-100 shadow-sm">
                                  <div className="text-xs text-gray-500 mb-1">일반 키워드</div>
                                  <div className="text-sm font-medium text-primary-700">
                                    {expertise.keywordAnalysis?.categories?.general?.count || 0}개
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 세부 점수 - 시각화 */}
                          <div>
                            <h6 className="text-primary-700 font-medium mb-3 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                              </svg>
                              세부 점수 분석
                            </h6>
                            
                            <div className="bg-gradient-to-r from-primary-50 to-white p-2 rounded-lg border border-primary-100">
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-600">복잡성 점수</span>
                                    <span className="text-sm font-medium text-primary-700">
                                      {expertise.scores?.complexity?.score?.toFixed(1) || "0.0"}점
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                    <div
                                      className="h-1.5 rounded-full bg-primary-500"
                                      style={{
                                        width: `${expertise.scores?.complexity?.score || 0}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-600">어휘 다양성</span>
                                    <span className="text-sm font-medium text-primary-700">
                                      {expertise.scores?.vocabulary?.score?.toFixed(1) || "0.0"}점
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                    <div
                                      className="h-1.5 rounded-full bg-primary-500"
                                      style={{
                                        width: `${expertise.scores?.vocabulary?.score || 0}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-600">전문 용어 점수</span>
                                    <span className="text-sm font-medium text-primary-700">
                                      {expertise.scores?.technicalTerms?.score?.toFixed(1) || "0.0"}점
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                    <div
                                      className="h-1.5 rounded-full bg-primary-500"
                                      style={{
                                        width: `${expertise.scores?.technicalTerms?.score || 0}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 키워드 하이라이트 - 구조화된 데이터 활용 */}
                    <div className="mt-3 pt-2 border-t border-primary-200">
                      <h5 className="text-primary-700 font-semibold mb-2 text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        주요 키워드
                      </h5>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {expertise.keywordAnalysis?.total?.keywords?.length > 0 ? (
                          expertise.keywordAnalysis.total.keywords.slice(0, 5).map((keyword, idx) => (
                            <span 
                              key={idx} 
                              className="inline-flex items-center px-3 py-1.5 bg-primary-100 text-primary-800 text-sm font-medium rounded-full shadow-sm"
                            >
                              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                              <span className="font-semibold">{keyword}</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">키워드 데이터가 없습니다</span>
                        )}
                      </div>
                    </div>
                    
                    {/* 핵심 문장 - 구조화된 데이터 활용 */}
                    <div className="mt-3 pt-2 border-t border-primary-200">
                      <h5 className="text-primary-700 font-semibold mb-2 text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        핵심 문장
                      </h5>
                      <div className="space-y-2 mt-1">
                        {expertise.keySentences?.length > 0 ? (
                          expertise.keySentences.slice(0, 3).map((sentence, idx) => (
                            <div key={idx} className="bg-white p-2 rounded-lg border border-primary-100 shadow-sm">
                              <div className="flex">
                                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                                  <span className="text-primary-700 font-bold text-xs">{idx + 1}</span>
                                </div>
                                <p className="text-gray-700 text-sm">{sentence}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">핵심 문장 데이터가 없습니다</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-sm text-primary-600 hover:text-primary-800 flex items-center transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    분석 결과 저장
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "trustworthiness" && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-3">
                <div className="p-1.5 bg-secondary-100 rounded-lg mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-secondary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold font-display">
                  신뢰성 상세 분석
                </h3>
              </div>

              <div className={`mb-4 p-4 rounded-xl border ${getScoreBgClass(trustworthiness.score)}`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-medium mb-1">종합 점수</h4>
                    <p className="text-sm text-gray-600">신뢰성 평가 결과</p>
                  </div>
                  <div className="flex items-center">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                          strokeDasharray="62.83"
                          strokeLinecap="round"
                          className="w-24 h-24"
                          transform="translate(12, 12) scale(0.95)"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke={trustworthiness.score >= 85 ? "#10b981" : trustworthiness.score >= 70 ? "#3b82f6" : trustworthiness.score >= 50 ? "#f59e0b" : "#ef4444"}
                          strokeWidth="2"
                          strokeDasharray="62.83"
                          strokeDashoffset={62.83 * (1 - trustworthiness.score / 100)}
                          strokeLinecap="round"
                          className="w-24 h-24"
                          transform="translate(12, 12) scale(0.95)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-3xl font-bold ${getScoreColorClass(trustworthiness.score)}`}>
                          {trustworthiness.score}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-500 mb-1">평가 등급</div>
                      <div className={`text-lg font-bold ${getScoreColorClass(trustworthiness.score)}`}>
                        {trustworthiness.score >= 85 ? "우수" : 
                         trustworthiness.score >= 70 ? "양호" : 
                         trustworthiness.score >= 50 ? "보통" : "개선 필요"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradientClass(trustworthiness.score)}`}
                      style={{
                        width: `${trustworthiness.score}%`,
                        transition: "width 1s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
                
                {/* 핵심 인사이트 섹션 */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h5 className="text-lg font-semibold mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    핵심 인사이트
                  </h5>
                  <div className="bg-white p-4 rounded-lg border border-secondary-100 shadow-sm">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-secondary-500 mr-2">•</span>
                        <span>
                          <strong>주관적 표현:</strong> {trustworthiness.subjectiveExpressionRatio === "낮음" ? 
                            "객관적인 표현이 주를 이루어 신뢰도가 높습니다." : 
                            trustworthiness.subjectiveExpressionRatio === "중간" ? 
                            "주관적 표현과 객관적 표현이 균형을 이루고 있습니다." : 
                            "주관적 표현이 많아 신뢰도가 낮아질 수 있습니다."}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary-500 mr-2">•</span>
                        <span>
                          <strong>감정 분석:</strong> {trustworthiness.emotionalContext?.dominantEmotion === "중립" ? 
                            "중립적인 감정 톤으로 객관성이 높습니다." : 
                            trustworthiness.emotionalContext?.dominantEmotion === "긍정" ? 
                            "긍정적인 감정 톤이 주를 이루고 있어 독자에게 호의적인 인상을 줄 수 있습니다." : 
                            "부정적인 감정 톤이 감지되어 독자에게 부정적인 인상을 줄 수 있습니다."}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-secondary-500 mr-2">•</span>
                        <span>
                          <strong>신뢰 요소:</strong> {trustworthiness.trustKeywordUsage === "높음" ? 
                            "근거, 출처, 데이터 등의 신뢰 요소가 풍부하게 포함되어 있습니다." : 
                            trustworthiness.trustKeywordUsage === "중간" ? 
                            "신뢰 요소가 적절히 포함되어 있으나, 더 많은 근거가 필요할 수 있습니다." : 
                            "신뢰 요소가 부족하여 주장의 신뢰성이 떨어질 수 있습니다."}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* 개선 제안 섹션 */}
                {trustworthiness.score < 80 && (
                  <div className="mt-4">
                    <h5 className="text-lg font-semibold mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      개선 제안
                    </h5>
                    <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm">
                      <ul className="space-y-2">
                        {trustworthiness.subjectiveExpressionRatio !== "낮음" && (
                          <li className="flex items-start">
                            <span className="text-amber-500 mr-2">•</span>
                            <span>
                              <strong>객관성 개선:</strong> 주관적 표현({trustworthiness.subjectiveExpressions?.total?.ratio?.toFixed(1) || 0}%)을 줄이고 
                              객관적인 사실 중심의 표현을 늘리세요.
                              {trustworthiness.subjectiveExpressions?.categories?.opinion?.count > 0 && 
                                ` 특히 의견 표현(${trustworthiness.subjectiveExpressions.categories.opinion.count}개)을 줄이는 것이 좋습니다.`}
                            </span>
                          </li>
                        )}
                        {trustworthiness.trustKeywordUsage !== "높음" && (
                          <li className="flex items-start">
                            <span className="text-amber-500 mr-2">•</span>
                            <span>
                              <strong>신뢰 요소 추가:</strong> 연구 결과, 통계 데이터, 전문가 인용 등의 신뢰 요소를 더 많이 포함하세요.
                              {trustworthiness.trustElements?.categories?.research?.count === 0 && 
                                " 특히 연구 기반 표현이 전혀 없으므로, 관련 연구 결과를 인용하는 것이 좋습니다."}
                            </span>
                          </li>
                        )}
                        {trustworthiness.emotionalContext?.dominantEmotion !== "중립" && (
                          <li className="flex items-start">
                            <span className="text-amber-500 mr-2">•</span>
                            <span>
                              <strong>감정 톤 조절:</strong> 지나치게 {trustworthiness.emotionalContext?.dominantEmotion}적인 표현을 줄이고, 
                              더 중립적인 톤으로 내용을 전달하세요.
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
                  <h4 className="text-lg font-semibold mb-3 text-secondary-700">
                    주관적 표현 비중
                  </h4>
                  <div className="flex items-center mb-4">
                    <div
                      className={`text-2xl font-bold mr-2 ${getScoreColorClass(
                        trustworthiness.score
                      )}`}
                    >
                      {trustworthiness.subjectiveExpressionRatio}
                    </div>
                    <div className="text-sm text-gray-500">
                      {trustworthiness.subjectiveExpressionRatio === "낮음"
                        ? "(우수)"
                        : trustworthiness.subjectiveExpressionRatio === "중간"
                        ? "(양호)"
                        : "(개선 필요)"}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    텍스트에서 주관적인 표현이 차지하는 비중을 분석합니다.
                    객관적인 표현이 많을수록 신뢰도가 높아집니다.
                  </p>
                </div>

                <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
                  <h4 className="text-lg font-semibold mb-3 text-secondary-700">
                    신뢰 기반 키워드 사용량
                  </h4>
                  <div className="flex items-center mb-4">
                    <div
                      className={`text-2xl font-bold mr-2 ${getScoreColorClass(
                        trustworthiness.score
                      )}`}
                    >
                      {trustworthiness.trustKeywordUsage}
                    </div>
                    <div className="text-sm text-gray-500">
                      {trustworthiness.trustKeywordUsage === "높음"
                        ? "(우수)"
                        : trustworthiness.trustKeywordUsage === "중간"
                        ? "(양호)"
                        : "(개선 필요)"}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    신뢰도를 높이는 키워드와 표현의 사용 빈도를 측정합니다.
                    근거, 출처, 데이터 등의 표현이 많을수록 신뢰도가 높아집니다.
                  </p>
                </div>
              </div>

              {/* 구조화된 데이터를 활용한 상세 분석 리포트 */}
              <div className={`bg-gradient-to-br from-white to-secondary-50 border border-secondary-100 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl`}>
                <div className="flex items-center justify-between mb-5">
                  <h4 className="text-xl font-semibold flex items-center text-secondary-700">
                    <div className="p-2 bg-secondary-100 rounded-lg mr-3 shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-secondary-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    상세 분석 리포트
                  </h4>
                  <div className="text-xs text-secondary-600 font-medium px-3 py-1 bg-secondary-100 rounded-full">
                    AI 분석 결과
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-secondary-100 shadow-inner">
                  <div className="mb-4 pb-3 border-b border-secondary-100">
                    <div className="text-sm font-medium text-secondary-700 mb-1">분석 요약</div>
                    <p className="text-gray-700">
                      이 텍스트는 주관적 표현 비중과 신뢰 기반 키워드 사용량을 기준으로 평가되었습니다.
                    </p>
                  </div>
                  
                  {/* 감정 분석 결과 */}
                  <div className="mb-6 bg-secondary-50 p-4 rounded-lg border border-secondary-100">
                    <h5 className="text-secondary-700 font-semibold mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                      </svg>
                      감정 분석
                    </h5>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/3 bg-white p-3 rounded-lg border border-secondary-100 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">주요 감정 톤</div>
                        <div className="text-lg font-semibold text-secondary-700">
                          {trustworthiness.emotionalContext?.dominantEmotion || "중립"}
                        </div>
                      </div>
                      <div className="md:w-2/3 bg-white p-3 rounded-lg border border-secondary-100 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">감정 표현</div>
                        <div className="flex flex-wrap gap-2">
                          {trustworthiness.emotionalContext?.emotionalExpressions?.length > 0 ? (
                            trustworthiness.emotionalContext.emotionalExpressions.map((expr, idx) => (
                              <span key={idx} className="inline-flex items-center px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-full">
                                {expr}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">감정 표현이 없습니다</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 주관적 표현 분석 */}
                  <div className="mb-6">
                    <h5 className="text-secondary-700 font-semibold mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      주관적 표현 분석
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-secondary-100 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-secondary-700">총 주관적 표현</span>
                          <span className="text-sm font-bold text-secondary-700">
                            {trustworthiness.subjectiveExpressions?.total?.count || 0}개 ({(trustworthiness.subjectiveExpressions?.total?.ratio || 0).toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                          <div
                            className="h-2 rounded-full bg-secondary-500"
                            style={{
                              width: `${Math.min(100, (trustworthiness.subjectiveExpressions?.total?.ratio || 0) * 5)}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {trustworthiness.subjectiveExpressions?.total?.expressions?.map((expr, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-full">
                              {expr}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-secondary-100 shadow-sm">
                        <div className="text-sm font-medium text-secondary-700 mb-2">카테고리별 분석</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">의견 표현</span>
                            <span className="text-xs font-medium text-secondary-700">
                              {trustworthiness.subjectiveExpressions?.categories?.opinion?.count || 0}개 ({(trustworthiness.subjectiveExpressions?.categories?.opinion?.ratio || 0).toFixed(1)}%)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">강조 표현</span>
                            <span className="text-xs font-medium text-secondary-700">
                              {trustworthiness.subjectiveExpressions?.categories?.emphasis?.count || 0}개 ({(trustworthiness.subjectiveExpressions?.categories?.emphasis?.ratio || 0).toFixed(1)}%)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">1인칭 표현</span>
                            <span className="text-xs font-medium text-secondary-700">
                              {trustworthiness.subjectiveExpressions?.categories?.firstPerson?.count || 0}개 ({(trustworthiness.subjectiveExpressions?.categories?.firstPerson?.ratio || 0).toFixed(1)}%)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">감정 표현</span>
                            <span className="text-xs font-medium text-secondary-700">
                              {trustworthiness.subjectiveExpressions?.categories?.emotion?.count || 0}개 ({(trustworthiness.subjectiveExpressions?.categories?.emotion?.ratio || 0).toFixed(1)}%)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">과장 표현</span>
                            <span className="text-xs font-medium text-secondary-700">
                              {trustworthiness.subjectiveExpressions?.categories?.exaggeration?.count || 0}개 ({(trustworthiness.subjectiveExpressions?.categories?.exaggeration?.ratio || 0).toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 신뢰 요소 분석 */}
                  <div className="mb-6">
                    <h5 className="text-secondary-700 font-semibold mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      신뢰 요소 분석
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-secondary-100 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-secondary-700">총 신뢰 요소</span>
                          <span className="text-sm font-bold text-secondary-700">
                            {trustworthiness.trustElements?.total?.count || 0}개 ({(trustworthiness.trustElements?.total?.ratio || 0).toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                          <div
                            className="h-2 rounded-full bg-secondary-500"
                            style={{
                              width: `${Math.min(100, (trustworthiness.trustElements?.total?.ratio || 0) * 10)}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {trustworthiness.trustElements?.total?.elements?.map((elem, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 bg-secondary-100 text-secondary-700 text-xs font-medium rounded-full">
                              {elem}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-secondary-100 shadow-sm">
                        <div className="text-sm font-medium text-secondary-700 mb-2">카테고리별 분석</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">연구 기반 표현</span>
                            <span className="text-xs font-medium text-secondary-700">
                              {trustworthiness.trustElements?.categories?.research?.count || 0}개 ({(trustworthiness.trustElements?.categories?.research?.ratio || 0).toFixed(1)}%)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">학술적 표현</span>
                            <span className="text-xs font-medium text-secondary-700">
                              {trustworthiness.trustElements?.categories?.academic?.count || 0}개 ({(trustworthiness.trustElements?.categories?.academic?.ratio || 0).toFixed(1)}%)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">데이터 관련 표현</span>
                            <span className="text-xs font-medium text-secondary-700">
                              {trustworthiness.trustElements?.categories?.data?.count || 0}개 ({(trustworthiness.trustElements?.categories?.data?.ratio || 0).toFixed(1)}%)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">객관적 사실 표현</span>
                            <span className="text-xs font-medium text-secondary-700">
                              {trustworthiness.trustElements?.categories?.factual?.count || 0}개 ({(trustworthiness.trustElements?.categories?.factual?.ratio || 0).toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 세부 점수 */}
                  <div className="mb-6">
                    <h5 className="text-secondary-700 font-semibold mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                      세부 점수
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-secondary-100 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">진정성 점수</span>
                          <span className="text-sm font-medium text-secondary-700">
                            {trustworthiness.scores?.authenticity?.score.toFixed(1)}점 ({trustworthiness.scores?.authenticity?.level})
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                          <div
                            className="h-1.5 rounded-full bg-secondary-500"
                            style={{
                              width: `${trustworthiness.scores?.authenticity?.score || 0}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">감정 표현 점수</span>
                          <span className="text-sm font-medium text-secondary-700">
                            {trustworthiness.scores?.emotionalExpression?.score.toFixed(1)}점 ({trustworthiness.scores?.emotionalExpression?.level})
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                          <div
                            className="h-1.5 rounded-full bg-secondary-500"
                            style={{
                              width: `${trustworthiness.scores?.emotionalExpression?.score || 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-secondary-100 shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">가독성 점수</span>
                          <span className="text-sm font-medium text-secondary-700">
                            {trustworthiness.scores?.readability?.score.toFixed(1)}점 ({trustworthiness.scores?.readability?.level})
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                          <div
                            className="h-1.5 rounded-full bg-secondary-500"
                            style={{
                              width: `${trustworthiness.scores?.readability?.score || 0}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">신뢰 요소 점수</span>
                          <span className="text-sm font-medium text-secondary-700">
                            {trustworthiness.scores?.trustElement?.score.toFixed(1)}점 ({trustworthiness.scores?.trustElement?.level})
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                          <div
                            className="h-1.5 rounded-full bg-secondary-500"
                            style={{
                              width: `${trustworthiness.scores?.trustElement?.score || 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 종합 평가 */}
                  <div className="mt-6 pt-4 border-t border-secondary-200">
                    <h5 className="text-secondary-700 font-semibold mb-3">종합 평가</h5>
                    <p className="text-gray-700">
                      이 텍스트는 {trustworthiness.subjectiveExpressionRatio} 수준의 개인적 표현을 사용하고 있으며, 
                      신뢰 요소 활용은 {trustworthiness.trustKeywordUsage} 수준입니다. 
                      진정성은 {trustworthiness.scores?.authenticity?.level} 수준이며, 감정 표현은 {trustworthiness.scores?.emotionalExpression?.level} 수준으로 평가됩니다.
                      주요 감정 톤은 {trustworthiness.emotionalContext?.dominantEmotion}이며, 가독성은 {trustworthiness.scores?.readability?.level} 수준입니다.
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-sm text-secondary-600 hover:text-secondary-800 flex items-center transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    분석 결과 저장
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "relevance" && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-3">
                <div className="p-1.5 bg-warning-100 rounded-lg mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-warning-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold font-display">
                  관련성 상세 분석
                </h3>
              </div>

              <div className={`mb-4 p-4 rounded-xl border ${getScoreBgClass(relevance.score)}`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-medium mb-1">종합 점수</h4>
                    <p className="text-sm text-gray-600">관련성 평가 결과</p>
                  </div>
                  <div className="flex items-center">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                          strokeDasharray="62.83"
                          strokeLinecap="round"
                          className="w-24 h-24"
                          transform="translate(12, 12) scale(0.95)"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke={relevance.score >= 85 ? "#10b981" : relevance.score >= 70 ? "#3b82f6" : relevance.score >= 50 ? "#f59e0b" : "#ef4444"}
                          strokeWidth="2"
                          strokeDasharray="62.83"
                          strokeDashoffset={62.83 * (1 - relevance.score / 100)}
                          strokeLinecap="round"
                          className="w-24 h-24"
                          transform="translate(12, 12) scale(0.95)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-3xl font-bold ${getScoreColorClass(relevance.score)}`}>
                          {relevance.score}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-500 mb-1">평가 등급</div>
                      <div className={`text-lg font-bold ${getScoreColorClass(relevance.score)}`}>
                        {relevance.score >= 85 ? "우수" : 
                         relevance.score >= 70 ? "양호" : 
                         relevance.score >= 50 ? "보통" : "개선 필요"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradientClass(relevance.score)}`}
                      style={{
                        width: `${relevance.score}%`,
                        transition: "width 1s ease-in-out",
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-warning-50 p-6 rounded-2xl border border-warning-100">
                  <h4 className="text-lg font-semibold mb-3 text-warning-700">
                    키워드 밀도
                  </h4>
                  <div className="flex items-center mb-4">
                    <div
                      className={`text-2xl font-bold mr-2 ${getScoreColorClass(
                        relevance.score
                      )}`}
                    >
                      {relevance.keywordDensity}
                    </div>
                    <div className="text-sm text-gray-500">
                      {relevance.keywordDensity === "높음" ||
                      relevance.keywordDensity === "우수"
                        ? "(우수)"
                        : relevance.keywordDensity === "중간"
                        ? "(양호)"
                        : "(개선 필요)"}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    중요 키워드가 텍스트 내에서 얼마나 효과적으로 분포되어
                    있는지를 평가합니다. 적절한 키워드 밀도는 검색 엔진 최적화에
                    도움이 됩니다.
                  </p>
                </div>

                <div className="bg-warning-50 p-6 rounded-2xl border border-warning-100">
                  <h4 className="text-lg font-semibold mb-3 text-warning-700">
                    검색 쿼리 적합도
                  </h4>
                  <div className="flex items-center mb-4">
                    <div
                      className={`text-2xl font-bold mr-2 ${getScoreColorClass(
                        relevance.score
                      )}`}
                    >
                      {relevance.queryRelevance}
                    </div>
                    <div className="text-sm text-gray-500">
                      {relevance.queryRelevance === "높음"
                        ? "(우수)"
                        : relevance.queryRelevance === "중간"
                        ? "(양호)"
                        : "(개선 필요)"}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    검색 쿼리나 주제와의 연관성을 분석합니다. 높은 쿼리 적합도는
                    검색 결과에서 상위 노출될 가능성을 높입니다.
                  </p>
                </div>
              </div>

              <div className={`bg-gradient-to-br from-white to-warning-50 border border-warning-100 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl`}>
                <div className="flex items-center justify-between mb-5">
                  <h4 className="text-xl font-semibold flex items-center text-warning-700">
                    <div className="p-2 bg-warning-100 rounded-lg mr-3 shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-warning-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    상세 분석 리포트
                  </h4>
                  <div className="text-xs text-warning-600 font-medium px-3 py-1 bg-warning-100 rounded-full">
                    AI 분석 결과
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-warning-100 shadow-inner">
                  <div className="mb-4 pb-3 border-b border-warning-100">
                    <div className="text-sm font-medium text-warning-700 mb-1">분석 요약</div>
                    <p className="text-gray-700">
                      이 텍스트는 주요 키워드의 분포와 검색 쿼리 적합도를 기준으로 평가되었습니다.
                    </p>
                  </div>
                  <div className="text-gray-800 space-y-4">
                    {/* 분석 결과 시각화 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-warning-50 to-white p-4 rounded-lg border border-warning-100 shadow-sm">
                        <div className="flex items-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          <h5 className="font-semibold text-warning-700">분석 개요</h5>
                        </div>
                        <p className="text-sm text-gray-700">
                          이 텍스트는 주요 키워드 분포와 검색 쿼리 적합도를 기준으로 평가되었으며, 
                          {relevance.score >= 70 ? " 우수한 " : relevance.score >= 50 ? " 양호한 " : " 개선이 필요한 "}
                          관련성 점수를 보여줍니다.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-warning-50 to-white p-4 rounded-lg border border-warning-100 shadow-sm">
                        <div className="flex items-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                          <h5 className="font-semibold text-warning-700">주요 지표</h5>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">키워드 밀도:</span>
                            <span className={`text-sm font-medium ${getScoreColorClass(relevance.score)}`}>{relevance.keywordDensity}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">쿼리 적합도:</span>
                            <span className={`text-sm font-medium ${getScoreColorClass(relevance.score)}`}>{relevance.queryRelevance}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 상세 분석 내용 - 시각적 레이아웃 */}
                    <div>
                      {/* 분석 결과 시각화 - 인포그래픽 스타일 */}
                      <div className="mb-6 bg-gradient-to-r from-warning-50 to-white rounded-xl overflow-hidden border border-warning-100">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 bg-warning-100 p-4 flex flex-col justify-center">
                            <h5 className="text-warning-800 font-bold text-lg mb-2">핵심 분석 결과</h5>
                            <p className="text-warning-700 text-sm">
                              이 텍스트는 {relevance.score >= 70 ? "높은" : relevance.score >= 50 ? "중간" : "낮은"} 
                              관련성을 보이며, 주요 키워드 분포가 {relevance.keywordDensity === "높음" ? "효과적" : "개선 필요"}합니다.
                            </p>
                          </div>
                          <div className="md:w-2/3 p-4">
                            <div className="flex items-center mb-3">
                              <div className="w-2 h-2 bg-warning-500 rounded-full mr-2"></div>
                              <span className="text-sm font-medium text-gray-700">주요 발견사항</span>
                            </div>
                            <ul className="space-y-2 text-left">
                              {relevance.details
                                .split('\n\n')
                                .filter(p => p.includes(':') || /^\d+\./.test(p))
                                .slice(0, 3)
                                .map((point, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-warning-200 text-warning-700 text-xs font-bold mr-2 mt-0.5">{idx + 1}</span>
                                    <span className="text-sm text-gray-700">{point.replace(/^\d+\.\s*/, '')}</span>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* 분석 세부 내용 - 카드 레이아웃 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {relevance.details.split('\n\n').slice(0, 4).map((paragraph, idx) => {
                          // 제목 또는 섹션 헤더 처리 (콜론이 포함된 짧은 라인)
                          if (paragraph.includes(':') && paragraph.length < 50) {
                            const [title, value] = paragraph.split(':');
                            return (
                              <div key={idx} className="bg-white p-4 rounded-lg border border-warning-100 shadow-sm text-left hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center mb-2">
                                  <div className="w-8 h-8 rounded-full bg-warning-100 flex items-center justify-center mr-3">
                                    <span className="text-warning-700 font-bold">{idx + 1}</span>
                                  </div>
                                  <h5 className="text-warning-700 font-semibold">{title}</h5>
                                </div>
                                <p className="text-gray-700 ml-11">{value}</p>
                              </div>
                            );
                          }
                          return null;
                        }).filter(Boolean)}
                      </div>
                      
                      {/* 텍스트 분석 결과 - 향상된 시각화 */}
                      <div className="mb-6">
                        <div className="bg-warning-50 p-4 rounded-t-lg border border-warning-100">
                          <h5 className="text-warning-700 font-semibold flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            상세 분석 내용
                          </h5>
                        </div>
                        
                        <div className="bg-white p-5 border-x border-b border-warning-100 rounded-b-lg">
                          {/* 키워드 밀도 분석 - 시각화 */}
                          <div className="mb-6">
                            <h6 className="text-warning-700 font-medium mb-3 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                              키워드 밀도 분석
                            </h6>
                            
                            <div className="bg-gradient-to-r from-warning-50 to-white p-4 rounded-lg border border-warning-100">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">키워드 밀도 점수</span>
                                <span className="text-sm font-bold text-warning-700">
                                  {relevance.keywordDensityAnalysis?.score?.toFixed(1) || "0.0"}% ({relevance.keywordDensityAnalysis?.level || "낮음"})
                                </span>
                              </div>
                              
                              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <div
                                  className="h-2 rounded-full bg-warning-500"
                                  style={{
                                    width: `${Math.min(100, (relevance.keywordDensityAnalysis?.score || 0) * 3)}%`,
                                  }}
                                ></div>
                              </div>
                              
                              <div className="mb-4">
                                <div className="text-xs text-gray-500 mb-1">주요 키워드 분포</div>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {relevance.keywordDensityAnalysis?.keywords?.primary?.map((keyword, idx) => (
                                    <div key={idx} className="relative">
                                      <div className="h-8" style={{ width: `${Math.max(80, 80 + keyword.density * 5)}px` }}>
                                        <div 
                                          className="absolute inset-0 bg-warning-200 rounded-md"
                                          style={{ width: `${Math.max(80, 80 + keyword.density * 5)}px` }}
                                        ></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                          <span className="text-xs font-medium text-warning-800">{keyword.keyword} ({keyword.density.toFixed(1)}%)</span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 쿼리 관련성 분석 - 시각화 */}
                          <div className="mb-6">
                            <h6 className="text-warning-700 font-medium mb-3 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                              </svg>
                              쿼리 관련성 분석
                            </h6>
                            
                            <div className="bg-gradient-to-r from-warning-50 to-white p-4 rounded-lg border border-warning-100">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">쿼리 관련성 점수</span>
                                <span className="text-sm font-bold text-warning-700">
                                  {relevance.queryRelevanceAnalysis?.score?.toFixed(1) || "0.0"}점 ({relevance.queryRelevanceAnalysis?.level || "낮음"})
                                </span>
                              </div>
                              
                              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <div
                                  className="h-2 rounded-full bg-warning-500"
                                  style={{
                                    width: `${relevance.queryRelevanceAnalysis?.score || 0}%`,
                                  }}
                                ></div>
                              </div>
                              
                              <div className="bg-white p-3 rounded-lg border border-warning-100 shadow-sm">
                                <div className="text-xs text-gray-500 mb-1">관련 쿼리</div>
                                <div className="space-y-2">
                                  {relevance.queryRelevanceAnalysis?.queries?.map((query, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                      <span className="text-sm text-gray-700">{query.query}</span>
                                      <span className="text-xs font-medium text-warning-700">
                                        {query.relevance.toFixed(1)}점
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 세부 점수 - 시각화 */}
                          <div>
                            <h6 className="text-warning-700 font-medium mb-3 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                              </svg>
                              세부 점수 분석
                            </h6>
                            
                            <div className="bg-gradient-to-r from-warning-50 to-white p-4 rounded-lg border border-warning-100">
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-600">키워드 일치 점수</span>
                                    <span className="text-sm font-medium text-warning-700">
                                      {relevance.scores?.keywordMatch?.score?.toFixed(1) || "0.0"}점
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                    <div
                                      className="h-1.5 rounded-full bg-warning-500"
                                      style={{
                                        width: `${relevance.scores?.keywordMatch?.score || 0}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-600">의미적 관련성</span>
                                    <span className="text-sm font-medium text-warning-700">
                                      {relevance.scores?.semanticRelevance?.score?.toFixed(1) || "0.0"}점
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                    <div
                                      className="h-1.5 rounded-full bg-warning-500"
                                      style={{
                                        width: `${relevance.scores?.semanticRelevance?.score || 0}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-600">문맥 적합성</span>
                                    <span className="text-sm font-medium text-warning-700">
                                      {relevance.scores?.contextualFit?.score?.toFixed(1) || "0.0"}점
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                    <div
                                      className="h-1.5 rounded-full bg-warning-500"
                                      style={{
                                        width: `${relevance.scores?.contextualFit?.score || 0}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 키워드 하이라이트 - 구조화된 데이터 활용 */}
                    <div className="mt-6 pt-4 border-t border-warning-200">
                      <h5 className="text-warning-700 font-semibold mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        주요 키워드
                      </h5>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {relevance.keywordDensityAnalysis?.keywords?.primary?.length > 0 ? (
                          relevance.keywordDensityAnalysis.keywords.primary.map((keywordObj, idx) => (
                            <span 
                              key={idx} 
                              className="inline-flex items-center px-3 py-1.5 bg-warning-100 text-warning-800 text-sm font-medium rounded-full shadow-sm"
                            >
                              <span className="w-2 h-2 bg-warning-500 rounded-full mr-2"></span>
                              <span className="font-semibold">{keywordObj.keyword}</span>
                              <span className="text-xs ml-1 text-warning-600">({keywordObj.count}회, {keywordObj.density.toFixed(1)}%)</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">키워드 데이터가 없습니다</span>
                        )}
                      </div>
                    </div>
                    
                    {/* 추천 키워드 - 구조화된 데이터 활용 */}
                    <div className="mt-6 pt-4 border-t border-warning-200">
                      <h5 className="text-warning-700 font-semibold mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        추천 키워드
                      </h5>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {relevance.suggestedKeywords?.length > 0 ? (
                          relevance.suggestedKeywords.map((keyword, idx) => (
                            <span 
                              key={idx} 
                              className="inline-flex items-center px-3 py-1.5 bg-warning-100 text-warning-800 text-sm font-medium rounded-full shadow-sm"
                            >
                              <span className="w-2 h-2 bg-warning-500 rounded-full mr-2"></span>
                              <span className="font-semibold">{keyword}</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">추천 키워드가 없습니다</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-sm text-warning-600 hover:text-warning-800 flex items-center transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    분석 결과 저장
                  </button>
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
