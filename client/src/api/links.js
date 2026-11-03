import axios from "axios";
import { authConfig } from "./client";

export const createShortLink = (url, token) => axios.post(
  "/api/v1/short/receive-url",
  { url },
  authConfig(token),
);

export const getMyLinks = (token) => axios.get("/api/v1/short/my-links", authConfig(token));

