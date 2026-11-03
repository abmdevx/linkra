import { ArrowRight } from "lucide-react";

export default function AuthPage({
  mode,
  setMode,
  form,
  setForm,
  onSubmit,
  loading,
}) {
  const isLogin = mode === "login";

  return (
    <main className="relative z-10 flex min-h-[calc(100vh-110px)] items-center justify-center px-5 py-12">
      <section className="w-full max-w-107.5 rounded-[26px] border border-white/10 bg-[linear-gradient(145deg,rgba(27,30,51,.96),rgba(13,15,28,.98))] p-7 shadow-2xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-cyan-400 to-violet-600">
            <img className="h-full w-full object-cover" src="/linkra.png" alt="" />
          </div>
          <h1 className="font-sans text-3xl font-semibold tracking-tighter">
            {isLogin ? "Welcome back." : "Join Linkra."}
          </h1>
          <p className="mt-2 text-sm text-[#8790b0]">
            {isLogin
              ? "Your links are waiting for you."
              : "Keep every short link in one place."}
          </p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block text-sm font-semibold text-[#e5e8f4]">
            Username
            <input
              className="mt-2 w-full rounded-xl border border-[#2a2e47] bg-[#0a0c17] px-4 py-3.5 text-white outline-none transition placeholder:text-[#565d76] focus:border-cyan-400"
              placeholder="your_username"
              value={form.username}
              onChange={(event) =>
                setForm({ ...form, username: event.target.value })
              }
              autoComplete="username"
            />
          </label>

          <label className="block text-sm font-semibold text-[#e5e8f4]">
            Password
            <input
              className="mt-2 w-full rounded-xl border border-[#2a2e47] bg-[#0a0c17] px-4 py-3.5 text-white outline-none transition placeholder:text-[#565d76] focus:border-cyan-400"
              type="password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={(event) =>
                setForm({ ...form, password: event.target.value })
              }
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </label>

          <button
            className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 via-blue-500 to-violet-600 font-bold text-white transition hover:brightness-110 disabled:opacity-60"
            disabled={loading}
          >
            {isLogin ? "Sign in" : "Create account"}
            <ArrowRight size={17} />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#8790b0]">
          {isLogin ? "New to Linkra?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="font-semibold text-cyan-300 hover:text-cyan-200"
            onClick={() => setMode(isLogin ? "register" : "login")}
          >
            {isLogin ? "Create an account" : "Sign in"}
          </button>
        </p>
      </section>
    </main>
  );
}
