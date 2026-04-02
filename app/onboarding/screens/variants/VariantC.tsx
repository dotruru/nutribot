import React, { useState, useEffect } from 'react';

type Units = 'metric' | 'imperial';

export default function VariantC() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [units, setUnits] = useState<Units>('metric');
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const handleContinue = () => {
    console.log({ height, weight, units });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Time Progress */}
      <div className="h-2 w-full bg-gray-200 relative">
        <div
          className="h-full bg-emerald-500 transition-all duration-1000"
          style={{ width: `${(secondsLeft / 30) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col px-6 py-8">
        {/* Headline */}
        <h1 className="text-2xl font-bold mb-2">Last quick step</h1>
        <p className="text-sm text-gray-600 mb-6">
          Custom plan ready in <span className="font-semibold">{secondsLeft}s</span>
        </p>

        {/* Height */}
        <label className="mb-4 relative group">
          <span className="block text-sm font-medium mb-1 flex items-center gap-1">
            Height ({units === 'metric' ? 'cm' : 'ft/in'})
            <span className="text-gray-400 cursor-help">?</span>
          </span>
          <input
            type="number"
            inputMode="decimal"
            placeholder={units === 'metric' ? '175' : '5.9'}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          {/* Tooltip */}
          <span className="absolute top-full left-0 mt-1 hidden group-hover:block text-xs bg-gray-800 text-white p-2 rounded shadow">
            We use your height to calculate BMI & calorie needs.
          </span>
        </label>

        {/* Weight */}
        <label className="mb-6 relative group">
          <span className="block text-sm font-medium mb-1 flex items-center gap-1">
            Weight ({units === 'metric' ? 'kg' : 'lbs'})
            <span className="text-gray-400 cursor-help">?</span>
          </span>
          <input
            type="number"
            inputMode="decimal"
            placeholder={units === 'metric' ? '70' : '154'}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <span className="absolute top-full left-0 mt-1 hidden group-hover:block text-xs bg-gray-800 text-white p-2 rounded shadow">
            Weight helps us tailor your daily macro targets.
          </span>
        </label>

        {/* Units Toggle */}
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