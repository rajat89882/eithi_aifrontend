import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import GaugeChart from "react-gauge-chart";
import CircularPercentageBar from "../../components/admin/CircularPercentageBar";
const Evaluationquiz = () => {
  const { quizId, userId } = useParams();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [seetitle, settitle] = useState('');
  const [scc, setsc] = useState('');
  const [detail, setdata] = useState([]);
  const [outof, setoutof] = useState('');
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    if (!adminData) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchQuizScore = async () => {
      try {
        const response = await fetch('https://eithi-aibackend.vercel.app/getQuizResults', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quizId: quizId, userId: userId }), // Pass quizId and userId
        });
        const data = await response.json();
        console.log(data);
        setScore(data.score.totalScore);
        setdata(data.attempts);
        setsc(data.score);
        settitle(data.quizTitle);

        //setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        //setLoading(false);
      }
    };

    fetchQuizScore();
  }, [quizId, userId]);

  const calculatePercentage = (score) => {
    return score; // Assuming score is out of 100, modify if needed
  };
  const handleprint = () => {
    window.print();
  }
  console.log('jk');
  console.log(scc.percentageScore);
  return (
    <div>
      <div className="flex h-screen bg-gray-100">
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
                  <button type="button" onClick={handleprint} className="px-4 py-2 bg-primary text-white rounded">
                    Download Report
                  </button>
                </div>
              </div>
              <div className="flex md:flex-row flex-col items-start gap-[20px] py-[30px]">
                <div className="md:w-[80%] w-full flex flex-col gap-[20px] ">
                  <div className="flex flex-col gap-[15px]">
                    <div className="flex items-center gap-[10px]">
                      <div className="cart h">
                        <CircularPercentageBar
                          value={scc.percentageScore}
                          pathColor="#14035f"
                          textColor="#000"
                        />
                      </div>
                      <p className="text-gray-600 text-[16px] font-[500] mb-6">
                        Moderate Risk ({scc.percentageScore}%) Characteristics: AI systems that
                        have indirect implications on user rights or safety but
                        are not directly categorized as high-risk.
                      </p>
                    </div>
                    <div className="flex flex-col gap-[10px] pt-[10px]">
                      <h4 className="text-[20px] border-b border-primary text-primary font-[600]">
                        Prohibited Practices Recommendations
                      </h4>
                      <h5 className="text-[20px] font-[500] text-gray-700">
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

                {/* Gauge chart with fetched score */}
                <div className="md:w-[20%] w-full">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex justify-center items-center flex-col gap-[10px]"
                      style={{ width: "200px" }}
                    >

                      <div className="mb-4">
                        {/* Render the GaugeChart with a dynamic id */}
                        <GaugeChart
                          id="gauge-chart"
                          nrOfLevels={20} // Number of segments
                          percent={((scc.totalScore / scc.outOfScore) * 100) / 100}   // Value as a percentage (0.0 to 1.0)
                          textColor="#000" // Color for the text
                          colors={["#FF5F6D", "#FFC371"]} // Gradient colors
                          arcWidth={0.3}  // Adjust arc width (optional)
                          arcPadding={0.02} // Padding between arcs (optional)

                        />
                        {/* Render question details */}
                        <p className="text-black text-center font-semibold">Question </p>

                        <p className="text-gray-600 text-center">Score: {scc.totalScore}</p>
                        <p className="text-gray-600 text-center">Out off: {scc.outOfScore}</p>
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

export default Evaluationquiz;
