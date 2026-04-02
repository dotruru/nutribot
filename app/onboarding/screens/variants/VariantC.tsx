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
  const [secondsLeft, setSecondsLeft] = useState<number>(30);

  /* COUNTDOWN TIMER */
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

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

  /* TOOLTIP HELPER */
  const Info = ({ text }: { text: string }) => (
    <span
      className="ml-1 cursor-help text-gray-400"
      title={text}
    >
      ⓘ
    </span>
  );

  /* RENDER */
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* TOP BAR with TIMER */}
      <div className="w-full flex items-center justify-between px-4 h-10 bg-gray-100 text-xs tracking-wide">
        <span>
          Step {step === "height" ? "1" : "2"}/2
        </span>
        <span className="font-medium">
          {secondsLeft}s left
        </span>
      </div>

      <main className="flex-1 px-6 pt-8 pb-6 flex flex-col">
        {/* UTILITY HEADLINE */}
        <h1 className="text-xl font-bold mb-6">
          Quick setup — get your calorie plan in under a minute
        </h1>

        {/* FORM FIELD */}
        {step === "height" ? (
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              Height ({units === "metric" ? "cm" : "ft / in"})
              <Info text="We use height to calculate an accurate calorie range." />
            </span>
            <input
              type="number"
              inputMode="decimal"
              placeholder={units === "metric" ? "e.g. 178" : "e.g. 5.10"}
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
        ) : (
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              Weight ({units === "metric" ? "kg" : "lbs"})
              <Info text="Your current weight sets the baseline for progress tracking." />
            </span>
            <input
              type="number"
              inputMode="decimal"
              placeholder={units === "metric" ? "e.g. 75" : "e.g. 165"}
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
        )}

        {/* UNIT TOGGLE */}
        <div className="flex items-center gap-2 mt-5">
          <span className="text-sm">Units:</span>
          <button
            className={`px-3 py-1 border rounded-l-md ${
              units === "metric"
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setUnits("metric")}
          >
            Metric
          </button>
          <button
            className={`px-3 py-1 border rounded-r-md ${
              units === "imperial"
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setUnits("imperial")}
          >
            Imperial
          </button>
        </div>

        {/* CTA + BACK */}
        <div className="mt-auto">
          <button
            disabled={!canContinue}
            onClick={handleContinue}
            className={`w-full py-4 rounded-lg font-semibold shadow transition-colors ${
              canContinue
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {step === "height" ? "Next" : "Generate My Plan"}
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