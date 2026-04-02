import React, { useState } from 'react';

export default function VariantA() {
  const [progress, setProgress] = useState(20);

  const handleNext = () => {
    if (progress < 100) {
      setProgress(progress + 20);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Transform into Your Healthiest Self</h2>
          <p className="text-gray-600">Don't miss out on becoming who you were always meant to be.</p>
        </div>
        <div className="my-4">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
              <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"></div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Step {progress / 20} of 5</p>
        </div>
        <div>
          <p className="text-gray-700">Before you began, you desired clarity. You're on the path to achieving it.</p>
          <button onClick={handleNext} className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">Next</button>
        </div>
      </div>
    </div>
  );
}