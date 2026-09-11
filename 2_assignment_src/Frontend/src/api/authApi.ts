import { postJSON } from "../services/authService";

export async function loginApi(email: string, password: string) {
  return await postJSON("/auth/login", { email, password });
}
