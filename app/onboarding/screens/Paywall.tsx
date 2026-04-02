import React, { useState, useEffect } from 'react';

type Units = 'metric' | 'imperial';

export default function VariantA() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [units, setUnits] = useState<Units>('metric');
  const [progress, setProgress] = useState(80); // last step of onboarding

  useEffect(() => {
    const t = setTimeout(() => setProgress(100), 400); // animate bar
    return () => clearTimeout(t);
  }, []);

  const handleContinue = () => {
    // TODO: hook into funnel analytics + navigation
    console.log({ height, weight, units });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Progress */}
      <div className="h-2 bg-gray-200 w-full">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col px-6 py-10">
        {/* Branding */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold leading-tight">
            Meet the <span className="text-emerald-500">New You</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Finish this last detail—don’t let future-you look back with regret.
          </p>
        </div>

        {/* Height */}
        <label className="mb-5">
          <span className="block text-sm font-medium mb-2">
            Your height ({units === 'metric' ? 'cm' : 'ft / in'})
          </span>
          <input
            type="number"
            inputMode="decimal"
            placeholder={units === 'metric' ? 'e.g. 175' : 'e.g. 5.9'}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>

        {/* Weight */}
        <label className="mb-6">
          <span className="block text-sm font-medium mb-2">
            Your weight ({units === 'metric' ? 'kg' : 'lbs'})
          </span>
          <input
            type="number"
            inputMode="decimal"
            placeholder={units === 'metric' ? 'e.g. 70' : 'e.g. 154'}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>

        {/* Unit Toggle */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm">Units:</span>
          <button
            onClick={() => setUnits('metric')}
            className={`px-3 py-1 border rounded-l-md ${
              units === 'metric'
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            Metric
          </button>
          <button
            onClick={() => setUnits('imperial')}
            className={`px-3 py-1 border rounded-r-md ${
              units === 'imperial'
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            Imperial
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={handleContinue}
          className="mt-auto w-full bg-emerald-500 text-white py-4 rounded-lg font-semibold shadow hover:bg-emerald-600 transition-colors"
        >
          Continue
        </button>

        {/* Back */}
        <button
          className="mt-4 text-sm text-gray-500 underline"
          onClick={() => window.history.back()}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}