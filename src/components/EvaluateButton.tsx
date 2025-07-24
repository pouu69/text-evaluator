import { useState, useEffect } from 'react';

interface EvaluateButtonProps {
  onEvaluate: () => void;
  isDisabled?: boolean;
}

const EvaluateButton = ({ onEvaluate, isDisabled = false }: EvaluateButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // 애니메이션을 위한 마운트 감지
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`flex justify-center my-8 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
         style={{ transitionDelay: '100ms' }}>
      <button
        onClick={onEvaluate}
        disabled={isDisabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative px-10 py-4 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none overflow-hidden
          ${isDisabled 
            ? 'bg-gray-400 cursor-not-allowed opacity-70' 
            : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 focus:ring-4 focus:ring-primary-300 focus:ring-opacity-50'
          }`}
      >
        {/* 배경 효과 */}
        {!isDisabled && (
          <div className={`absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDYwIEwgNjAgMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')]"></div>
          </div>
        )}
        
        <div className="flex items-center justify-center relative z-10">
          <span className="mr-2">텍스트 평가하기</span>
          {!isDisabled && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
        
        {/* 물결 효과 */}
        {!isDisabled && (
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-20 transform origin-left transition-transform duration-300 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
        )}
      </button>
    </div>
  );
};

export default EvaluateButton;
