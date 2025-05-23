'use client';
import React, { useState } from "react";
import Link from "next/link";
import { fetchWithAuth } from "../../../utils";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    tc: true,
  });
  const [avatar, setAvatar] = useState<File | null>(null); // State for avatar

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    const minLength = 8;

    if (password.length < minLength) errors.push(`Password must be at least ${minLength} characters.`);
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter.");
    if (!/\d/.test(password)) errors.push("Password must contain at least one number.");
    if (/\s/.test(password)) errors.push("Password cannot contain spaces.");

    return errors;
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setPasswordErrors([]);

    if (!formData.name || !formData.email || !formData.password || !formData.password2) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.password2) {
      setError("Passwords do not match.");
      return;
    }

    const passwordValidationErrors = validatePassword(formData.password);
    if (passwordValidationErrors.length > 0) {
      setPasswordErrors(passwordValidationErrors);
      return;
    }

    if (!avatar) {
      setError("Profile avatar is required.");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("password2", formData.password2);
      formDataToSend.append("tc", formData.tc.toString());
      formDataToSend.append("avatar", avatar);

      const response = await fetchWithAuth("http://localhost:8000/user/register/", {
        method: "POST",
        body: formDataToSend, 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed. Please try again.");
      }

      localStorage.setItem("accessToken", data.token.access);
      localStorage.setItem("refreshToken", data.token.refresh);

      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err) {
      setError((err as Error).message);
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
            <ul className="mt-2 text-red-500 text-sm">
              {passwordErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
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

          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
              Profile Avatar
            </label>
            <input
              onChange={handleAvatarChange}
              type="file"
              id="avatar"
              accept="image/*"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mt-4">
            <input type="checkbox" id="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I accept the{" "}
              <Link
                href="/terms"
                className="text-black text-inherit no-underline flex items-center gap-2 hover:text-white focus:text-white hover:no-underline focus:no-underline space-x-2">
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
    <Link
      href="/login"
      className="text-gray-700 font-semibold no-underline hover:text-black hover:no-underline transition-colors duration-200"
    >
      Already have an account? <span className="underline">Login</span>
    </Link>
  </p>
</div>

      </div>
    </div>
  );
};

export default Signup;
