import React, { useState, useEffect } from 'react';

export default function VariantC() {
  const [metric, setMetric] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [showWhyAge, setShowWhyAge] = useState(false);
  const [showWhyWeight, setShowWhyWeight] = useState(false);

  // countdown timer
  useEffect(() => {
    if (secondsLeft === 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pt-10 pb-6">
      {/* Timer */}
      <div className="flex justify-center items-center mb-6">
        <span className="text-sm font-medium text-gray-700">
          {secondsLeft}s left
        </span>
        <div className="ml-2 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-1000"
            style={{ width: `${(secondsLeft / 30) * 100}%` }}
          />
        </div>
      </div>

      {/* Value Statement */}
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Get your custom calorie plan
      </h1>
      <p className="text-gray-600 mb-8">
        Just a few quick details so we can personalize your results.
      </p>

      {/* Metric/Imperial Toggle */}
      <div className="flex items-center justify-center mb-6 space-x-4">
        <button
          onClick={() => setMetric(true)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            metric ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Metric
        </button>
        <button
          onClick={() => setMetric(false)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            !metric ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Imperial
        </button>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Age */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            placeholder="e.g. 28"
            className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Why we ask */}
          <button
            onClick={() => setShowWhyAge((s) => !s)}
            className="absolute right-3 top-9 text-gray-400 text-lg"
            aria-label="Why we ask"
          >
            ?
          </button>
          {showWhyAge && (
            <div className="absolute right-0 mt-2 w-48 p-3 bg-white border border-gray-200 shadow-lg rounded-lg text-xs text-gray-700 z-10">
              Age helps us adjust your calorie needs accurately.
            </div>
          )}
        </div>

        {/* Weight */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {metric ? 'Weight (kg)' : 'Weight (lbs)'}
          </label>
          <input
            type="number"
            placeholder={metric ? 'e.g. 70' : 'e.g. 155'}
            className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setShowWhyWeight((s) => !s)}
            className="absolute right-3 top-9 text-gray-400 text-lg"
            aria-label="Why we ask"
          >
            ?
          </button>
          {showWhyWeight && (
            <div className="absolute right-0 mt-2 w-48 p-3 bg-white border border-gray-200 shadow-lg rounded-lg text-xs text-gray-700 z-10">
              Your weight is essential for calculating calorie expenditure.
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <button className="mt-10 py-4 bg-blue-600 text-white rounded-lg font-semibold active:scale-95 transition transform">
        Get Started
      </button>
    </div>
  );
}