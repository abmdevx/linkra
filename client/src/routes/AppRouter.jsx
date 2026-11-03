import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import AuthPage from "../pages/AuthPage";
import AuthPrompt from "../pages/AuthPrompt";
import DashboardPage from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
import ResultModal from "../components/ResultModal";
import { useAuth } from "../hooks/useAuth";
import { useLinkra } from "../hooks/useLinkra";
import { useNavigation } from "../hooks/useNavigation";

export default function AppRouter() {
  const { screen, navigate } = useNavigation();
  const {
    user,
    loading: authLoading,
    authenticateUser,
    logout,
  } = useAuth();
  const {
    result,
    setResult,
    links,
    loadLinks,
    loading,
    apiUrl,
    shorten,
    copyLink,
  } = useLinkra();
  const [url, setUrl] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (screen === "dashboard" && user) {
      loadLinks();
    }
  }, [screen, user, loadLinks]);

  const submitAuth = async (event) => {
    event.preventDefault();

    if (await authenticateUser(authMode, authForm)) {
      setAuthForm({ username: "", password: "" });
      navigate("dashboard");
    }
  };

  const openAuth = (mode = "login") => {
    setAuthMode(mode);
    navigate("auth");
  };

  const handleLogout = () => {
    logout();
    navigate("home");
  };

  return (
    <AppLayout
      onHome={() => navigate("home")}
      onAuth={() => openAuth()}
      onDashboard={() => navigate("dashboard")}
      onLogout={handleLogout}
    >
      {screen === "auth" && (
        <AuthPage
          mode={authMode}
          setMode={setAuthMode}
          form={authForm}
          setForm={setAuthForm}
          onSubmit={submitAuth}
          loading={authLoading}
        />
      )}

      {screen === "home" && (
        <HomePage
          user={user}
          url={url}
          setUrl={setUrl}
          onShorten={() => shorten(url)}
          loading={loading}
          onAuth={() => openAuth("register")}
        />
      )}

      {screen === "dashboard" && user && (
        <DashboardPage
          user={user}
          links={links}
          url={url}
          setUrl={setUrl}
          onShorten={() => shorten(url)}
          loading={loading}
          apiUrl={apiUrl}
          onCopy={copyLink}
        />
      )}

      {screen === "dashboard" && !user && (
        <AuthPrompt onAuth={() => openAuth()} />
      )}

      {result && (
        <ResultModal
          result={result}
          apiUrl={apiUrl}
          onClose={() => setResult(null)}
          onCopy={() => copyLink(result.shortUrl)}
        />
      )}
    </AppLayout>
  );
}
