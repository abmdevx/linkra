import LinkRow from "../components/LinkRow";
import ShortenCard from "../components/ShortenCard";

export default function DashboardPage({
  user,
  links,
  url,
  setUrl,
  onShorten,
  loading,
  apiUrl,
  onCopy,
}) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="text-3xl font-semibold tracking-tight">Hi, {user.username}</h1>
      <p className="mt-1.5 text-muted">Create a new link or copy one you made earlier.</p>

      <div className="mt-8">
        <ShortenCard dashboard url={url} setUrl={setUrl} onSubmit={onShorten} loading={loading} />
      </div>

      <section className="mt-10">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-medium">Your links</h2>
          <span className="text-sm text-subtle">
            {links.length} {links.length === 1 ? "link" : "links"}
          </span>
        </div>

        {links.length === 0 ? (
          <div className="card px-6 py-14 text-center">
            <p className="font-medium">No links yet</p>
            <p className="mt-1 text-sm text-muted">Shorten your first URL above and it will show up here.</p>
          </div>
        ) : (
          <ul className="card divide-y divide-line overflow-hidden">
            {links.map((link) => (
              <LinkRow key={link._id} link={link} apiUrl={apiUrl} onCopy={onCopy} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
