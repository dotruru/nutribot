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
  const [progress, setProgress] = useState(80); // overall onboarding prog.
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

  // animate global progress bar
  useEffect(() => {
    const id = setTimeout(() => setProgress(100), 400);
    return () => clearTimeout(id);
  }, []);

  // simple validation
  const canContinue =
    (step === "height" && !!height) || (step === "weight" && !!weight);

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
      {/* progress bar */}
      <div className="w-full h-2 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* header / copy */}
      <div className="flex-1 flex flex-col px-6 py-10">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold leading-tight">
            The
            <span className="text-emerald-500"> New-You</span> journey
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Just one more{" "}
            <span className="font-medium text-gray-800">personal detail</span>{" "}
            before future-you thanks you. Don’t miss out on the progress you’ve
            earned.
          </p>
        </header>

        {/* ONE QUESTION PER SCREEN */}
        {step === "height" ? (
          <>
            <label className="mb-6 w-full">
              <span className="block text-sm font-medium mb-2">
                Your height ({units === "metric" ? "cm" : "ft / in"})
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
          </>
        ) : (
          <>
            <label className="mb-6 w-full">
              <span className="block text-sm font-medium mb-2">
                Your weight ({units === "metric" ? "kg" : "lbs"})
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
          </>
        )}

        {/* Units toggle */}
        <div className="flex items-center gap-2 mb-10">
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
        <button
          disabled={!canContinue}
          onClick={handleContinue}
          className={`w-full py-4 rounded-lg font-semibold shadow transition-colors ${
            canContinue
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          {step === "height" ? "Next: Weight" : "See My Plan"}
        </button>

        {/* Back */}
        <button
          className="mt-4 text-sm text-gray-500 underline self-start"
          onClick={step === "height" ? onBack : () => setStep("height")}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}