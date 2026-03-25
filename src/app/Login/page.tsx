/* eslint-disable react/no-unescaped-entities */
'use client';
import handleLogin from "./actions";
import { useActionState } from "react";
import Loading from "./loading";
import Link from "next/link";



export default function LoginForm() {
  // Make sure to replace action function name with "action" here
  const [state, action, isPending] = useActionState(handleLogin, null);

  // JSX
  return (
    <section className="h-[70vh] flex items-center justify-center bg-zinc-100 px-4 py-10 text-zinc-950">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg shadow-zinc-300/40">
        <div className="mb-4 text-center">
          <h1 className="mt-3 text-3xl font-bold">Sign in</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Please <Link href="/Signup" className="text-base text-blue-500 underline">Sign up</Link> first if you don't have a user account yet.
          </p>
          {state?.error && <p className="text-red-500">{state.error}</p>}
        </div>

        {isPending ? <Loading /> : 
        <form action={action} className="space-y-5">
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
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-zinc-700">
                Password
              </label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />
          </div>

          {/* TODO: create forgot password function later */}
          {/* <div className="text-center mb-5 ">
              <a href="/PasswordReset" className="text-base text-blue-500 underline font-medium hover:text-zinc-900">
                Forgot password?
              </a>
          </div> */}


          <button
            type="submit"
            className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Log in
          </button>
        </form>
      }
      </div>
    </section>
  );
};
