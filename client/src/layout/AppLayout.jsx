import { useEffect, useState } from "react";
import { House, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function AppLayout({ children, onHome, onAuth, onDashboard, onLogout }) {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const navigateHome = () => {
    setMenuOpen(false);
    onHome();
  };

  const navigateDashboard = () => {
    setMenuOpen(false);
    onDashboard();
  };

  const logout = () => {
    setMenuOpen(false);
    onLogout();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070811] text-[#f5f7ff]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(62,38,189,.26),transparent_35rem)] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] before:bg-size-[4rem_4rem] before:mask-[linear-gradient(to_bottom,black,transparent_75%)]" />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 sm:py-7">
        <button className="flex items-center gap-2 text-[1.35rem] font-bold tracking-[-.04em] text-white" onClick={navigateHome} aria-label="Linkra home">
          <img className="h-8.5 w-8.5 object-contain" src="/linkra.png" alt="" />
          <span>linkra<span className="text-[#15d4ed]">.</span></span>
        </button>
        <nav className="hidden items-center gap-2 sm:flex">
          {user ? (
            <>
              <button className="rounded-lg px-3 py-2 text-sm text-[#9aa4c4] transition hover:bg-white/5 hover:text-white" onClick={onDashboard}>Dashboard</button>
              <button className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-[#dfe5ff] transition hover:bg-white/10 hover:text-cyan-200" onClick={onLogout} aria-label="Log out" title="Log out">
                <LogOut size={17} />
              </button>
            </>
          ) : <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#dfe5ff] transition hover:border-cyan-400/40 hover:bg-white/10" onClick={onAuth}>Sign in</button>}
        </nav>
        <button
          className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-[#dfe5ff] transition hover:border-cyan-300/30 hover:bg-white/10 sm:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <Menu size={21} />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-20 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 sm:hidden ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-[min(86vw,21rem)] flex-col border-r border-white/10 bg-[#0c0e1c] p-5 shadow-2xl shadow-black/40 transition-transform duration-300 ease-out sm:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-lg font-bold tracking-[-.04em]" onClick={navigateHome}>
            <img className="h-8 w-8 object-contain" src="/linkra.png" alt="" />
            <span>linkra<span className="text-[#15d4ed]">.</span></span>
          </button>
          <button
            className="rounded-xl p-2 text-[#9aa4c4] transition hover:bg-white/5 hover:text-white"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={21} />
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-2">
          <button className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-[#dfe5ff] transition hover:bg-white/5 hover:text-white" onClick={navigateHome}>
            <House size={18} />
            Home
          </button>
          {user && (
            <>
              <button className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-[#dfe5ff] transition hover:bg-white/5 hover:text-white" onClick={navigateDashboard}>
                <LayoutDashboard size={18} />
                Dashboard
              </button>
              <button
                className="mt-4 flex w-fit items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3 text-[#dfe5ff] transition hover:border-red-300/30 hover:bg-red-400/10 hover:text-red-200"
                onClick={logout}
                aria-label="Log out"
                title="Log out"
              >
                <LogOut size={18} />
              </button>
            </>
          )}
          {!user && (
            <button className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-[#dfe5ff] transition hover:border-cyan-400/40 hover:bg-white/10" onClick={() => { setMenuOpen(false); onAuth(); }}>
              Sign in
            </button>
          )}
        </div>
      </aside>

      {children}
    </div>
  );
}
