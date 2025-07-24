import { useState, useEffect } from 'react';
import TextInput from './components/TextInput';
import EvaluateButton from './components/EvaluateButton';
import ResultsSummary from './components/ResultsSummary';
import DetailedReport from './components/DetailedReport';
import type { EvaluationResult } from './types';
import evaluateText from './services/evaluator';
import './App.css';

function App() {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleEvaluate = () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    
    // 실제 애플리케이션에서는 API 호출이 있을 수 있음
    setTimeout(() => {
      const evaluationResult = evaluateText(text);
      setResult(evaluationResult);
      setIsLoading(false);
    }, 1000); // 평가 처리 시간을 시뮬레이션
  };

  // 애니메이션을 위한 상태
  const [isVisible, setIsVisible] = useState(false);
  
  // 컴포넌트가 마운트되면 애니메이션 시작
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className={`mb-12 text-center transition-all duration-700 transform ${isVisible ? 'opacity-100' : 'opacity-0 -translate-y-10'}`}>
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center shadow-lg transform transition-transform hover:rotate-3 hover:scale-110 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <h1 className="text-6xl font-bold font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">텍스트 평가 도구</h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            입력한 텍스트의 전문성, 신뢰성, 관련성을 심층적으로 분석합니다.
          </p>
        </header>

        <main>
          <div className={`bg-white rounded-3xl shadow-lg hover:shadow-xl p-10 mb-12 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
               style={{ transitionDelay: '200ms' }}>
            <TextInput onTextChange={handleTextChange} />
            <EvaluateButton 
              onEvaluate={handleEvaluate} 
              isDisabled={isLoading || !text.trim()} 
            />
          </div>
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center my-16 animate-fade-in">
              <div className="relative">
                <div className="animate-spin rounded-full h-24 w-24 border-4 border-primary-200"></div>
                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-primary-500 absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
              </div>
              <p className="mt-6 text-gray-600 font-medium text-lg animate-pulse-slow">텍스트 분석 중...</p>
            </div>
          )}
          
          {result && !isLoading && (
            <div className="space-y-12 animate-fade-in">
              <ResultsSummary result={result} />
              <DetailedReport result={result} />
            </div>
          )}
        </main>
        
        <footer className={`mt-24 text-center text-gray-500 text-sm py-8 border-t border-gray-200 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
                style={{ transitionDelay: '600ms' }}>
          <p>&copy; {new Date().getFullYear()} 텍스트 평가 도구 | 전문적인 텍스트 분석 서비스</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
