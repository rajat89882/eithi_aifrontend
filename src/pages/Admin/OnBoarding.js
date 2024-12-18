import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/stepper';
import MCQ from '../components/mcq';

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(9).fill(null)); // Updated to 9 for additional question
  const [prohibitedPracticesOutput, setProhibitedPracticesOutput] = useState(''); // State for output

  const navigate = useNavigate();

  const questions = [
    // Question data (same as in the previous code)
  ];

  const handleSelectOption = (index) => {
    // Handle selection logic (same as in the previous code)
  };

  const renderHandoverObligations = () => (
    <div className="bg-gray-800 text-white p-8 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-green-400 mb-4">Handover obligations</h2>
      <p className="mb-4">The original provider will have obligations to provide the new provider with:</p>
      <ul className="list-disc pl-5 mb-4">
        <li>Technical documentation.</li>
        <li>Information about the capabilities of the AI system.</li>
        <li>Technical access.</li>
        <li>Assistance to help the new provider fulfil their obligations under the Act.</li>
      </ul>
      <button
        className="border-2 border-green-400 text-green-400 bg-transparent py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setCurrentStep(2)}
      >
        Next
      </button>
    </div>
  );

  const renderOutOfScope = () => (
    <div className="bg-gray-800 text-white p-8 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-red-400 mb-4">Out of scope</h2>
      <p className="mb-4">Your AI system appears to be out of scope for the EU AI Act.</p>
      <button
        className="border-2 border-red-400 text-red-400 bg-transparent py-2 px-4 rounded-lg hover:bg-red-500 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => navigate('/dashboard')}
      >
        Next
      </button>
    </div>
  );

  const renderGPAIObligations = () => (
    <div className="bg-gray-800 text-white p-8 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-blue-400 mb-4">General Purpose AI model obligations</h2>
      <p className="mb-4">You need to follow these obligations for General Purpose AI models under Article 53:</p>
      <ul className="list-disc pl-5 mb-4">
        <li>Create and keep technical documentation for the AI model, and make it available to the AI Office upon request.</li>
        <li>Create and keep documentation for providers integrating AI models, balancing transparency and protection of IP.</li>
        <li>Put in place a policy to respect Union copyright law.</li>
        <li>Publish a publicly available summary of AI model training data according to a template provided by the AI Office.</li>
      </ul>
      <p className="mb-4">Also, consider whether the GPAI is used as, or a component of, an AI system. If so, obligations on high-risk AI systems may apply directly or indirectly under Recital 85.</p>
      <button
        className="border-2 border-blue-400 text-blue-400 bg-transparent py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setCurrentStep(4)}
      >
        Next
      </button>
    </div>
  );

  const renderProhibitedPracticesQuestion = () => (
    <div className="bg-gray-800 text-white p-8 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">Do you want to assess for Prohibited Practices?</h2>
      <MCQ
        question=""
        options={questions[5].options}
        selectedOption={selectedOptions[5]}
        setSelectedOption={handleSelectOption}
      />
      {renderNavigation()}
    </div>
  );

  const renderProhibitedPracticesOptions = () => (
    <div className="bg-gray-800 text-white p-8 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">Please select one of the options</h2>
      <MCQ
        question=""
        options={questions[6].options}
        selectedOption={selectedOptions[6]}
        setSelectedOption={handleSelectOption}
      />
      {prohibitedPracticesOutput && (
        <div className="mt-4 text-lg font-bold text-red-500">
          Output: {prohibitedPracticesOutput}
        </div>
      )}
      {renderNavigation()}
    </div>
  );

  const renderNavigation = () => (
    <div className="flex justify-between mt-4">
      <button
        className="border-2 border-green-400 text-green-400 bg-transparent py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
        disabled={currentStep === 0}
      >
        Back
      </button>
      <button
        className="border-2 border-green-400 text-green-400 bg-transparent py-2 px-4 rounded-lg hover:bg-green-500 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          if (currentStep === questions.length - 1) {
            navigate('/dashboard');
          } else {
            setCurrentStep(currentStep + 1);
          }
        }}
      >
        {currentStep === questions.length - 1 ? 'Finish' : 'Skip'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Stepper step={currentStep + 1} totalSteps={questions.length} />
      <img src="/logo.png" alt="" className="w-32 pl-3" />
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[50vw] p-8 my-[5vh]">
          {currentStep === 6 ? (
            renderHandoverObligations()
          ) : currentStep === 7 ? (
            renderOutOfScope()
          ) : currentStep === 8 ? (
            renderGPAIObligations()
          ) : currentStep === 5 ? (
            renderProhibitedPracticesQuestion()
          ) : currentStep === 9 ? (
            renderProhibitedPracticesOptions()
          ) : (
            <>
              <h2 className="text-xl font-bold text-green-400 mb-4">{questions[currentStep].question}</h2>
              <MCQ
                question=""
                options={questions[currentStep].options}
                selectedOption={selectedOptions[currentStep]}
                setSelectedOption={handleSelectOption}
              />
              {renderNavigation()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
