"use client"
import React, { useEffect, useState } from "react";

type Units = "metric" | "imperial";

export interface PaywallProps {
  onNext: () => void;
  onBack: () => void;
  data: {
    height?: number;
    weight?: number;
    units?: Units;
  };
  setData: (d: Partial<PaywallProps["data"]>) => void;
}

export function Paywall({ onNext, onBack, data, setData }: PaywallProps) {
  const [units, setUnits] = useState<Units>(data.units || "metric");
  const [height, setHeight] = useState<string>(
    data.height ? String(data.height) : ""
  );
  const [weight, setWeight] = useState<string>(
    data.weight ? String(data.weight) : ""
  );
  const [timer, setTimer] = useState<number>(30); // seconds left

  // countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const canContinue = !!Number(height) && !!Number(weight);

  const handleContinue = () => {
    setData({
      height: Number(height),
      weight: Number(weight),
      units,
    });
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* slim time progress bar */}
      <div className="w-full h-1 bg-gray-200">
        <div
          className="h-full bg-emerald-500 transition-all linear"
          style={{ width: `${(30 - timer) * (100 / 30)}%` }}
        />
      </div>

      <main className="flex-1 flex flex-col px-6 pt-10 pb-6">
        {/* Speed headline */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold">
            Just 30&nbsp;seconds to your tailored plan
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Answer these two quick questions and see your results instantly.
          </p>
        </header>

        {/* inputs */}
        <div className="flex flex-col gap-6">
          {/* Height */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2">
              Height ({units === "metric" ? "cm" : "ft / in"})
              <span className="ml-1 text-gray-400 cursor-pointer" title="We use your height to calculate BMI and caloric needs.">
                ⓘ
              </span>
            </label>
            <input
              type="number"
              inputMode="decimal"
              placeholder={units === "metric" ? "e.g. 175" : "e.g. 5.9"}
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          {/* Weight */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2">
              Weight ({units === "metric" ? "kg" : "lbs"})
              <span className="ml-1 text-gray-400 cursor-pointer" title="Knowing your weight lets us personalise calorie targets for maximum results.">
                ⓘ
              </span>
            </label>
            <input
              type="number"
              inputMode="decimal"
              placeholder={units === "metric" ? "e.g. 70" : "e.g. 154"}
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>

        {/* Units toggle */}
        <div className="flex items-center gap-2 my-8">
          <span className="text-sm">Units:</span>
          <button
            className={`px-3 py-1 border rounded-l-md ${
              units === "metric"
                ? "bg-emerald-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setUnits("metric")}
          >
            Metric
          </button>
          <button
            className={`px-3 py-1 border rounded-r-md ${
              units === "imperial"
                ? "bg-emerald-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setUnits("imperial")}
          >
            Imperial
          </button>
        </div>

        {/* CTA + timer */}
        <div className="mt-auto">
          <button
            disabled={!canContinue}
            onClick={handleContinue}
            className={`w-full py-4 rounded-lg font-semibold shadow transition-colors ${
              canContinue
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            See My Plan
          </button>

          <p className="mt-3 text-center text-xs text-gray-500">
            {timer > 0 ? `${timer}s left` : "Time’s up — hurry!"}
          </p>

          <button
            className="mt-4 text-sm text-gray-500 underline"
            onClick={onBack}
          >
            ← Back
          </button>
        </div>
      </main>
    </div>
  );
}