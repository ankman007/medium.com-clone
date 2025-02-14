"use client";

import Link from "next/link";
import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    tc: true, // Assuming terms & conditions are required
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Validate Password Strength
  const isPasswordStrong = (password: string) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    // Client-side validation
    if (!formData.name || !formData.email || !formData.password || !formData.password2) {
      setError("All fields are required.");
      return;
    }
    if (formData.password !== formData.password2) {
      setError("Passwords do not match.");
      return;
    }
    if (!isPasswordStrong(formData.password)) {
      setError("Password must be at least 8 characters long, include a capital letter, a number, and a special character.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/user/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed. Please try again.");
      }

      // Store tokens in localStorage
      localStorage.setItem("accessToken", data.token.access);
      localStorage.setItem("refreshToken", data.token.refresh);

      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-6 space-y-8 shadow-2xl rounded-2xl border">
        <h1 className="text-3xl font-bold text-center">Create an Account</h1>
        <p className="text-center text-gray-500">Join the community today</p>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              onChange={handleFormChange}
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
              onChange={handleFormChange}
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
              onChange={handleFormChange}
              type="password"
              id="password"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              onChange={handleFormChange}
              type="password"
              id="password2"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="mt-4">
            <input type="checkbox" id="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I accept the{" "}
              <Link href="/terms" className="text-black font-bold hover:underline">
                Terms and Conditions
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-gray-500">
          <p>
            <Link href="/login" className="text-black font-bold hover:underline">
              Already have an account? Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
