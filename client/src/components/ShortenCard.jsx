import { Loader2 } from "lucide-react";

export default function ShortenCard({
  url,
  setUrl,
  onSubmit,
  loading,
  dashboard = false,
}) {
  const inputId = dashboard ? "dashboard-url" : "home-url";

  return (
    <form
      className="flex flex-col gap-2.5 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label className="sr-only" htmlFor={inputId}>
        Your long URL
      </label>
      <input
        className="input"
        id={inputId}
        type="url"
        placeholder="Paste a long URL, e.g. https://example.com/article"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />
      <button className="btn btn-primary sm:w-32" type="submit" disabled={loading}>
        {loading ? <Loader2 size={17} className="animate-spin" /> : "Shorten"}
      </button>
    </form>
  );
}
