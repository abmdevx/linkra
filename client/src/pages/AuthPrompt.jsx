import { Link2 } from "lucide-react";

export default function AuthPrompt({ onAuth }) {
  return (
    <main className="relative z-10 flex min-h-[calc(100vh-110px)] items-center justify-center px-5">
      <section className="max-w-md text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-600">
          <Link2 size={30} />
        </div>

        <h1 className="font-sans text-4xl font-semibold tracking-[-.06em]">
          Your dashboard is waiting.
        </h1>

        <p className="mt-4 leading-7 text-[#8790b0]">
          Sign in to see every link you have shortened and keep creating from
          one calm workspace.
        </p>

        <button
          className="mt-7 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-600 px-6 py-3 font-bold"
          onClick={onAuth}
        >
          Sign in to continue
        </button>
      </section>
    </main>
  );
}
