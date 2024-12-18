import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const PricingCard = ({ title, price, features, buttonText, trialText, isActivated }) => (
    <div className="bg-gray-800 border border-primary shadow-[5px_5px_0px_0px_rgba(20,3,95,1)] p-6 flex flex-col h-full rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        <p className="text-3xl font-bold text-secondary mb-6">${price}</p>
        <ul className="flex-grow mb-6">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start mb-3">
                    <svg className="w-5 h-5 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm text-white">{feature}</span>
                </li>
            ))}
        </ul>
        <div className="mt-auto">
            <button
                className={`w-full py-2 px-4 rounded-md ${isActivated ? 'bg-primary text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
            >
                {buttonText}
            </button>
            {trialText && (
                <p className="text-sm text-secondary mt-2 text-center underline cursor-pointer">
                    {trialText}
                </p>
            )}
            {isActivated && (
                <p className="text-sm text-secondary mt-2">Expiry: 21/09/24</p>
            )}
        </div>
    </div>
);

const Subscription = () => {
    return (
        <div className="flex h-screen bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 text-white p-6">
                    <h1 className="text-2xl font-bold mt-12 lg:mt-0 text-primary mb-6">Subscription Details</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <PricingCard
                            title="Basic Plan"
                            price="9.99"
                            features={[
                                "Yearly Updates.",
                                "One Gap & one Recommendation.",
                                "Standard support through email.",
                                "1 quiz/month"
                            ]}
                            buttonText="Activated"
                            isActivated={true}
                        />
                        <PricingCard
                            title="Professional Plan"
                            price="19.99"
                            features={[
                                "Quarterly Updates.",
                                "Gaps & Recommendations for each risk level.",
                                "Priority support within 3 working days.",
                                "5 quiz/month"
                            ]}
                            buttonText="Get Started"
                            trialText="Start with Trial"
                            isActivated={false}
                        />
                        <PricingCard
                            title="Expert Plan"
                            price="29.99"
                            features={[
                                "All The Benefits Of The Premium Subscription, Plus:",
                                "Monthly Updates.",
                                "Custom gaps & recommendations for each practice level.",
                                "24/7 Priority Support.",
                                "30 quiz/month"
                            ]}
                            buttonText="Get Started"
                            trialText="Start with Trial"
                            isActivated={false}
                        />
                    </div>
                    <div className="flex justify-center mt-8">
                        <button className="bg-primary text-white py-2 px-6 hover:bg-indigo-600 rounded-md transition duration-300">
                            Full Features List
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Subscription;
