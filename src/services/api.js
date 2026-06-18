import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: `${API_URL}/api`
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jd2_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function assetUrl(url) {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("/images")) return url;
  return `${API_URL}${url}`;
}
