import { LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function AppLayout({ children, onHome, onAuth, onDashboard, onLogout }) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <button
            className="flex items-center gap-2.5 text-lg font-semibold tracking-tight"
            onClick={onHome}
            aria-label="Linkra home"
          >
            <img className="h-8 w-8" src="/linkra.svg" alt="" />
            <span>
              linkra<span className="text-accent">.</span>
            </span>
          </button>

          <nav className="flex items-center gap-2">
            {user ? (
              <>
                <button className="btn btn-sm btn-ghost" onClick={onDashboard}>
                  <LayoutDashboard size={15} />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={onLogout}
                  aria-label="Log out"
                  title="Log out"
                >
                  <LogOut size={15} />
                </button>
              </>
            ) : (
              <button className="btn btn-sm btn-primary" onClick={onAuth}>
                Sign in
              </button>
            )}
          </nav>
        </div>
      </header>

      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
