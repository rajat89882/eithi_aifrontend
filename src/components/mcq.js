import React, { useState, useCallback } from 'react';

const MCQ = ({ question, options, selectedOption, setSelectedOption }) => {
  // Memoize the setSelectedOption function to optimize re-renders
  const handleOptionClick = useCallback(
    (index) => {
      // Toggle the selection on the same option click
      if (selectedOption === index) {
        setSelectedOption(null); // Deselect if clicked again
      } else {
        setSelectedOption(index);
      }
    },
    [selectedOption, setSelectedOption]
  );

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-xl  mx-auto mt-12">
      <h2 className="text-2xl font-semibold text-white mb-4">{question}</h2>
      <p className="text-sm text-gray-400 mb-4">Select one of the options below</p>
      <div className="space-y-4">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(index)} // Trigger option selection with toggle
            className={`border p-4 cursor-pointer flex items-center space-x-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 ${
              selectedOption === index
                ? 'border-indigo-500 text-indigo-500 bg-indigo-800'
                : 'border-gray-600 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCQ;
