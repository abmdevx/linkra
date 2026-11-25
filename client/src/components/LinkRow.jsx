import { Copy, ExternalLink } from "lucide-react";

export default function LinkRow({ link, apiUrl, onCopy }) {
  const shortLink = `${apiUrl}/u/${link.shortUrl}`;
  const createdDate = new Date(link.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <li className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-surface-2/60">
      <div className="min-w-0">
        <a
          className="inline-flex max-w-full items-center gap-1.5 font-medium text-accent hover:underline"
          href={shortLink}
          target="_blank"
          rel="noreferrer"
        >
          <span className="truncate">{shortLink}</span>
          <ExternalLink size={13} className="shrink-0" />
        </a>
        <p className="mt-1 truncate text-sm text-muted">{link.originalUrl}</p>
        <p className="mt-1 text-xs text-subtle">{createdDate}</p>
      </div>

      <button
        className="btn btn-sm btn-ghost"
        onClick={() => onCopy(link.shortUrl)}
        aria-label="Copy short link"
      >
        <Copy size={15} />
        <span className="hidden sm:inline">Copy</span>
      </button>
    </li>
  );
}
