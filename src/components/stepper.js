const Stepper = ({ step, totalSteps }) => {
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full mb-3">
      <div
        className="h-2 bg-primary rounded-r-full transition-all duration-500 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default Stepper;
