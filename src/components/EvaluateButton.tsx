interface EvaluateButtonProps {
  onEvaluate: () => void;
  isDisabled?: boolean;
}

const EvaluateButton = ({ onEvaluate, isDisabled = false }: EvaluateButtonProps) => {
  return (
    <div className="flex justify-center my-6">
      <button
        onClick={onEvaluate}
        disabled={isDisabled}
        className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-colors
          ${isDisabled 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          }`}
      >
        평가하기
      </button>
    </div>
  );
};

export default EvaluateButton;