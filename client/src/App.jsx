import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayurl, setDisplayurl] = useState("");
  const API_URL = import.meta.env.VITE_BACKEND_END_ORIGIN;
  const receiveUrl = async () => {
    setLoading(true);
    
    if(url.length === 0)
    {
      setLoading(false);
      return toast.error("Please enter an url to continue")
    }
    try {
    const res = await axios.post("/api/v1/short/receive-url", {
      url: url, // 👈 send your input state here
    });
    setDisplayurl(res.data);
    setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const short_link = `${API_URL}/u/${displayurl.data?.shortUrl}`

  const copy_notify = () => {
    navigator.clipboard.writeText(short_link)
    toast.success("Copied to clipboard")
  }

  return (
    <>
    <Toaster position="top-center" />
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      {/* Card */}
      <div className="relative w-full max-w-xl bg-[#0b0f1a] border border-blue-900/40 rounded-2xl shadow-2xl p-8 text-white">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-blue-400">
          URL Shortener
        </h1>

        <p className="mt-3 text-center text-gray-400">
          Convert long URLs into short links instantly
        </p>

        {/* Input box */}
        <div className="mt-8 flex flex-col gap-4">

          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-black border border-blue-900/50 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-600/30 transition"
          />

          <button
            onClick={receiveUrl}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition font-semibold text-white shadow-lg shadow-blue-600/20 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Shorten URL"}
          </button>
        </div>
        {!loading && displayurl.data?.shortUrl && (
          <div className="mt-6 rounded-xl border border-blue-900/50 bg-black/50 p-4">
            <p className="text-sm text-blue-400 font-medium mb-2">
              Short URL Generated
            </p>

            <div className="flex gap-2">
              <a
                href={short_link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 break-all rounded-lg bg-[#111827] px-4 py-3 text-blue-300 hover:text-blue-200 transition border border-blue-900/50"
              >
                {short_link}
              </a>

              <button
                onClick={copy_notify}
                className="px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                Copy
              </button>
            </div>
          </div>
        )}
        {/* Footer */}
        <p className="text-center mt-6 text-gray-500 text-sm">
          Built with React + Vite ⚡
        </p>

      </div>
    </div>
    </>
  );
}

export default App;