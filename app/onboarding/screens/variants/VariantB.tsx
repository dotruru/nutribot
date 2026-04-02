"use client"
import React, { useState } from "react";

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

  const canContinue = !!height && !!weight;

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
      <div className="flex-1 flex flex-col px-6 py-8">
        {/* Social proof header */}
        <section className="mb-8">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
            {/* avatar icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-semibold">
                ★
              </div>
            </div>
            <div className="text-sm leading-snug">
              <p className="font-medium text-gray-800">
                “I lost 18 lbs and kept it off for 6 months thanks to NutriBot.”
              </p>
              <p className="text-gray-600 mt-1">— Alex, NutriBot Community</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500 text-center">
            Join 10,000+ people transforming their health right now
          </p>
        </section>

        {/* Form */}
        <form
          className="flex-1 flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (canContinue) handleContinue();
          }}
        >
          {/* Height */}
          <label className="w-full">
            <span className="block text-sm font-medium mb-2 flex items-center gap-1">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 2v20m5-5H7"></path>
              </svg>
              Height ({units === "metric" ? "cm" : "ft / in"})
            </span>
            <input
              type="number"
              inputMode="decimal"
              placeholder={units === "metric" ? "175" : "5.9"}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>

          {/* Weight */}
          <label className="w-full">
            <span className="block text-sm font-medium mb-2 flex items-center gap-1">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M20 12H4"></path>
              </svg>
              Weight ({units === "metric" ? "kg" : "lbs"})
            </span>
            <input
              type="number"
              inputMode="decimal"
              placeholder={units === "metric" ? "70" : "154"}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>

          {/* Units switch */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Units:</span>
            <button
              type="button"
              onClick={() => setUnits("metric")}
              className={`px-3 py-1 border rounded-l-md ${
                units === "metric"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Metric
            </button>
            <button
              type="button"
              onClick={() => setUnits("imperial")}
              className={`px-3 py-1 border rounded-r-md ${
                units === "imperial"
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Imperial
            </button>
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={!canContinue}
            className={`mt-auto w-full py-4 rounded-lg font-semibold shadow transition-colors ${
              canContinue
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            Join the Community
          </button>
        </form>

        {/* Back link */}
        <button
          className="mt-6 text-sm text-gray-500 underline self-start"
          onClick={onBack}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}