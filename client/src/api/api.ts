import axios, { AxiosError } from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/";

const api = axios.create({
  baseURL: API_BASE,         
  withCredentials: true,      
  headers: { "Content-Type": "application/json" }
});

export const getErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    const msg = (err.response?.data as { message?: string } | undefined)?.message;
    return msg ?? err.message;
  }
  return err instanceof Error ? err.message : "Request failed";
};

export default api;