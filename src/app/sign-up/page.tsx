'use client';

import React from "react";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-6 space-y-8 shadow-2xl rounded-2xl border">
        <h1 className="text-3xl font-bold text-center">Create an Account</h1>
        <p className="text-center text-gray-500">Join the community today</p>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              placeholder="John Doe"
              required
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <div className="text-center text-gray-500">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-black font-bold hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
