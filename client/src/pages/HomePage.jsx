import { ArrowRight, Sparkles } from "lucide-react";
import ShortenCard from "../components/ShortenCard";

export default function HomePage({
  user,
  url,
  setUrl,
  onShorten,
  loading,
  onAuth,
}) {
  return (
    <main className="relative z-10 mx-auto grid min-h-[calc(100vh-110px)] max-w-6xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
      <section>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.14em] text-cyan-200">
          <Sparkles size={13} />
          Your links, your way
        </div>

        <h1 className="max-w-2xl font-sans text-6xl font-semibold leading-[.95] tracking-[-.07em] sm:text-8xl">
          Short links.
          <br />
          <span className="bg-linear-to-r from-cyan-300 via-blue-400 to-violet-500 bg-clip-text text-transparent">
            Longer reach.
          </span>
        </h1>

        <p className="mt-7 max-w-lg text-lg leading-8 text-[#9aa0b7]">
          A fast, beautiful way to turn your URLs into links people can
          remember. Create an account to keep every link at your fingertips.
        </p>

        {!user && (
          <button
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:gap-3"
            onClick={onAuth}
          >
            Create your free account
            <ArrowRight size={16} />
          </button>
        )}
      </section>

      <ShortenCard
        url={url}
        setUrl={setUrl}
        onSubmit={onShorten}
        loading={loading}
      />
    </main>
  );
}
