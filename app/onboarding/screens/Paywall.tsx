import React, { useState, useEffect } from 'react';

export default function VariantA() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [progress, setProgress] = useState(20); // starts at 20% (8-step flow placeholder)

  // animate to 100% when goal chosen
  useEffect(() => {
    if (selectedGoal) {
      const timer = setTimeout(() => setProgress(100), 200);
      return () => clearTimeout(timer);
    }
  }, [selectedGoal]);

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pt-10 pb-6">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Aspirational Copy */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Imagine <span className="text-green-600">You</span> six months from now
      </h1>
      <p className="text-gray-600 mb-8">
        Don’t let another month slip by. Start transforming your health today.
      </p>

      {/* Question */}
      {!selectedGoal ? (
        <>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            What’s your primary goal?
          </h2>
          <div className="flex flex-col space-y-3">
            {['Lose Weight', 'Maintain Weight', 'Gain Muscle'].map((goal) => (
              <button
                key={goal}
                onClick={() => setSelectedGoal(goal)}
                className="w-full py-3 bg-gray-100 rounded-lg text-gray-800 font-medium active:scale-95 transition transform"
              >
                {goal}
              </button>
            ))}
          </div>
        </>
      ) : (
        /* Final CTA */
        <div className="flex flex-col justify-between flex-1">
          <div>
            <p className="text-gray-700 mb-4">
              Great choice! Your {selectedGoal.toLowerCase()} journey starts now.
            </p>
          </div>
          <button className="mt-auto py-4 bg-green-600 text-white rounded-lg font-semibold active:scale-95 transition transform">
            Get My Custom Plan
          </button>
        </div>
      )}
    </div>
  );
}