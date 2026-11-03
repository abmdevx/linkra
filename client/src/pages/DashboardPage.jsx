import { Clipboard, Link2 } from "lucide-react";
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
    <main className="relative z-10 mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-cyan-300">
            Your workspace
          </p>
          <h1 className="font-sans text-4xl font-semibold tracking-[-.06em] sm:text-5xl">
            Good to see you,{" "}
            <span className="bg-linear-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
              {user.username}
            </span>
            .
          </h1>
          <p className="mt-3 text-[#8790b0]">
            Manage and share every link you create.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-4 py-3">
          <Link2 className="text-cyan-300" size={20} />
          <div>
            <p className="text-xl font-bold">{links.length}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <ShortenCard
          dashboard
          url={url}
          setUrl={setUrl}
          onSubmit={onShorten}
          loading={loading}
        />

        <section className="rounded-[26px] border border-white/10 bg-white/3 p-5 sm:p-7">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-sans text-xl font-semibold">Your short links</h2>
              <p className="mt-1 text-sm text-[#69718b]">
                Everything you have created.
              </p>
            </div>
            <Clipboard className="text-[#69718b]" size={20} />
          </div>

          {links.length === 0 ? (
            <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 text-center">
              <Link2 className="mb-3 text-[#4c5572]" size={28} />
              <p className="font-semibold text-[#c8cee3]">No links yet</p>
              <p className="mt-1 text-sm text-[#69718b]">
                Create your first short link to see it here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {links.map((link) => (
                <LinkRow
                  key={link._id}
                  link={link}
                  apiUrl={apiUrl}
                  onCopy={onCopy}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
