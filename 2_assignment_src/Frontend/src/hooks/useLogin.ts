import { loginApi } from "../api/authApi.ts";
import { storeJWTToken } from "../services/authService.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await loginApi(email, password);
      const token = (res as any)?.token;
      if (!token) throw new Error("Login failed, no token given.");
      storeJWTToken(token);
      navigate("/databases");
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
    error,
  };
}
