import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const QuizResults = () =>
{
    const location = useLocation();
    const navigate = useNavigate();

    const { individualScores, complianceRequirements } = location.state || {
        totalRiskRanking: 0,
        individualScores: [],
        complianceRequirements: [],
    };

    // Debugging: Log the retrieved data
    console.log('Quiz Results State:', location.state);

    // Prepare data for the bar chart
    const barData = {
        labels: complianceRequirements.length ? complianceRequirements : ['No Data'], // Use complianceRequirements or a placeholder
        datasets: [
            {
                label: 'Individual Scores',
                data: individualScores.length ? individualScores : [0], // Use individualScores or a placeholder
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Debugging: Log the prepared bar data
    console.log('Bar Chart Data:', barData);

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Compliance Requirement',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Score',
                },
            },
        },
    };

    const handleGoBack = () =>
    {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-primary text-center">Quiz Results</h1>

            <div className="bg-white p-6 pb-12 border border-primary shadow-md h-[300px]">
                <h3 className="text-lg font-medium mb-4">Compliance Requirement vs. Individual Scores</h3>
                <div className="h-full">
                    <Bar data={barData} options={chartOptions} />
                </div>
            </div>
            <button
                onClick={handleGoBack}
                className="block mx-auto bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-all">
                Go Back
            </button>
        </div>
    );
};

export default QuizResults;
