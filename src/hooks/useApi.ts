import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { apiFetch, ApiError, downloadBlob } from "../lib/api";

export function useApi() {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const token = await getToken();
    return apiFetch<T>(path, {
      method,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }, token);
  }

  async function download(path: string, filename: string) {
    const token = await getToken();
    if (!token) throw new Error("Not authenticated");
    return downloadBlob(path, filename, token);
  }

  function handleError(err: unknown) {
    if (err instanceof ApiError) {
      if (err.status === 401) { navigate("/sign-in"); return; }
      if (err.status === 403) { navigate("/onboard"); return; }
      if (err.status === 429) { toast.error("Too many requests — slow down."); return; }
      if (err.status === 404) { toast.error("Not found."); return; }
      if (err.status === 400) { toast.error(err.message || "Invalid request."); return; }
    }
    toast.error("Something went wrong on our end.");
  }

  return {
    get: <T>(path: string) => request<T>("GET", path),
    post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
    patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
    del: <T>(path: string) => request<T>("DELETE", path),
    download,
    handleError,
  };
}
