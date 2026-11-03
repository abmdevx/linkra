import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function AppLayout({ children, onHome, onAuth, onDashboard, onLogout }) {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070811] text-[#f5f7ff]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(62,38,189,.26),transparent_35rem)] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] before:bg-[length:4rem_4rem] before:[mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 sm:py-7">
        <button className="flex items-center gap-2 text-[1.35rem] font-bold tracking-[-.04em] text-white" onClick={onHome} aria-label="Linkra home">
          <img className="h-[34px] w-[34px] object-contain" src="/linkra.png" alt="" />
          <span>linkra<span className="text-[#15d4ed]">.</span></span>
        </button>
        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <button className="hidden rounded-lg px-3 py-2 text-sm text-[#9aa4c4] transition hover:bg-white/5 hover:text-white sm:block" onClick={onDashboard}>Dashboard</button>
              <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#dfe5ff] transition hover:bg-white/10" onClick={onLogout}>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 text-xs font-bold">{user.username[0].toUpperCase()}</span>
                <span className="hidden sm:inline">{user.username}</span><LogOut size={15} />
              </button>
            </>
          ) : <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#dfe5ff] transition hover:border-cyan-400/40 hover:bg-white/10" onClick={onAuth}>Sign in</button>}
        </nav>
      </header>
      {children}
    </div>
  );
}
