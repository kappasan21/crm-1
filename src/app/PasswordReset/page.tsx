/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from "react";
import Link from "next/link";




export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);
    // Basic validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Fake "password reset" (replace with real API call)
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
  };

  return (
    <section className="flex min-h-full items-center justify-center bg-zinc-100 px-4 py-10 text-zinc-950">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg shadow-zinc-300/40">
        <div className="mb-8 text-center">
          <h1 className="mt-3 text-3xl font-bold">Reset Password</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        {submitted ? (
          <div className="text-center">
            <p className="text-green-600 mb-6">If that email address is registered, you'll receive a password reset link soon.</p>
            <Link href="/Login" className="text-blue-500 underline font-medium">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
              Send Reset Link
            </button>
          </form>
        )}
        <p className="mt-5 text-center text-sm text-zinc-600">
          Remembered your password?{" "}
          <Link href="/Login" className="text-blue-500 font-medium text-base underline hover:underline">
            Back to Log in
          </Link>
        </p>
      </div>
    </section>
  );
}