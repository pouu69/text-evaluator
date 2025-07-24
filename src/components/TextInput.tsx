import { useState } from 'react';

interface TextInputProps {
  onTextChange: (text: string) => void;
}

const TextInput = ({ onTextChange }: TextInputProps) => {
  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
  };

  return (
    <div className="w-full mb-4">
      <label htmlFor="text-input" className="block text-lg font-medium mb-2">
        텍스트 입력
      </label>
      <textarea
        id="text-input"
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="평가할 텍스트를 입력하세요..."
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextInput;