import React from 'react';

export default function VariantB() {
  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pt-12 pb-8">
      {/* Social Proof Banner */}
      <div className="bg-indigo-50 p-4 rounded-lg mb-6 text-center">
        <p className="text-sm font-medium text-indigo-700">
          80% of NutriBot users maintain their weight loss 6 months later
        </p>
      </div>

      {/* Headline */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        Join 10,000+ people changing their lives
      </h1>
      <p className="text-gray-600 text-center mb-8">
        People like you are already thriving with NutriBot.
      </p>

      {/* Testimonial */}
      <div className="bg-gray-100 p-5 rounded-xl flex flex-col items-center text-center mb-8">
        <img
          src="https://i.pravatar.cc/80?img=12"
          alt="User avatar"
          className="w-16 h-16 rounded-full mb-3"
        />
        <p className="text-gray-800 italic mb-2">
          “NutriBot helped me lose 18 lbs and keep it off. I feel part of a
          supportive community every day.”
        </p>
        <span className="text-sm text-gray-500">— Alex, 34</span>
      </div>

      {/* CTA */}
      <button className="mt-auto py-4 bg-indigo-600 text-white rounded-lg font-semibold active:scale-95 transition transform">
        Get Started
      </button>
    </div>
  );
}