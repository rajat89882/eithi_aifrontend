import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Search } from 'lucide-react';

const Support = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl sm:text-2xl  mt-12 lg:mt-0 font-bold">Support and Updates</h1>
                        </div>
                        <div className='flex justify-center'>
                            <div className="w-full p-4 sm:p-6 mb-6">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary text-center font-semibold mb-2">Welcome To AI Compliance Support</h2>
                                <div className='flex justify-center'>
                                    <div className='w-full sm:w-[80%] md:w-[60%] border border-secondary mb-4'></div>
                                </div>
                                <div className='flex justify-center'>
                                    <div className="relative w-full sm:w-96">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
                                        <input type="text" placeholder="Ask Your Question" className="pl-10 pr-24 sm:pr-28 py-2 border w-full bg-white text-black outline-none focus:ring-0" />
                                        <button className="absolute right-0 top-0 h-full bg-indigo-900 text-white px-2 sm:px-6 py-2 text-sm sm:text-base">Try Your Luck</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white border border-primary p-4 sm:p-6">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Need Help? We've got your back</h2>
                            <p className="text-gray-600 text-base sm:text-lg mb-6">Perhaps you can find answers in our collections</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {['Regulatory Updates', 'Onboarding Assistance', 'Compliance Certification', 'Consultation'].map((title, index) => (
                                    <div key={index} className="bg-secondary border-primary border-2 shadow-[5px_5px_0px_0px_rgba(20,3,95,1)] p-4">
                                        <h3 className="font-semibold mb-2">{title}</h3>
                                        <ul className="space-y-1">
                                            {[...Array(8)].map((_, i) => (
                                                <li key={i} className="text-xs sm:text-sm text-white">• Changes something</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Support;