import Sidebar from '../components/Sidebar';
import { Trash2, Eye } from 'lucide-react'; // Import Eye icon for preview
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Quiz = () =>
{
    const [quizzes, setQuizzes] = useState([]);


    const navigate = useNavigate();

    
    useEffect(()=>{
        const adminData = JSON.parse(localStorage.getItem('userData'));

        // Check if the data exists
        if (adminData) {
            console.log(adminData);  // This will log the data object
        } else {
            navigate('/login');
        }
    },[]);
    useEffect(() =>
        {
            const fetchQuizzes = async () =>
            {
                const userId = JSON.parse(localStorage.getItem('userData')).id;
                try {
                    const response = await fetch('https://eithi-aibackend.vercel.app/admin/getallquizusers', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: userId,
                        }),
                    });
                    const data = await response.json();
                    console.log(data);
                    console.log('hj');
                    setQuizzes(data.result);
                } catch (error) {
                   
                }
            };
    
            fetchQuizzes();
        }, []);
    const handleCreateNewQuiz = () =>
    {
        navigate('/quiz');
    };

    const handleViewQuiz = (id) =>
    {
        navigate(`/view-quiz/${id}`);
    };
    const handleViewScore = (id) =>
    {
        navigate(`/evaluation/${id}`);
    };

    // const handleEditQuiz = (documentId: string) => {
    //     navigate(`/edit-quiz/${documentId}`);
    // };

    
console.log(quizzes);
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 sm:p-6">
                    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                            <h3 className="text-primary text-2xl sm:text-3xl mt-12 lg:mt-0 font-bold mb-2 sm:mb-0">Attempt Quiz</h3>
                            {/* <button className="px-4 py-2 bg-primary text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 w-full sm:w-auto" onClick={handleCreateNewQuiz}>
                                Create New Quiz
                            </button> */}
                        </div>
                        {/* <div className="bg-white border-2 border-primary p-4 mb-4 shadow-sm">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded" />
                                    <h2 className="text-lg font-medium text-gray-900">Hello</h2>
                                </div>
                                <div className="flex space-x-2">
                                   
                                    <button className="p-1 text-secondary hover:text-primary" >
                                        <Eye size={20} />
                                    </button>
                                    <button className="p-1 text-primary hover:text-secondary rounded-full border-2 border-primary">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div> */}
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz) => (
                                <div
                                    key={quiz.id}
                                    className="bg-gray-800 border-2 border-primary p-4 mb-4 shadow-sm rounded-xl"
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                                            <h2 className="text-lg font-medium text-white">{quiz.title}</h2>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                className="p-1 text-white hover:text-primary"
                                                onClick={() => handleViewScore(quiz.id)}
                                            >
                                                View Score
                                            </button>
                                            <button
                                                className="p-1 text-white hover:text-primary"
                                                onClick={() => handleViewQuiz(quiz.id)}
                                            >
                                                <Eye size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-600 mt-4">
                                No quizzes available at the moment.
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Quiz;
