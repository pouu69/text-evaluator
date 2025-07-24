import { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">텍스트 평가 도구</h1>
          <p className="text-gray-600">
            입력한 텍스트의 전문성, 신뢰성, 관련성을 분석합니다.
          </p>
        </header>

        <main>
          <TextInput onTextChange={handleTextChange} />
          <EvaluateButton 
            onEvaluate={handleEvaluate} 
            isDisabled={isLoading || !text.trim()} 
          />
          
          {isLoading && (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {result && !isLoading && (
            <>
              <ResultsSummary result={result} />
              <DetailedReport result={result} />
            </>
          )}
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} 텍스트 평가 도구</p>
        </footer>
      </div>
    </div>
  );
}

export default App;