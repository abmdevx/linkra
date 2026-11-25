import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { LinkraProvider } from "./context/LinkraContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <LinkraProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#18181b",
              color: "#fafafa",
              border: "1px solid #27272a",
              fontSize: "14px",
            },
          }}
        />
        <AppRouter />
      </LinkraProvider>
    </AuthProvider>
  );
}
