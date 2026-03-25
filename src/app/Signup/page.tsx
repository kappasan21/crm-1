


export default function SignupForm() {

  return (
    <section className="flex min-h-full items-center justify-center bg-zinc-100 px-4 py-10 text-zinc-950">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg shadow-zinc-300/40">
        <div className="mb-8 text-center">
          <h1 className="mt-3 text-3xl font-bold">Sign up</h1>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />
          </div>

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
            <label htmlFor="password" className="text-sm font-medium text-zinc-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm-password" className="text-sm font-medium text-zinc-700">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Sign up
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <a href="/Login" className="text-blue-500 font-medium text-base underline hover:underline">
            Log in
          </a>
        </p>
      </div>
    </section>
  );

}