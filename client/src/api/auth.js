import axios from "axios";
import { authConfig } from "./client";

export const getCurrentUser = (token) => axios.get("/api/v1/auth/me", authConfig(token));
export const authenticate = (mode, form) => axios.post(`/api/v1/auth/${mode}`, form);

