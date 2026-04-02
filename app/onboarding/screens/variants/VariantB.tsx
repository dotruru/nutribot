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
  /* STATE */
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
  const [progress, setProgress] = useState(step === "height" ? 75 : 95);

  /* PROGRESS ANIMATION */
  useEffect(() => {
    const id = setTimeout(
      () => setProgress(step === "height" ? 85 : 100),
      300
    );
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

  /* RENDER */
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* PROGRESS */}
      <div className="w-full h-2 bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="flex-1 px-6 pt-8 pb-6 flex flex-col">
        {/* SOCIAL PROOF HEADLINE */}
        <section className="mb-6">
          <h1 className="text-2xl font-bold">
            Join 10,000+ achievers transforming with NutriBot
          </h1>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            {/* Social media logos as simple emojis to avoid importing SVGs */}
            <span>👍</span>
            <span>🤝</span>
            <span>💬</span>
            <span>❤️</span>
          </div>

          {/* Testimonial */}
          <blockquote className="bg-gray-50 rounded-lg p-4 mt-4">
            <p className="text-sm italic leading-snug">
              “NutriBot helped me drop 12 lbs in 6 weeks! The community kept me
              on track.”
            </p>
            <cite className="block mt-2 text-xs text-gray-600">— Alex T.</cite>
          </blockquote>
        </section>

        {/* FORM QUESTION */}
        {step === "height" ? (
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              Your height ({units === "metric" ? "cm" : "ft / in"})
            </span>
            <input
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder={units === "metric" ? "e.g. 170" : "e.g. 5.7"}
              type="number"
              inputMode="decimal"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
        ) : (
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              Your weight ({units === "metric" ? "kg" : "lbs"})
            </span>
            <input
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder={units === "metric" ? "e.g. 68" : "e.g. 150"}
              type="number"
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
        )}

        {/* UNIT SWITCH */}
        <div className="flex items-center gap-2 mt-5">
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
            {step === "height"
              ? "Next — Weight"
              : "Continue with the Community"}
          </button>

          <button
            className="mt-3 text-sm text-gray-500 underline"
            onClick={step === "height" ? onBack : () => setStep("height")}
          >
            ← Back
          </button>
        </div>
      </main>
    </div>
  );
}