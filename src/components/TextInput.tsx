import { useState, useEffect } from 'react';

interface TextInputProps {
  onTextChange: (text: string) => void;
}

const TextInput = ({ onTextChange }: TextInputProps) => {
  const [text, setText] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [charCount, setCharCount] = useState<number>(0);

  // 애니메이션을 위한 마운트 감지
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setCharCount(newText.length);
    onTextChange(newText);
  };

  return (
    <div className={`w-full mb-8 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center mb-5">
        <div className="p-3 bg-primary-100 rounded-xl mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <label htmlFor="text-input" className="block text-2xl font-semibold text-gray-800 font-display">
          텍스트 입력
        </label>
      </div>
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-r from-primary-200/20 to-secondary-200/20 rounded-2xl transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>
        <textarea
          id="text-input"
          className={`w-full h-80 p-6 border-2 rounded-2xl shadow-sm transition-all duration-300 text-gray-700 bg-white bg-opacity-90 backdrop-blur-sm font-sans text-lg
            ${isFocused 
              ? 'border-primary-400 shadow-lg shadow-primary-100/50' 
              : 'border-gray-200 hover:border-gray-300'}`}
          placeholder="평가할 텍스트를 입력하세요..."
          value={text}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ resize: 'vertical' }}
        />
        <div className="absolute bottom-4 right-5 flex items-center space-x-2">
          <div className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${charCount > 0 
              ? 'bg-primary-100 text-primary-700' 
              : 'bg-gray-100 text-gray-500'}`}>
            {charCount} 자
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-500 pl-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        더 많은 텍스트를 입력할수록 더 정확한 평가 결과를 얻을 수 있습니다.
      </div>
    </div>
  );
};

export default TextInput;
