import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">

      {/* Message Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">

        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Signed In Successfully!
        </h1>

        <p className="text-gray-700 mb-6">
          Please go to the login page to continue.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Go to Login
        </button>

      </div>

    </div>
  );
}

export default Success;