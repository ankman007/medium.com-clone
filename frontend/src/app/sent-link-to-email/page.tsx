"use client";

import React from "react";
import Link from "next/link";

const PasswordSent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-6 space-y-8 shadow-2xl rounded-2xl border text-center">
        <h1 className="text-2xl font-bold">Check Your Email</h1>
        <p className="text-gray-500">
          We have sent a password reset link to your email. Please check your
          inbox and follow the instructions to reset your password.
        </p>
        <div className="flex flex-col space-y-4">
          <button className="w-full p-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition">
            Open Email App
          </button>
          <p className="text-gray-500 text-sm">
            Didn’t receive the email?{" "}
            <Link
              href="/forgot-password"
              className="text-black font-bold hover:underline"
            >
              Resend
            </Link>
          </p>
        </div>
        <div className="text-center text-gray-500">
          <p>
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-black font-bold hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordSent;
