import React from 'react';

export default function VariantC() {
  const hints = {
    email: "We need your email to create an account.",
    name: "Your full name helps us personalize your experience."
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Get Started in 30 Seconds</h2>
          <p className="text-gray-600">Quick and easy setup for immediate personalized insights.</p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
              <span className="ml-2 cursor-pointer" title={hints.email}>ℹ️</span>
            </label>
            <input type="email" className="mt-1 w-full border border-gray-300 p-2 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
              <span className="ml-2 cursor-pointer" title={hints.name}>ℹ️</span>
            </label>
            <input type="text" className="mt-1 w-full border border-gray-300 p-2 rounded-lg" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">Continue</button>
        </form>
        <p className="text-right text-sm text-gray-500 mt-4">30 seconds left</p>
      </div>
    </div>
  );
}