'use client';
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-6 space-y-8 shadow-2xl rounded-2xl border">
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
        <p className="text-center text-gray-500">Log in to your account</p>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
          >
            Log In
          </button>
        </form>
        <div className="text-center text-gray-500">
          <p>
            Do not have an account?{" "}
            <a href="/register" className="text-black font-bold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
