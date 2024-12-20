import Sidebar from '../../components/admin/Sidebar';
import { Trash2, Eye } from 'lucide-react'; // Import Eye icon for preview
import Header from '../../components/admin/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [paserror, setpaserror] = useState(''); // Password error message
    const [success, setsuccess] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        const adminData = JSON.parse(localStorage.getItem('adminData'));

        if (adminData) {
            console.log(adminData);
        } else {
            navigate('/admin/login');
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
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleCreateNewQuiz = () => {
        navigate('/admin/quiz');
    };

    const handleViewQuiz = (documentId) => {
        navigate(`/view-quiz/${documentId}`);
    };

    const handleDeleteQuiz = async (documentId) => {
        const confirmed = window.confirm('Are you sure you want to delete this quiz? This action cannot be undone.');

        if (!confirmed) return;

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
            console.error('Error during quiz deletion:', error);
            alert('An error occurred while deleting the quiz.');
        }
    };

    return (
        <div className="flex h-screen bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-4 sm:p-6">
                    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                            <h3 className="text-primary text-2xl sm:text-3xl mt-12 lg:mt-0 font-bold mb-2 sm:mb-0 text-white">Dashboard</h3>
                            <button
                                className="px-4 py-2 bg-primary text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 w-full sm:w-auto"
                                onClick={handleCreateNewQuiz}
                            >
                                Create New Quiz
                            </button>
                        </div>
                        <span className="text-danger text-sm">{paserror}</span>
                        <span className="text-success text-sm">{success}</span>

                        {quizzes.map((quiz) => (
                            <div key={quiz.documentId} className="bg-gray-700 border-2 border-primary p-4 mb-4 shadow-lg rounded-lg">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                                        <h2 className="text-lg font-medium text-white">{quiz.title}</h2>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="p-2 text-white hover:text-primary hover:bg-gray-600 rounded-full transition duration-200"
                                            onClick={() => handleViewQuiz(quiz.documentId)}
                                        >
                                            <Eye size={20} />
                                        </button>
                                        <button
                                            className="p-2 text-red-500 hover:text-white hover:bg-red-600 rounded-full border-2 border-red-500 transition duration-200"
                                            onClick={() => handleDeleteQuiz(quiz.id)}
                                        >
                                            <Trash2 size={20} />
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
