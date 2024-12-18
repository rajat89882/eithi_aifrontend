import Sidebar from '../components/Sidebar';
import { Trash2, Eye } from 'lucide-react'; // Import Eye icon for preview
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [paserror, setpaserror] = useState(''); // Password error message
    const [success, setsuccess] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        const adminData = JSON.parse(localStorage.getItem('userData'));

        // Check if the data exists
        if (adminData) {
            console.log(adminData);  // This will log the data object
        } else {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('https://eithi-aibackend.vercel.app/admin/getallquiz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: '',
                    }),
                });
                const data = await response.json();
                console.log(data);
                setQuizzes(data.result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleCreateNewQuiz = () => {
        navigate('/quiz');
    };

    const handleViewQuiz = (documentId) => {
        navigate(`/view-quiz/${documentId}`);
    };

    const handleDeleteQuiz = async (documentId) => {
        const confirmed = window.confirm("Are you sure you want to delete this quiz? This action cannot be undone.");
        
        if (!confirmed) {
            return; 
        }

        try {
            const response = await fetch('https://eithi-aibackend.vercel.app/admin/deletequiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: documentId,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Quiz deleted successfully:', data);
                setsuccess('Quiz deleted successfully');
            } else {
                console.error('Failed to delete quiz:', data);
                setpaserror('An error occurred while deleting the quiz.');
            }
            setTimeout(() => {
                window.location.reload();
            }, 3000); 
        } catch (error) {
            console.error("Error during quiz deletion:", error);
            alert("An error occurred while deleting the quiz.");
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 sm:p-6">
                    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                            <h3 className="text-primary text-2xl sm:text-3xl mt-12 lg:mt-0 font-bold mb-2 sm:mb-0">Dashboard</h3>
                        </div>
                        <span className='text-red-500'>{paserror}</span>
                        <span className='text-green-500'>{success}</span>

                        {quizzes.map((quiz) => (
                            <div key={quiz.documentId} className="bg-gray-800 border-2 border-primary p-4 mb-4 shadow-sm rounded-xl">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                                        <h2 className="text-lg font-medium text-gray-200">{quiz.title}</h2>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="p-1 text-secondary hover:text-primary" onClick={() => handleViewQuiz(quiz.id)}>
                                            <Eye size={20} className="text-gray-300" />
                                        </button>
                                        <button className="p-1 text-primary hover:text-secondary rounded-full border-2 border-primary" onClick={() => handleDeleteQuiz(quiz.id)}>
                                            <Trash2 size={20} className="text-gray-300" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
