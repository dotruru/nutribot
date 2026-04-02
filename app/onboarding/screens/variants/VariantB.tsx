import React, { useState } from 'react';

type Units = 'metric' | 'imperial';

export default function VariantB() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [units, setUnits] = useState<Units>('metric');

  const handleContinue = () => {
    console.log({ height, weight, units });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Progress */}
      <div className="h-2 bg-gray-200 w-full">
        <div className="h-full bg-emerald-500 w-full" /> {/* step complete */}
      </div>

      <div className="flex-1 flex flex-col px-6 py-8">
        {/* Testimonial / Social Proof */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 mb-6">
          <p className="text-sm italic">
            “NutriBot helped me drop 18 lbs and keep it off for
            6+ months. I’m still in the private chat group cheering others on!”
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${i + 3}`}
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              10,000+ people like you ‑ join the community
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-2xl font-bold mb-4">
          Tell the community about you
        </h1>

        {/* Height */}
        <label className="mb-4">
          <span className="block text-sm font-medium mb-1">
            Height ({units === 'metric' ? 'cm' : 'ft / in'})
          </span>
          <input
            type="number"
            inputMode="decimal"
            placeholder={units === 'metric' ? '175' : '5.9'}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>

        {/* Weight */}
        <label className="mb-6">
          <span className="block text-sm font-medium mb-1">
            Weight ({units === 'metric' ? 'kg' : 'lbs'})
          </span>
          <input
            type="number"
            inputMode="decimal"
            placeholder={units === 'metric' ? '70' : '154'}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
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
          Join 10,000+ Members
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