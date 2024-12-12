
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import CircularPercentageBar from "../components/CircularPercentageBar";
import GaugeChart from "react-gauge-chart";

// const Example = ({ label, children }) => (
//   <div style={{ marginBottom: "20px" }}>
//     <h3>{label}</h3>
//     {children}
//   </div>
// );

const Evaluation = () => {
 
  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-auto">
          <Header />
          <section className="block evaluation px-[20px] py-[50px]">
            <div className="container-xl">
              <div className="flex flex-col w-full gap-[15px]">
                <div className="flex justify-between w-full items-center">
                  <h2 className="text-primary text-2xl sm:text-3xl font-bold">
                    EthiAi Act Compliance
                  </h2>
                  <button className="px-4 py-2 bg-primary text-white rounded">
                    Download Report
                  </button>
                </div>
              </div>
              <div className="flex md:flex-row flex-col items-start gap-[20px] py-[30px]">
                <div className="md:w-[50%] w-full flex flex-col gap-[20px] ">
                  <div className="flex flex-col gap-[15px]">
                    <div className="flex items-center gap-[10px]">
                      <div className="cart h">
                        <CircularPercentageBar
                          value={60}
                          pathColor="#14035f"
                          textColor="#000"
                        />
                      </div>
                      <p className="text-gray-600 text-[16px] font-[500] mb-6">
                        Moderate Risk (60%) Characteristics: Al systems that
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
                            based on system- generated recommendations could
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
                            low risk of your Al system following a prohibited
                            practice, Manipulative Al techniques :Article
                            5(1)(a)
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="md:w-[50%] w-full">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex justify-center items-center flex-col gap-[10px]"
                      style={{ width: "200px" }}
                    >
                      <GaugeChart
                        id="gauge-chart2"
                        nrOfLevels={20}
                        percent={0.6}
                        textColor="#0000"
                      />
                      <div className="text-center mt-0">
                        {" "}
                        <span className="text-black">
                          {(0.6 * 100).toFixed(0)}%{" "}
                        </span>
                        <h4 className="text-gray-600 text-[16px] font-[500] mb-6">
                          Test 1
                        </h4>
                      </div>
                    </div>
                    <div
                      className="flex justify-center items-center flex-col gap-[10px]"
                      style={{ width: "200px" }}
                    >
                      <GaugeChart
                        id="gauge-chart2"
                        nrOfLevels={20}
                        percent={0.6}
                        textColor="#0000"
                      />
                      <div className="text-center mt-0">
                        {" "}
                        <span className="text-black">
                          {(0.6 * 100).toFixed(0)}%{" "}
                        </span>
                        <h4 className="text-gray-600 text-[16px] font-[500] mb-6">
                          Test 2
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex justify-center items-center flex-col gap-[10px]"
                      style={{ width: "200px" }}
                    >
                      <GaugeChart
                        id="gauge-chart2"
                        nrOfLevels={20}
                        percent={0.6}
                        textColor="#0000"
                      />
                      <div className="text-center mt-0">
                        {" "}
                        <span className="text-black">
                          {(0.6 * 100).toFixed(0)}%{" "}
                        </span>
                        <h4 className="text-gray-600 text-[16px] font-[500] mb-6">
                          Test 3
                        </h4>
                      </div>
                    </div>
                    <div
                      className="flex justify-center items-center flex-col gap-[10px]"
                      style={{ width: "200px" }}
                    >
                      <GaugeChart
                        id="gauge-chart2"
                        nrOfLevels={20}
                        percent={0.6}
                        textColor="#0000"
                      />
                      <div className="text-center mt-0">
                        {" "}
                        <span className="text-black">
                          {(0.6 * 100).toFixed(0)}%{" "}
                        </span>
                        <h4 className="text-gray-600 text-[16px] font-[500] mb-6">
                          Test 4
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex justify-center items-center flex-col gap-[10px]"
                      style={{ width: "200px" }}
                    >
                      <GaugeChart
                        id="gauge-chart2"
                        nrOfLevels={20}
                        percent={0.6}
                        textColor="#0000"
                      />
                      <div className="text-center mt-0">
                        {" "}
                        <span className="text-black">
                          {(0.6 * 100).toFixed(0)}%{" "}
                        </span>
                        <h4 className="text-gray-600 text-[16px] font-[500] mb-6">
                          Test 5
                        </h4>
                      </div>
                    </div>
                    <div
                      className="flex justify-center items-center flex-col gap-[10px]"
                      style={{ width: "200px" }}
                    >
                      <GaugeChart
                        id="gauge-chart2"
                        nrOfLevels={20}
                        percent={0.6}
                        textColor="#0000"
                      />
                      <div className="text-center mt-0">
                        {" "}
                        <span className="text-black">
                          {(0.6 * 100).toFixed(0)}%{" "}
                        </span>
                        <h4 className="text-gray-600 text-[16px] font-[500] mb-6">
                          Test 6
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex justify-center items-center flex-col gap-[10px]"
                      style={{ width: "200px" }}
                    >
                      <GaugeChart
                        id="gauge-chart2"
                        nrOfLevels={20}
                        percent={0.6}
                        textColor="#0000"
                      />
                      <div className="text-center mt-0">
                        {" "}
                        <span className="text-black">
                          {(0.6 * 100).toFixed(0)}%{" "}
                        </span>
                        <h4 className="text-gray-600 text-[16px] font-[500] mb-6">
                          Test 7
                        </h4>
                      </div>
                    </div>
                    <div
                      className="flex justify-center items-center flex-col gap-[10px]"
                      style={{ width: "200px" }}
                    >
                      <GaugeChart
                        id="gauge-chart2"
                        nrOfLevels={20}
                        percent={0.6}
                        textColor="#0000"
                      />
                      <div className="text-center mt-0">
                        {" "}
                        <span className="text-black">
                          {(0.6 * 100).toFixed(0)}%{" "}
                        </span>
                        <h4 className="text-gray-600 text-[16px] font-[500] mb-6">
                          Test 8
                        </h4>
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
