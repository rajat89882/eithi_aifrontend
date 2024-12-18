import Sidebar from '../../components/admin/Sidebar';
import { Trash2, Eye } from 'lucide-react'; // Import Eye icon for preview
import Header from '../../components/admin/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [paserror, setpaserror] = useState(''); // Password error message
    const [success, setsuccess] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        const adminData = JSON.parse(localStorage.getItem('adminData'));

        // Check if the data exists
        if (adminData) {
            console.log(adminData);  // This will log the data object
        } else {
            navigate('/admin/login');
        }
    }, []);
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('https://eithi-aibackend.vercel.app/admin/getalluser', {
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
                
            }
        };

        fetchQuizzes();
    }, []);

    const handleCreateNewQuiz = () => {
        navigate('/admin/quiz');
    };

    const handleViewQuiz = (documentId) => {
        navigate(`/admin/view-quiz/${documentId}`);
    };

    const handleDeleteQuiz = async (documentId) => {
        // Show confirmation dialog before deleting
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        
        if (!confirmed) {
            return; // If the user cancels, do nothing
        }

        try {
            const response = await fetch('https://eithi-aibackend.vercel.app/admin/deleteuser', {
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
                console.log('User deleted successfully:', data);
                setsuccess('User deleted successfully');
            } else {
                console.error('Failed to delete User:', data);
                setpaserror('An error occurred while deleting the User.');
            }
            setTimeout(() => {
                window.location.reload();
            }, 3000); 
        } catch (error) {
            console.error("Error during User deletion:", error);
            setpaserror("An error occurred while deleting the User.");
        }
    };

    return (
        <div className="flex h-screen bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 sm:p-6">
                    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                            <h3 className="text-white text-2xl sm:text-3xl mt-12 lg:mt-0 font-bold mb-2 sm:mb-0">Users</h3>
                        </div>
                        <span className='text-red-500'>{paserror}</span>
                        <span className='text-green-500'>{success}</span>
                        {quizzes.map((quiz) => (
                            <div key={quiz.documentId} className="bg-gray-800 border-2 border-primary p-4 mb-4 shadow-lg rounded-lg">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                                        <h2 className="text-lg font-medium text-white">{quiz.name}</h2>
                                        <h2 className="text-lg font-medium text-gray-400">{quiz.email}</h2>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="p-1 text-indigo-500 hover:text-indigo-300" onClick={() => handleViewQuiz(quiz.id)}>
                                            <Eye size={20} />
                                        </button>
                                        <button className="p-1 text-red-500 hover:text-red-300 rounded-full border-2 border-red-500" onClick={() => handleDeleteQuiz(quiz.id)}>
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

export default User;
