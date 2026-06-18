import { useState } from "react";
import { Button } from "../Button";
import { ErrorMessage } from "../ErrorMessage";
import { Input } from "../Input";
import { login } from "../../authStore";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSuccess?: () => void;
}

export function LoginForm({ onSwitchToRegister, onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = login({ email, password });

    if (!result.success) {
      setError(result.error ?? "Anmeldung fehlgeschlagen.");
      return;
    }

    setError(null);
    onSuccess?.();
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <Input
        label="E-Mail"
        fieldClassName="auth-form__field"
        labelInSpan
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="dein.name@beispiel.de"
        required
      />

      <Input
        label="Passwort"
        fieldClassName="auth-form__field"
        labelInSpan
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="••••••••"
        required
      />

      {error && <ErrorMessage message={error} className="auth-form__error" />}

      <Button type="submit" className="auth-form__submit">
        Anmelden
      </Button>

      <p className="auth-form__switch">
        Noch kein Konto?{" "}
        <Button type="button" variant="unstyled" className="auth-form__switch-link" onClick={onSwitchToRegister}>
          Jetzt registrieren
        </Button>
      </p>
    </form>
  );
}
