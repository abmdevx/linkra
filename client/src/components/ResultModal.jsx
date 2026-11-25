import { useEffect, useState } from "react";
import { Check, Copy, X } from "lucide-react";

export default function ResultModal({ result, apiUrl, onClose, onCopy }) {
  const shortLink = `${apiUrl}/u/${result.shortUrl}`;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="card relative w-full max-w-md p-7 shadow-2xl shadow-black/50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
      >
        <button
          className="absolute right-4 top-4 rounded-lg p-1.5 text-subtle transition hover:bg-surface-2 hover:text-fg"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Check size={20} />
        </div>
        <h2 className="text-xl font-semibold tracking-tight" id="result-title">
          Your link is ready
        </h2>
        <p className="mt-1 text-sm text-muted">Copy it and share it anywhere.</p>

        <div className="mt-5 flex items-center gap-2">
          <a
            className="block h-12 min-w-0 flex-1 truncate rounded-xl border border-line bg-base px-4 text-sm leading-[3rem] text-accent hover:underline"
            href={shortLink}
            target="_blank"
            rel="noreferrer"
          >
            {shortLink}
          </a>
          <button className="btn btn-primary" onClick={handleCopy}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </section>
    </div>
  );
}
