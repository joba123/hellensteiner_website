import { useState } from "react";
import { Button } from "./Button";
import { ErrorMessage } from "./ErrorMessage";
import { register } from "../authStore";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSuccess?: () => void;
}

export function RegisterForm({ onSwitchToLogin, onSuccess }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    const result = register({ name, email, password });

    if (!result.success) {
      setError(result.error ?? "Registrierung fehlgeschlagen.");
      return;
    }

    setError(null);
    onSuccess?.();
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <label className="auth-form__field">
        <span>Name</span>
        <input
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Vor- und Nachname"
          required
        />
      </label>

      <label className="auth-form__field">
        <span>E-Mail</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="dein.name@beispiel.de"
          required
        />
      </label>

      <label className="auth-form__field">
        <span>Passwort</span>
        <input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Mindestens 6 Zeichen"
          required
        />
      </label>

      <label className="auth-form__field">
        <span>Passwort bestätigen</span>
        <input
          type="password"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
          placeholder="Passwort wiederholen"
          required
        />
      </label>

      {error && <ErrorMessage message={error} className="auth-form__error" />}

      <Button type="submit" className="auth-form__submit">
        Konto erstellen
      </Button>

      <p className="auth-form__switch">
        Bereits registriert?{" "}
        <Button type="button" variant="unstyled" className="auth-form__switch-link" onClick={onSwitchToLogin}>
          Zur Anmeldung
        </Button>
      </p>
    </form>
  );
}
