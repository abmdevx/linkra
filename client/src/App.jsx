import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Check, Copy, Scissors, X } from "lucide-react";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayurl, setDisplayurl] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const API_URL = import.meta.env.VITE_BACKEND_END_ORIGIN || window.location.origin;
  const isResultOpen = Boolean(displayurl.data?.shortUrl);

  const receiveUrl = async (event) => {
    event.preventDefault();
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setHasSubmitted(true);
      return toast.error("Add a URL to create your short link.");
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/v1/short/receive-url", { url: trimmedUrl });
      setDisplayurl(res.data);
      setHasSubmitted(false);
    } catch (error) {
      const message = error.response?.data?.message || "We couldn't shorten that URL. Try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const shortLink = `${API_URL}/u/${displayurl.data?.shortUrl}`;

  const copyNotify = async () => {
    try {
      await navigator.clipboard.writeText(shortLink);
      toast.success("Copied to clipboard.");
    } catch {
      toast.error("Copy failed. Please copy the link manually.");
    }
  };

  const closeResult = () => setDisplayurl("");

  useEffect(() => {
    if (!isResultOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeResult();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isResultOpen]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070811] text-[#f5f7ff]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(52,33,147,.2),transparent_34rem)] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] before:bg-[length:4rem_4rem] before:[mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <Toaster position="top-center" toastOptions={{ className: "!bg-[#202442] !text-white" }} />

      <header className="relative z-10 mx-auto flex max-w-[1160px] items-center justify-between px-5 py-5 sm:px-8 sm:py-7">
        <a className="flex items-center gap-2 text-[1.35rem] font-bold tracking-[-.04em] text-white" href="/" aria-label="Linkra home">
          <img className="h-[34px] w-[34px] object-contain" src="/linkra.png" alt="" />
          <span>linkra<span className="text-[#15d4ed]">.</span></span>
        </a>
        <span className="hidden text-xs tracking-[.04em] text-[#7d849d] sm:inline">Simple links. Better reach.</span>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-150px)] max-w-[1160px] items-center justify-center px-5 py-[70px] sm:px-8 sm:py-[50px] sm:pb-[90px]">
        <section className="relative w-full max-w-[560px] overflow-hidden rounded-[26px] border border-[rgba(123,130,176,.2)] bg-[linear-gradient(145deg,rgba(27,30,51,.93),rgba(13,15,28,.96))] p-6 shadow-[0_28px_80px_rgba(0,0,0,.4),inset_0_1px_rgba(255,255,255,.06)] sm:p-[38px]" aria-label="URL shortener">
          <div className="pointer-events-none absolute -right-[70px] -top-[90px] h-[180px] w-[180px] rounded-full bg-[#3e26bd] opacity-[.16] blur-[80px]" />
          <div className="relative flex items-center gap-[15px]">
            <div className="flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,#11cee7,#5529ef)] shadow-[0_8px_20px_rgba(53,78,239,.25)]">
              <img className="h-full w-full object-cover" src="/linkra.png" alt="" />
            </div>
            <div>
              <p className="mb-[5px] text-[.7rem] uppercase tracking-[.12em] text-[#8790b0]">Link shortener</p>
              <h1 className="m-0 font-sans text-[1.35rem] font-semibold tracking-[-.04em]">Make it memorable.</h1>
            </div>
          </div>

          <form onSubmit={receiveUrl} className="relative mt-9">
            <label className="mb-2 block text-[.8rem] font-semibold text-[#e5e8f4]" htmlFor="url">Your long URL</label>
            <div className="flex items-center gap-2.5">
              <div className={`flex min-h-[54px] w-full items-center rounded-[11px] border bg-[#0a0c17] transition focus-within:border-[#2ec9ed] focus-within:shadow-[0_0_0_3px_rgba(46,201,237,.12)] ${hasSubmitted && !url.trim() ? "border-[#f1768f]" : "border-[#2a2e47]"}`}>
                <span className="border-r border-[#25283c] px-[15px] py-0 text-[.8rem] text-[#636b86]">https://</span>
                <input
                  className="min-w-0 w-full bg-transparent px-3.5 text-white outline-none placeholder:text-[#565d76]"
                  id="url"
                  type="url"
                  placeholder="yourwebsite.com/article"
                  value={url}
                  onChange={(event) => {
                    setUrl(event.target.value);
                    setHasSubmitted(false);
                  }}
                  aria-invalid={hasSubmitted && !url.trim()}
                  autoComplete="url"
                />
              </div>
              <button
                type="submit"
                className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[11px] bg-[linear-gradient(135deg,#13cde6,#652de9)] text-white shadow-[0_10px_24px_rgba(45,93,230,.24)] transition hover:brightness-110 hover:-translate-y-px disabled:cursor-wait disabled:opacity-65"
                disabled={loading}
                aria-label="Shorten URL"
              >
                <Scissors size={23} strokeWidth={2.2} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-[.7rem] text-[#626a83]">Paste any publicly accessible URL</p>
          </form>

          <p className="mt-[26px] text-center text-[.68rem] text-[#5e6680]"><span className="text-[.5rem] text-[#23cbd5]">●</span> No sign-up required · Your links are yours</p>
        </section>
      </main>

      <footer className="relative z-10 mx-auto flex max-w-[1160px] items-center gap-3.5 px-5 pb-[22px] text-xs tracking-[.04em] text-[#7d849d] sm:px-8 sm:pb-[26px]">
        <span>© {new Date().getFullYear()} Linkra</span>
        <span className="h-3 w-px bg-[#2b2e3e]" />
        <span>Made for the web</span>
      </footer>

      {isResultOpen && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(3,4,12,.78)] p-5"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeResult();
          }}
        >
          <section className="relative w-full max-w-[430px] rounded-3xl border border-[rgba(120,132,204,.35)] bg-[linear-gradient(145deg,#202442,#0d1020)] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,.6)]" role="dialog" aria-modal="true" aria-labelledby="result-title">
            <button className="absolute right-[18px] top-4 flex items-center justify-center bg-transparent p-1 text-[#8790ad]" type="button" onClick={closeResult} aria-label="Close dialog">
              <X size={20} aria-hidden="true" />
            </button>
            <div className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#15d4d8,#4264f0)] text-white shadow-[0_8px_25px_rgba(35,205,222,.25)]" aria-hidden="true">
              <Check size={25} strokeWidth={2.5} />
            </div>
            <p className="mb-2 text-[.73rem] font-bold uppercase tracking-[.12em] text-[#6de0e5]">Your link is ready</p>
            <h2 className="mb-[22px] font-sans text-[1.7rem] font-semibold tracking-[-.04em]" id="result-title">Share it anywhere.</h2>
            <div className="flex items-center gap-2">
              <a className="block min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-[10px] border border-[#303653] bg-[#090c18] p-3.5 text-left text-[.84rem] text-[#83dff5]" href={shortLink} target="_blank" rel="noreferrer">{shortLink}</a>
              <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,#13cde6,#652de9)] text-white shadow-[0_8px_18px_rgba(45,93,230,.24)] transition hover:brightness-110 hover:-translate-y-px" type="button" onClick={copyNotify} aria-label="Copy short link" title="Copy short link">
                <Copy size={19} strokeWidth={2.2} aria-hidden="true" />
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
