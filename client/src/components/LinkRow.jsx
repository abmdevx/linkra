import { Clipboard, ExternalLink } from "lucide-react";

export default function LinkRow({ link, apiUrl, onCopy }) {
  const shortLink = `${apiUrl}/u/${link.shortUrl}`;
  const createdDate = new Date(link.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group rounded-2xl border border-white/10 bg-[#0d1020]/70 p-4 transition hover:border-cyan-400/30">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <a
            className="flex items-center gap-2 truncate font-semibold text-cyan-300 hover:text-cyan-200"
            href={shortLink}
            target="_blank"
            rel="noreferrer"
          >
            {shortLink}
            <ExternalLink size={14} className="shrink-0" />
          </a>
          <p className="mt-2 truncate text-xs text-[#69718b]">
            {link.originalUrl}
          </p>
        </div>

        <button
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[#8790b0] transition hover:border-cyan-400/30 hover:text-cyan-300"
          onClick={() => onCopy(link.shortUrl)}
          aria-label="Copy short link"
        >
          <Clipboard size={16} />
        </button>
      </div>

      <p className="mt-3 text-[.68rem] text-[#505974]">{createdDate}</p>
    </article>
  );
}
