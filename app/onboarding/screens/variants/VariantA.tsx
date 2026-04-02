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
  const [step, setStep] = useState<"height" | "weight">(
    height ? "weight" : "height"
  );
  const [progress, setProgress] = useState(step === "height" ? 70 : 85);

  // animate bar on mount & when step changes
  useEffect(() => {
    const target = step === "height" ? 80 : 100;
    const id = setTimeout(() => setProgress(target), 300);
    return () => clearTimeout(id);
  }, [step]);

  // validation
  const canContinue =
    (step === "height" && !!Number(height)) ||
    (step === "weight" && !!Number(weight));

  const handleContinue = () => {
    if (step === "height") {
      setData({ height: Number(height), units });
      setStep("weight");
    } else {
      setData({ weight: Number(weight), units });
      onNext();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* animated progress */}
      <div className="w-full h-2 bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="flex-1 px-6 pt-10 pb-6 flex flex-col">
        {/* Emotional headline */}
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold leading-tight">
            Imagine <span className="text-emerald-500">Future-You</span>
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            You’re one step away from the plan that turns{" "}
            <span className="font-semibold">“I should”</span> into{" "}
            <span className="font-semibold">“I did!”</span> Don’t lose the
            progress you’ve already earned today.
          </p>
        </header>

        {/* QUESTION */}
        {step === "height" ? (
          <div className="flex flex-col gap-6">
            <label>
              <span className="block text-sm font-medium mb-2">
                My current height ({units === "metric" ? "cm" : "ft / in"})
              </span>
              <input
                type="number"
                inputMode="decimal"
                placeholder={units === "metric" ? "e.g. 175" : "e.g. 5.9"}
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </label>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <label>
              <span className="block text-sm font-medium mb-2">
                My current weight ({units === "metric" ? "kg" : "lbs"})
              </span>
              <input
                type="number"
                inputMode="decimal"
                placeholder={units === "metric" ? "e.g. 70" : "e.g. 154"}
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
          </div>
        )}

        {/* Units */}
        <div className="flex items-center gap-2 mt-6">
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

        {/* CTA */}
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
            {step === "height" ? "Lock In Height →" : "See My Transformation"}
          </button>

          <button
            className="mt-4 text-sm text-gray-500 underline"
            onClick={step === "height" ? onBack : () => setStep("height")}
          >
            ← Back
          </button>
        </div>
      </main>
    </div>
  );
}