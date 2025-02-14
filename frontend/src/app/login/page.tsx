"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Both email and password are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/user/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Login failed. Please check your credentials.");
      }

      // Store tokens in localStorage
      localStorage.setItem("accessToken", data.Token.access);
      localStorage.setItem("refreshToken", data.Token.refresh);

      // Redirect to dashboard
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-6 space-y-8 shadow-2xl rounded-2xl border">
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
        <p className="text-center text-gray-500">Log in to your account</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <button
            type="submit"
            className="w-full p-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="text-center text-gray-500">
          <p>
            <Link href="/sign-up" className="text-black font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
