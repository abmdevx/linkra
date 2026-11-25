import ShortenCard from "../components/ShortenCard";

export default function HomePage({ user, url, setUrl, onShorten, loading, onAuth }) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-5 py-20 text-center sm:px-8">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
        Short links,
        <br />
        made simple.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-lg text-muted">
        Paste a long URL and get a short one you can share anywhere.
      </p>

      <div className="mt-10 text-left">
        <ShortenCard url={url} setUrl={setUrl} onSubmit={onShorten} loading={loading} />
      </div>

      {!user && (
        <p className="mt-5 text-sm text-subtle">
          <button className="text-accent hover:underline" onClick={onAuth}>
            Create a free account
          </button>{" "}
          to keep all your links in one place.
        </p>
      )}
    </main>
  );
}
