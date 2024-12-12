interface MCQProps {
  question: string;
  options: string[];
  selectedOption: number | null; // Allow null for initial state
  setSelectedOption: (index: number) => void;
}

const MCQ = ({ question, options, selectedOption, setSelectedOption }: MCQProps) => {
  return (
    <div className="bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-primary mb-4">{question}</h2>
      <p className="text-sm text-gray-600 mb-4">Choose from the options below</p>
      <div className="space-y-4">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => setSelectedOption(index)} // Trigger option selection
            className={`border border-primary p-4 cursor-pointer flex items-center space-x-2 ${
              selectedOption === index ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-700'
            }`}
          >
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCQ;
