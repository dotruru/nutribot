import React from 'react';

export default function VariantB() {
  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="text-center">
          <blockquote className="text-gray-800 italic">"Joining NutriBot was the best decision for my health journey. Now, I feel like I'm part of a supportive community."</blockquote>
          <p className="mt-2 text-gray-600 font-medium">- Alex, NutriBot User</p>
        </div>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold text-blue-800">Join a Family of 10,000+ Like-Minded Individuals</h2>
          <p className="text-gray-600 mt-2">Become part of a thriving community focused on collective growth and support.</p>
        </div>
        <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">Join Us</button>
      </div>
    </div>
  );
}