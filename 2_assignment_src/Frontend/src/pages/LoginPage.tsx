import { useState } from "react";
import type { SubmitEvent } from "react";
import TextField from "../components/TextField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    login,
    loading,
    error,
  } = useLogin();

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    await login(email, password);
  }

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={setEmail}
          required
        />

        <PasswordField
          label="Password"
          value={password}
          onChange={setPassword}
          required
        />

        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {error && <p>{error}</p>}
      </form>
    </main>
  );
}
