const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export const api = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    credentials: "include", // REQUIRED for cookie auth
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message ?? "Request failed");
  }

  return data as T;
};