export default function AuthPage({ mode, setMode, form, setForm, onSubmit, loading }) {
  const isLogin = mode === "login";

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-12">
      <section className="card w-full max-w-sm p-7 sm:p-8">
        <img className="mb-5 h-11 w-11" src="/linkra.svg" alt="" />
        <h1 className="text-2xl font-semibold tracking-tight">
          {isLogin ? "Sign in to Linkra" : "Create your account"}
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          {isLogin ? "Welcome back. Your links are waiting." : "Keep every short link in one place."}
        </p>

        <form className="mt-7 space-y-4" onSubmit={onSubmit}>
          <label className="block text-sm font-medium">
            Username
            <input
              className="input mt-2"
              placeholder="your_username"
              value={form.username}
              onChange={(event) => setForm({ ...form, username: event.target.value })}
              autoComplete="username"
            />
          </label>

          <label className="block text-sm font-medium">
            Password
            <input
              className="input mt-2"
              type="password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </label>

          <button className="btn btn-primary w-full" disabled={loading}>
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {isLogin ? "New to Linkra?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="font-medium text-accent hover:underline"
            onClick={() => setMode(isLogin ? "register" : "login")}
          >
            {isLogin ? "Create an account" : "Sign in"}
          </button>
        </p>
      </section>
    </main>
  );
}
