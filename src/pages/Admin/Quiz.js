import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { Trash2, PlusCircle } from 'lucide-react';
import Header from '../../components/admin/Header';
import { useNavigate } from 'react-router-dom';

const RiskLevelEnum = {
    UNACCEPTABLE_RISK: 'Unacceptable Risk',
    HIGH_RISK: 'High Risk',
    LIMITED_RISK: 'Limited Risk',
    MINIMAL_RISK: 'Minimal Risk / No Risk'
};

const Quiz = () => {

    const [quizTitle, setQuizTitle] = useState('Test Score App');
    const [questions, setQuestions] = useState([
        {
            id: 1,
            text: '',
            ComplianceRequirement: '',
            RiskLevel: RiskLevelEnum.MINIMAL_RISK,
            Penalty: '',
            QuestionType: 'Radio button',
            answers: [{ text: '', riskScore: 0, gaps: '', recommendation: '' }]
        }
    ]);

    const addQuestion = () => {
        const newQuestion = {
            id: questions.length + 1,
            text: '',
            ComplianceRequirement: '',
            RiskLevel: RiskLevelEnum.MINIMAL_RISK,
            Penalty: '',
            QuestionType: 'Radio button',
            answers: [{ text: '', riskScore: 0, gaps: '', recommendation: '' }]
        };
        setQuestions([...questions, newQuestion]);
    };

    const handleQuestionChange = (id, value, field = 'text') => {
        setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const handleAnswerChange = (questionId, answerIndex, field, value) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                const newAnswers = [...q.answers];
                newAnswers[answerIndex] = { ...newAnswers[answerIndex], [field]: value };
                return { ...q, answers: newAnswers };
            }
            return q;
        }));
    };

    const addAnswerOption = (questionId) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                return { ...q, answers: [...q.answers, { text: '', riskScore: 0, gaps: '', recommendation: '' }] };
            }
            return q;
        }));
    };

    const deleteAnswerOption = (questionId, answerIndex) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                const newAnswers = q.answers.filter((_, index) => index !== answerIndex);
                return { ...q, answers: newAnswers };
            }
            return q;
        }));
    };

    const [paserror, setpaserror] = useState('');
    const [success, setsuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const adminData = JSON.parse(localStorage.getItem('adminData'));
        if (!adminData) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleQuestionTypeChange = (id, type) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, QuestionType: type } : q));
    };

    const submitQuiz = async () => {
        try {
            const response = await fetch('https://eithi-aibackend.vercel.app/admin/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: quizTitle,
                    questions: questions.map((q) => ({
                        text: q.text,
                        ComplianceRequirement: q.ComplianceRequirement,
                        RiskLevel: q.RiskLevel,
                        Penalty: q.Penalty,
                        QuestionType: q.QuestionType,
                        answers: q.answers.map((a) => ({
                            text: a.text,
                            riskScore: a.riskScore,
                            gaps: a.gaps,
                            recommendation: a.recommendation,
                        })),
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit quiz');
            }

            const data = await response.json();
            setsuccess('Quiz submitted successfully:');
            setTimeout(() => {
                setsuccess('');
                navigate('/admin/dashboard');
            }, 4000);
        } catch (error) {
            console.error('Error during quiz submission:', error);
            alert('An error occurred while submitting the quiz. Please try again.');
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-4 sm:p-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                            <h1 className="text-2xl sm:text-3xl mt-12 lg:mt-0 font-semibold mb-4 sm:mb-0">New Quiz</h1>
                            <span className="text-green-400">{success}</span>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2"
                                onClick={submitQuiz}
                            >
                                Create Quiz
                            </button>
                        </div>

                        <h2 className="text-lg sm:text-xl font-medium mb-6">Hey User, let's get started</h2>
                        <div className="bg-gray-700 p-4 sm:p-6 mb-8 border border-gray-600">
                            <input
                                type="text"
                                value={quizTitle}
                                onChange={(e) => setQuizTitle(e.target.value)}
                                className="text-xl sm:text-2xl font-bold w-full mb-4 border-b-2 border-green-500 bg-gray-600 text-white"
                                placeholder="Test Score App"
                            />
                        </div>

                        {questions.map((question, index) => (
                            <div key={question.id} className="bg-gray-700 p-4 sm:p-6 border border-gray-600 shadow-md mb-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={question.text}
                                        onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                                        placeholder={`Q${index + 1}: Enter your question`}
                                        className="text-lg font-semibold w-full mb-4 p-2 border-b border-green-500 bg-gray-600 text-white"
                                    />
                                    <select
                                        value={question.QuestionType}
                                        onChange={(e) => handleQuestionTypeChange(question.id, e.target.value)}
                                        className="mb-4 p-2 border border-gray-500 bg-gray-600 text-white"
                                    >
                                        <option value="Radio button">Radio Button</option>
                                        <option value="Check Box">Check Box</option>
                                    </select>

                                    <input
                                        type="text"
                                        value={question.ComplianceRequirement}
                                        onChange={(e) => handleQuestionChange(question.id, e.target.value, 'ComplianceRequirement')}
                                        placeholder="Compliance Requirement"
                                        className="w-full mb-4 p-2 border border-gray-500 bg-gray-600 text-white"
                                    />

                                    {/* <select
                                        value={question.RiskLevel}
                                        onChange={(e) => handleQuestionChange(question.id, e.target.value, 'RiskLevel')}
                                        className="w-full mb-4 p-2 border border-gray-500 bg-gray-600 text-white"
                                    >
                                        {Object.entries(RiskLevelEnum).map(([key, value]) => (
                                            <option key={key} value={value}>{value}</option>
                                        ))}
                                    </select>

                                    <input
                                        type="text"
                                        value={question.Penalty}
                                        onChange={(e) => handleQuestionChange(question.id, e.target.value, 'Penalty')}
                                        placeholder="Penalty"
                                        className="w-full mb-4 p-2 border border-gray-500 bg-gray-600 text-white"
                                    /> */}
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-md font-medium mb-2">Answer Options:</h3>
                                    {question.answers.map((answer, answerIndex) => (
                                        <div key={answerIndex} className="flex flex-col space-y-2 mb-4">
                                            <input
                                                type="text"
                                                value={answer.text}
                                                onChange={(e) => handleAnswerChange(question.id, answerIndex, 'text', e.target.value)}
                                                placeholder={`Option ${answerIndex + 1}`}
                                                className="w-full p-2 border border-gray-500 bg-gray-600 text-white"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="number"
                                                    value={answer.riskScore}
                                                    onChange={(e) => handleAnswerChange(question.id, answerIndex, 'riskScore', Number(e.target.value))}
                                                    placeholder="Risk Score"
                                                    className="w-24 p-2 border border-gray-500 bg-gray-600 text-white"
                                                    
                                                />
                                                 <input
                                                    type="text"
                                                    value={answer.gaps}
                                                    onChange={(e) => handleAnswerChange(question.id, answerIndex, 'gaps', e.target.value)}
                                                    placeholder="Gaps"
                                                    className="w-40 p-2 border border-gray-500 bg-gray-600 text-white"
                                                />
                                                <input
                                                    type="text"
                                                    value={answer.recommendation}
                                                    onChange={(e) => handleAnswerChange(question.id, answerIndex, 'recommendation', e.target.value)}
                                                    placeholder="Recommendation"
                                                    className="w-40 p-2 border border-gray-500 bg-gray-600 text-white"
                                                />
                                                <button
                                                    className="text-red-500 hover:text-red-600"
                                                    onClick={() => deleteAnswerOption(question.id, answerIndex)}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addAnswerOption(question.id)}
                                        className="flex items-center space-x-2 text-blue-400 hover:text-blue-500"
                                    >
                                        <PlusCircle className="w-5 h-5" />
                                        <span>Add Answer Option</span>
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={addQuestion}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 mt-6"
                        >
                            Add New Question
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Quiz;
