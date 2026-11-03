import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { createShortLink, getMyLinks } from "../api/links";
import { getApiUrl } from "../api/client";
import { useAuth } from "../hooks/useAuth";
import { LinkraContext } from "./linkra-context";

export function LinkraProvider({ children }) {
  const { token } = useAuth();
  const [links, setLinks] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = getApiUrl();

  const loadLinks = useCallback(async () => {
    if (!token) return;
    try {
      const { data } = await getMyLinks(token);
      setLinks(data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load your links.");
    }
  }, [token]);

  const shorten = useCallback(async (url) => {
    if (!url.trim()) {
      toast.error("Paste a URL to create your short link.");
      return false;
    }
    setLoading(true);
    try {
      const { data } = await createShortLink(url.trim(), token);
      setResult(data.data);
      if (token) setLinks((current) => [data.data, ...current]);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "We couldn't shorten that URL.");
      return false;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const copyLink = useCallback(async (shortUrl) => {
    try {
      await navigator.clipboard.writeText(`${apiUrl}/u/${shortUrl}`);
      toast.success("Copied to clipboard.");
    } catch {
      toast.error("Copy failed. Please copy the link manually.");
    }
  }, [apiUrl]);

  const value = useMemo(() => ({
    apiUrl,
    token,
    links,
    result,
    loading,
    setResult,
    loadLinks,
    shorten,
    copyLink,
  }), [apiUrl, token, links, result, loading, loadLinks, shorten, copyLink]);

  return <LinkraContext.Provider value={value}>{children}</LinkraContext.Provider>;
}
