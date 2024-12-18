import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Trash2, Eye } from 'lucide-react';
import Header from '../../components/admin/Header';
import { useParams } from 'react-router-dom';
import CircularPercentageBar from "../../components/admin/CircularPercentageBar";
import GaugeChart from "react-gauge-chart";

const Evaluation = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [username, setusername] = useState('');
  const { id } = useParams();
  

  const navigate = useNavigate();

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('adminData'));

    if (adminData) {
      console.log(adminData);  // This will log the data object
    } else {
      navigate('/admin/login');
    }
  }, []);


  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('https://eithi-aibackend.vercel.app/admin/getallquizuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: id,
          }),
        });
        const data = await response.json();

        if (data.status === '0') {
          console.log(data.status);
          console.log(data.result?.message || 'No message');
          alert(data.message || 'Something went wrong');
          navigate('/admin/user');
        } else {
          setQuizzes(data.result);
          if (data.result.length > 0) {
            setusername(data.result[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, [id]);

  const handleCreateNewQuiz = () => {
    navigate('/quiz');
  };

  const handleViewQuiz = (id) => {
    navigate(`/admin/viewquiz/${id}`);
  };

  const handleViewScore = (quizId, userId) => {
    navigate(`/admin/viewquiz/${quizId}/${userId}`);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-900 text-white">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h3 className="text-primary text-2xl sm:text-3xl mt-12 lg:mt-0 font-bold mb-2 sm:mb-0">
                Attempt Quiz ({username.user_name}, {username.user_email})
              </h3>
            </div>

            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-gray-800 border-2 border-primary p-4 mb-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                    <h2 className="text-lg font-medium text-white">{quiz.quiz_title}</h2>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="p-2 text-secondary hover:text-primary transition-colors duration-300"
                      onClick={() => handleViewScore(quiz.id, id)}
                    >
                      View Score
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

export default Evaluation;
