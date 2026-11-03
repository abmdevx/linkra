import { Link2, ShieldCheck } from "lucide-react";

export default function ShortenCard({
  url,
  setUrl,
  onSubmit,
  loading,
  dashboard = false,
}) {
  const inputId = dashboard ? "dashboard-url" : "home-url";

  return (
    <section className="relative overflow-hidden rounded-[26px] border border-[rgba(123,130,176,.2)] bg-[linear-gradient(145deg,rgba(27,30,51,.93),rgba(13,15,28,.96))] p-6 shadow-[0_28px_80px_rgba(0,0,0,.4)] sm:p-9.5">
      <div className="pointer-events-none absolute -right-17.5 -top-22.5 h-45 w-45 rounded-full bg-[#3e26bd] opacity-[.16] blur-[80px]" />

      <div className="relative flex items-center gap-4">
        <div className="flex h-11.5 w-11.5 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-cyan-400 to-violet-600 shadow-lg shadow-blue-500/20">
          <img className="h-full w-full object-cover" src="/linkra.png" alt="" />
        </div>
        <div>
          <p className="mb-1 text-[.7rem] uppercase tracking-[.12em] text-[#8790b0]">
            {dashboard ? "Create another link" : "Link shortener"}
          </p>
          <h2 className="font-sans text-xl font-semibold tracking-[-.04em]">
            {dashboard ? "Keep building." : "Make it memorable."}
          </h2>
        </div>
      </div>

      <form
        className="relative mt-9"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <label className="mb-2 block text-sm font-semibold text-[#e5e8f4]" htmlFor={inputId}>
          Your long URL
        </label>
        <div className="flex items-center gap-2.5">
          <input
            className="min-h-13.5 min-w-0 w-full rounded-[11px] border border-[#2a2e47] bg-[#0a0c17] px-4 text-white outline-none transition placeholder:text-[#565d76] focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(46,201,237,.12)]"
            id={inputId}
            type="url"
            placeholder="https://yourwebsite.com/article"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          <button
            className="flex h-13.5 w-13.5 shrink-0 items-center justify-center rounded-[11px] bg-linear-to-br from-cyan-400 to-violet-600 text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-px hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
            type="submit"
            disabled={loading}
            aria-label="Create short link"
          >
            <Link2 size={23} />
          </button>
        </div>
        <p className="mt-2 text-xs text-[#626a83]">
          Paste any publicly accessible URL
        </p>
      </form>

      <p className="mt-7 flex items-center justify-center gap-1.5 text-[.68rem] text-[#5e6680]">
        <ShieldCheck size={12} className="text-cyan-400" />
        Your links are yours
      </p>
    </section>
  );
}
