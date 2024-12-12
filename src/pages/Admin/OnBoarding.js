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
    {
      question: 'Which kind of entity is your organization?',
      options: [
        'Providers',
        'Deployers',
        'Distributors',
        'Importers',
        'Product Manufacturers',
        'Authorized Representatives',
        'Affected persons in the Union',
      ],
    },
    {
      question: 'Downstream modifications: Has a downstream deployer, distributor, or importer made any of the following modifications to your system?',
      options: [
        'Placing your name or trademark on a system already in the market or service',
        'Modifying the intended purpose of a system already in operation',
        'Performing a substantial modification to the system',
        'None of the above',
      ],
    },
    {
      question: 'Scope: Do you meet any of the following criteria?',
      options: [
        'I am placing on the market or putting into service AI systems in the Union (regardless of whether you are established within the Union or in a third country)',
        "My AI system's output is used in the EU",
        "My AI system is located in a non-EU country where 'EU Member State law' applies by virtue of public international Law",
        "My system is considered to be 'prohibited' (see Article 5) and is used by a downstream deployer who is based in the EU",
        'None of above',
      ],
    },
    {
      question: 'Is your system a General Purpose AI model?',
      options: ['Yes', 'No'],
    },
    {
      question: 'Does your system fall within any of the following categories?',
      options: [
        'AI systems developed and used exclusively for military purposes',
        'AI systems used by public authorities or international organisations in third countries for law enforcement and judicial cooperation',
        'AI components provided under free and open-source licences',
        'AI research and development activity',
        'People using AI systems for purely personal, non-professional activity',
        'None of above',
      ],
    },
    {
      question: 'Do you want to assess for Prohibited Practices?',
      options: ['Yes', 'No'],
    },
    {
      question: 'Please select one of the options',
      options: [
        '3a. Subliminal or Manipulative Techniques: Assess if techniques are beyond human consciousness or manipulative (PP3A)',
        '3b. Exploitation of Vulnerabilities: Determine if system exploits vulnerabilities based on age, disability, etc. (PP3B)',
        '3c. Social Scoring: Evaluate if system classifies individuals leading to unjustified treatment (PP3C)',
        '3d. Risk Assessment Based on Profiling: Check if assessments are made solely on profiling without objective facts (PP3D)',
        '3e. Facial Recognition and Biometric Categorization: Verify if databases are created through untargeted scraping (PP3E)',
        '3f. Emotion Recognition in Workplace and Education: Confirm if systems infer emotions except for medical or safety reasons (PP3F)',
        '3g. Biometric Categorization: Categorizing individuals based on sensitive attributes, except for lawful law enforcement (PP3G)',
        '3h. Real-Time Remote Biometric Identification in Public Spaces: Ensure use is strictly necessary and legally authorized for law enforcement (PP3H)',
        'None of the above',
      ],
    },
  ];

  const handleSelectOption = (index) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentStep] = index;
    setSelectedOptions(updatedOptions);

    // Logic for navigation based on current step
    if (currentStep === 0 && index === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      if (index < 3) {
        setCurrentStep(6); // Show handover obligations info
      } else {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (index < 4) {
        setCurrentStep(3);
      } else {
        setCurrentStep(7); // Show "Out of scope" info
      }
    } else if (currentStep === 3) {
      if (index === 0) {
        setCurrentStep(8); // Show GPAI obligations
      } else {
        setCurrentStep(4);
      }
    } else if (currentStep === 4) {
      if (index === 5) {
        setCurrentStep(5); // Go to "Do you want to assess for Prohibited Practices?"
      } else {
        navigate('/dashboard'); // Go to video onboarding for other options
      }
    } else if (currentStep === 5) {
      if (index === 0) { // "Yes" option
        setCurrentStep(9); // Go to "Please select one of the options"
      } else {
        navigate('/dashboard'); // Go to video onboarding for other options
      }
    } else if (currentStep === 6 || currentStep === 7 || currentStep === 8) {
      navigate('/dashboard');
    } else if (currentStep === 9) {
      // Handle the Prohibited Practices output here based on selected option
      if (index === 8) { // "None of the above"
        setProhibitedPracticesOutput('High Risk');
      } else {
        const outputs = ['PP3A', 'PP3B', 'PP3C', 'PP3D', 'PP3E', 'PP3F', 'PP3G', 'PP3H'];
        setProhibitedPracticesOutput(outputs[index - 3]); // Get corresponding output based on index
      }
    } else {
      navigate('/dashboard');
    }
  };

  const renderHandoverObligations = () => (
    <div className="bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-primary mb-4">Handover obligations</h2>
      <p className="mb-4">The original provider will have obligations to provide the new provider with:</p>
      <ul className="list-disc pl-5 mb-4">
        <li>Technical documentation.</li>
        <li>Information about the capabilities of the AI system.</li>
        <li>Technical access.</li>
        <li>Assistance to help the new provider fulfil their obligations under the Act.</li>
      </ul>
      <button
        className="border border-primary p-4 cursor-pointer flex items-center space-x-2"
        onClick={() => setCurrentStep(2)}
      >
        Next
      </button>
    </div>
  );

  const renderOutOfScope = () => (
    <div className="bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-primary mb-4">Out of scope</h2>
      <p className="mb-4">Your AI system appears to be out of scope for the EU AI Act.</p>
      <button
        className="border border-primary p-4 cursor-pointer flex items-center space-x-2"
        onClick={() => navigate('/dashboard')}
      >
        Next
      </button>
    </div>
  );

  const renderGPAIObligations = () => (
    <div className="bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-primary mb-4">General Purpose AI model obligations</h2>
      <p className="mb-4">You need to follow these obligations for General Purpose AI models under Article 53:</p>
      <ul className="list-disc pl-5 mb-4">
        <li>Create and keep technical documentation for the AI model, and make it available to the AI Office upon request.</li>
        <li>Create and keep documentation for providers integrating AI models, balancing transparency and protection of IP.</li>
        <li>Put in place a policy to respect Union copyright law.</li>
        <li>Publish a publicly available summary of AI model training data according to a template provided by the AI Office.</li>
      </ul>
      <p className="mb-4">Also, consider whether the GPAI is used as, or a component of, an AI system. If so, obligations on high risk AI systems may apply directly or indirectly under Recital 85.</p>
      <button
        className="border border-primary p-4 cursor-pointer flex items-center space-x-2"
        onClick={() => setCurrentStep(4)}
      >
        Next
      </button>
    </div>
  );

  const renderProhibitedPracticesQuestion = () => (
    <div className="bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-primary mb-4">Do you want to assess for Prohibited Practices?</h2>
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
    <div className="bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-primary mb-4">Please select one of the options</h2>
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
        className="border border-primary p-2 cursor-pointer"
        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
        disabled={currentStep === 0}
      >
        Back
      </button>
      <button
        className="border border-primary p-2 cursor-pointer"
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
    <div className="min-h-screen">
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
          ) : 
           currentStep === 9 ? (
            renderProhibitedPracticesOptions()
          ) :(
            <>
              <h2 className="text-xl font-bold text-primary mb-4">{questions[currentStep].question}</h2>
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
