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
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const canContinue = !!height && !!weight;

  const handleNext = () => {
    setData({ height: Number(height), weight: Number(weight), units });
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* countdown */}
      <div className="w-full text-center py-2 bg-gray-100 text-xs text-gray-600">
        {secondsLeft} seconds left to get your personalized plan
      </div>

      <div className="flex-1 flex flex-col px-6 py-8">
        <h1 className="text-xl font-semibold mb-6">
          Quick setup — less than 1 minute
        </h1>

        {/* HEIGHT */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">
              Height ({units === "metric" ? "cm" : "ft / in"})
            </label>
            {/* tooltip */}
            <span className="group relative cursor-pointer">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a7 7 0 100 14A7 7 0 009 2zM8 9h2v5H8V9zm0-3h2v2H8V6z" />
              </svg>
              <span className="opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity absolute right-0 top-6 w-40 bg-gray-800 text-white text-xs rounded-md px-2 py-1 z-10">
                We tailor calorie targets based on your height.
              </span>
            </span>
          </div>
          <input
            type="number"
            inputMode="decimal"
            placeholder={units === "metric" ? "175" : "5.9"}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        {/* WEIGHT */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">
              Weight ({units === "metric" ? "kg" : "lbs"})
            </label>
            <span className="group relative cursor-pointer">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a7 7 0 100 14A7 7 0 009 2zM8 9h2v5H8V9zm0-3h2v2H8V6z" />
              </svg>
              <span className="opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity absolute right-0 top-6 w-40 bg-gray-800 text-white text-xs rounded-md px-2 py-1 z-10">
                Needed to calculate your daily calorie goal.
              </span>
            </span>
          </div>
          <input
            type="number"
            inputMode="decimal"
            placeholder={units === "metric" ? "70" : "154"}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        {/* Units toggle */}
        <div className="flex items-center gap-2 mb-10">
          <span className="text-sm">Units:</span>
          <button
            type="button"
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
            type="button"
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

        {/* CTA */}
        <button
          disabled={!canContinue}
          onClick={handleNext}
          className={`w-full py-4 rounded-lg font-semibold shadow transition-colors ${
            canContinue
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Continue
        </button>

        {/* Back */}
        <button
          className="mt-4 text-sm text-gray-500 underline self-start"
          onClick={onBack}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}