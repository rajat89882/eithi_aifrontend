import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import GaugeChart from "react-gauge-chart";
import CircularPercentageBar from "../components/CircularPercentageBar";
import axios from 'axios';

const Evaluation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [seetitle, settitle] = useState('');
  const [scc, setsc] = useState('');
  const [detail, setdata] = useState([]);
  const [TotalResult, setTotalResult] = useState('');
  const [usermail, setUsermail] = useState('');

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('userData'));
    setUsermail(adminData.email);
    if (!adminData) {
      navigate('/login');
    }
  }, [navigate]);

  const userId = JSON.parse(localStorage.getItem('userData')).id;

  useEffect(() => {
    getTotalResult();
  }, [id]);

  const getTotalResult = async () => {
    try {
      const response = await axios.post('https://eithi-aibackend.vercel.app/getQuiztotal', { id: id });
      if (response.data.status === 1) {
        setTotalResult(response.data.data);
      }
    } catch (error) {
      console.log('Error in gettotal!');
    }
  };

  useEffect(() => {
    const fetchQuizScore = async () => {
      try {
        const response = await fetch('https://eithi-aibackend.vercel.app/getQuizResults', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quizId: id, userId: userId }), // Pass quizId and userId
        });
        const data = await response.json();
        setScore(data.score.totalScore);
        setdata(data.attempts);
        setsc(data.score);
        settitle(data.quizTitle);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuizScore();
  }, [id, userId]);

  const calculatePercentage = (score) => {
    return score; // Assuming score is out of 100, modify if needed
  };

  const handleprint = () => {
    window.print();
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <div className="flex h-screen">
        <div className='no-print'>
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-auto">
          <div className='no-print'>
            <Header />
          </div>
          <section className="block evaluation px-[20px] py-[50px]">
            <div className="container-xl">
              <div className="flex flex-col w-full gap-[15px]">
                <div className="flex justify-between w-full items-center">
                  <h2 className="text-primary text-2xl sm:text-3xl font-bold">
                    {seetitle}
                  </h2>
                  <p className='print_name'>{usermail}</p>
                  <button
                    type="button"
                    onClick={handleprint}
                    className="px-4 py-2 bg-primary text-white rounded"
                  >
                    Download Report
                  </button>
                </div>
              </div>
              <div className="flex md:flex-row flex-col items-start gap-[20px] py-[30px]">
                <div className="md:w-[80%] w-full flex flex-col gap-[20px] pe-[70px]">
                  <div className="flex flex-col gap-[15px]">
                    <div className="flex items-center gap-[10px]">
                      <div className="cart h">
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <CircularPercentageBar
                            value={Math.round((scc.totalScore / TotalResult) * 100)}
                            pathColor="#14035f"
                            textColor="transparent"
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              color: '#fff',
                              fontSize: '20px',
                              fontWeight: '400',
                            }}
                          >     {Math.round((scc.totalScore / TotalResult) * 100)}%
                          </div>
                        </div>
                      </div>
                      <p className="text-white text-[16px] font-[500] mb-6">
                        Moderate Risk ({Math.round(scc.totalScore / TotalResult) * 100}%) Characteristics: AI systems that
                        have indirect implications on user rights or safety but
                        are not directly categorized as high-risk.
                      </p>
                    </div>
                    <div className="flex flex-col gap-[10px] pt-[10px]">
                      <h4 className="text-[20px] border-b border-primary text-primary font-[600]">
                        Prohibited Practices Recommendations
                      </h4>
                      <h5 className="text-[20px] font-[500] text-white">
                        Subliminal techniques
                      </h5>
                      <ul className="sublimal-ul">
                        <li>
                          <p>
                            Sensory outputs designed to adjust user interactions
                            based on system-generated recommendations could
                            subtly guide user behavior, which increases the risk
                            of manipulation or undue influence without explicit
                            user understanding based on Recital 29.
                          </p>
                        </li>
                        <li>
                          <p>
                            Limiting assessments to high-risk decisions may
                            neglect less obvious but still harmful impacts on
                            vulnerable populations, leading to exploitation and
                            non-compliance with EU AI Act Article 5(1)(a).
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-[10px] pt-[10px]">
                      <h4 className="text-[20px] border-b border-primary text-primary font-[600]">
                        Low risk
                      </h4>
                      <ul className="sublimal-ul">
                        <li>
                          <p>
                            Low risk of your AI system following a prohibited
                            practice, Manipulative AI techniques: Article
                            5(1)(a)
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="md:w-[20%] w-full">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex justify-center items-center flex-col gap-[10px]"
                      style={{ width: "200px" }}
                    >
                      <div className="mb-4">
                        <GaugeChart
                          id="gauge-chart"
                          nrOfLevels={20}
                          percent={((scc.totalScore / TotalResult) * 100) / 100}
                          textColor="#fff" // Change text color for dark mode
                          colors={["#FF5F6D", "#FFC371"]}
                          arcWidth={0.3}
                          arcPadding={0.02}
                        />
                        <p className="text-white text-center font-semibold">Question</p>
                        <p className="text-white text-center">Score: {scc.totalScore}</p>
                        <p className="text-white text-center">Out off: {TotalResult}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
