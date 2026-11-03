import { useContext } from "react";
import { LinkraContext } from "../context/linkra-context";

export function useLinkra() {
  const context = useContext(LinkraContext);
  if (!context) throw new Error("useLinkra must be used inside LinkraProvider");
  return context;
}
