import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md"
          />
          <button className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
