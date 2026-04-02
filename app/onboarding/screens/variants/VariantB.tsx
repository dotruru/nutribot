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
  const [progress, setProgress] = useState(step === "height" ? 70 : 90);

  useEffect(() => {
    const target = step === "height" ? 80 : 100;
    const id = setTimeout(() => setProgress(target), 300);
    return () => clearTimeout(id);
  }, [step]);

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
      {/* progress line */}
      <div className="w-full h-2 bg-gray-200">
        <div
          className="h-full bg-emerald-500 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="flex-1 flex flex-col px-6 pt-8 pb-6">
        {/* Social proof banner */}
        <section className="mb-8 text-center">
          <p className="text-xs uppercase tracking-widest text-emerald-600 font-semibold">
            JOIN 10,000+ PEOPLE LIKE YOU
          </p>
          <h1 className="text-2xl font-extrabold mt-1">
            Get a plan your community swears by 🚀
          </h1>

          {/* simple avatar row */}
          <div className="flex justify-center -space-x-2 mt-4">
            {["/avatar1.png", "/avatar2.png", "/avatar3.png", "/avatar4.png"].map(
              (src, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-gray-300 border-2 border-white"
                />
              )
            )}
            <span className="ml-3 text-sm text-gray-600">
              +9,600 more
            </span>
          </div>

          {/* testimonial */}
          <blockquote className="mt-4 text-sm italic text-gray-500 max-w-xs mx-auto">
            “NutriBot made healthy eating stick when nothing else worked.”
          </blockquote>
        </section>

        {/* Question */}
        {step === "height" ? (
          <label className="mb-6">
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
        ) : (
          <label className="mb-6">
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
            {step === "height" ? "Next →" : "Join the Community"}
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