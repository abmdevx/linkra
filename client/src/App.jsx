import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { LinkraProvider } from "./context/LinkraContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <LinkraProvider>
        <Toaster position="top-center" toastOptions={{ className: "!bg-[#202442] !text-white" }} />
        <AppRouter />
      </LinkraProvider>
    </AuthProvider>
  );
}
