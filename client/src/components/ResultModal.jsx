import { Check, Clipboard, X } from "lucide-react";

export default function ResultModal({ result, apiUrl, onClose, onCopy }) {
  const shortLink = `${apiUrl}/u/${result.shortUrl}`;

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(3,4,12,.78)] p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="relative w-full max-w-107.5 rounded-3xl border border-[rgba(120,132,204,.35)] bg-[linear-gradient(145deg,#202442,#0d1020)] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,.6)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
      >
        <button
          className="absolute right-4.5 top-4 text-[#8790ad]"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="mx-auto mb-4.5 flex h-13 w-13 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/20">
          <Check size={25} />
        </div>

        <p className="mb-2 text-[.73rem] font-bold uppercase tracking-[.12em] text-[#6de0e5]">
          Your link is ready
        </p>
        <h2
          className="mb-5.5 font-sans text-[1.7rem] font-semibold tracking-[-.04em]"
          id="result-title"
        >
          Share it anywhere.
        </h2>

        <div className="flex items-center gap-2">
          <a
            className="block min-w-0 flex-1 truncate rounded-[10px] border border-[#303653] bg-[#090c18] p-3.5 text-left text-[.84rem] text-[#83dff5]"
            href={shortLink}
            target="_blank"
            rel="noreferrer"
          >
            {shortLink}
          </a>
          <button
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-linear-to-br from-cyan-400 to-violet-600 text-white shadow-lg shadow-blue-500/20"
            onClick={onCopy}
            aria-label="Copy short link"
          >
            <Clipboard size={19} />
          </button>
        </div>
      </section>
    </div>
  );
}
