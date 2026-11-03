export const tokenKey = "linkra_token";

export function authConfig(token) {
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

export function getApiUrl() {
  return import.meta.env.VITE_BACKEND_END_ORIGIN || window.location.origin;
}
