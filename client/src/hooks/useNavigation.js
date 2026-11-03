import { useCallback, useEffect, useState } from "react";

function screenFromPath(pathname) {
  if (pathname === "/dashboard") return "dashboard";
  if (pathname === "/auth") return "auth";
  return "home";
}

export function useNavigation() {
  const [screen, setScreen] = useState(() => screenFromPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setScreen(screenFromPath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((nextScreen) => {
    const paths = { home: "/", auth: "/auth", dashboard: "/dashboard" };
    window.history.pushState({}, "", paths[nextScreen]);
    setScreen(nextScreen);
  }, []);

  return { screen, navigate };
}

