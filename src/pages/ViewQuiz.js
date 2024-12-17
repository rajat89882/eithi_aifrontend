import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const ViewQuiz = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [canSubmit, setCanSubmit] = useState(false);
    const navigate = useNavigate();
    const [paserror, setpaserror] = useState('');
    const [success, setsuccess] = useState('');
    const userId = JSON.parse(localStorage.getItem('userData')).id;

    useEffect(() => {
        const adminData = JSON.parse(localStorage.getItem('userData'));
        if (!adminData) {
            navigate('/login');
        }
    }, [navigate]);





    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch('https://eithi-aibackend.vercel.app/admin/getquiz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });
                const data = await response.json();
                setQuiz(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quiz:', error);
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleAnswerChange = (questionId, answerId, isChecked) => {
        setAnswers((prev) => {
            const updatedAnswers = [...prev];
            const existing = updatedAnswers.find((a) => a.questionId === questionId);

            if (existing) {
                if (isChecked) {
                    existing.answerIds.push(answerId);
                } else {
                    existing.answerIds = existing.answerIds.filter((id) => id !== answerId);
                }
            } else {
                updatedAnswers.push({ questionId, answerIds: [answerId] });
            }

            return updatedAnswers;
        });
    };

    useEffect(() => {
        if (!quiz || !quiz.questions) return;

        const allAnswered = quiz.questions.every((question) =>
            answers.some((answer) => answer.questionId === question.id && answer.answerIds.length > 0)
        );
        setCanSubmit(allAnswered);
    }, [answers, quiz]);

    const handleSubmit = async () => {
        const payload = {
            userId,
            quizId: quiz.id,
            answers,
        };

        try {
            const response = await fetch('https://eithi-aibackend.vercel.app/submitQuiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setsuccess('Quiz submitted successfully!');
            } else {
                const errorData = await response.json();
                setpaserror('Failed to submit quiz: ' + errorData.error);
            }
            // setTimeout(() => {
            //     navigate('/quizevaluation');
            // }, 3000);
        } catch (error) {
            console.error('Error submitting quiz:', error);
            setpaserror('An unexpected error occurred.');
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };

    if (loading) return <div className="text-center py-5">Loading...</div>;
    if (!quiz) return <div className="text-center py-5">Quiz not found</div>;

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6">
                    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
                        <div className="container py-5">
                            <div className="quiz-header text-center mb-4 py-4 rounded shadow-sm bg-light">
                                <h2 className="quiz-title display-5 text-primary fw-bold">{quiz.title}</h2>
                                <p className="quiz-subtitle text-muted mb-3">Test your knowledge with this quiz</p>
                                {paserror && <span className="quiz-error text-danger d-block mb-2">{paserror}</span>}
                                {success && <span className="quiz-success text-success d-block">{success}</span>}
                            </div>


                            <div key={currentQuestion.id} className="question-container mb-5 p-4 rounded shadow-sm bg-light">
                                <h5 className="question-title fw-bold mb-3 text-primary">
                                    {currentQuestionIndex + 1}. {currentQuestion.text}
                                </h5>
                                <div className="answers-container">
                                    {currentQuestion.answers.map((answer) => (
                                        <div key={answer.id} className="form-check answer-option mb-2">
                                            <input
                                                className="form-check-input"
                                                type={currentQuestion.questionType === 'Check Box' ? 'checkbox' : 'radio'}
                                                name={`question-${currentQuestion.id}`}
                                                id={`question-${currentQuestion.id}-answer-${answer.id}`}
                                                onChange={(e) =>
                                                    handleAnswerChange(
                                                        currentQuestion.id,
                                                        answer.id,
                                                        currentQuestion.questionType === 'Check Box' ? e.target.checked : true
                                                    )
                                                }
                                            />
                                            <label
                                                className="form-check-label answer-label"
                                                htmlFor={`question-${currentQuestion.id}-answer-${answer.id}`}
                                            >
                                                {answer.text}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="text-center mt-4">
                                {currentQuestionIndex > 0 && (
                                    <button
                                        className="btn btn-secondary px-4 me-2"
                                        onClick={handlePrevious}
                                    >
                                        Previous
                                    </button>
                                )}
                                {currentQuestionIndex < quiz.questions.length - 1 ? (
                                    <button
                                        className="btn btn-primary px-4"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="btn btn-success px-4"
                                        onClick={handleSubmit}
                                        disabled={!canSubmit}
                                    >
                                        Submit Quiz
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ViewQuiz;
