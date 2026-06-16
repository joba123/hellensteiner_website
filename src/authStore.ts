import { useSyncExternalStore } from "react";

const AUTH_STORAGE_KEY = "hellensteiner-auth";

// Hinweis: Dies ist eine reine Demo-/Mock-Authentifizierung fuer ein
// studentisches Projekt. Passwoerter werden im Klartext im localStorage
// abgelegt und sind NICHT fuer den Produktiveinsatz geeignet.

export interface User {
  name: string;
  email: string;
  password: string;
}

export type PublicUser = Omit<User, "password">;

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthState {
  users: User[];
  currentUserEmail: string | null;
}

const TEST_USER: User = {
  name: "Max Mustermann",
  email: "test@hellensteiner.de",
  password: "test1234"
};

const listeners = new Set<() => void>();
let authState: AuthState = readAuthState();

function seedState(): AuthState {
  return { users: [TEST_USER], currentUserEmail: null };
}

function readAuthState(): AuthState {
  if (typeof window === "undefined") {
    return seedState();
  }

  try {
    const storedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedAuth) {
      const seededState = seedState();
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(seededState));
      return seededState;
    }

    const parsedAuth = JSON.parse(storedAuth) as AuthState;

    if (!Array.isArray(parsedAuth.users)) {
      return seedState();
    }

    const sanitizedUsers = parsedAuth.users.filter(
      (user) => user && typeof user.email === "string" && typeof user.password === "string"
    );

    // Test-User immer verfuegbar halten.
    const hasTestUser = sanitizedUsers.some((user) => user.email === TEST_USER.email);
    const users = hasTestUser ? sanitizedUsers : [TEST_USER, ...sanitizedUsers];

    const currentUserEmail =
      typeof parsedAuth.currentUserEmail === "string" &&
      users.some((user) => user.email === parsedAuth.currentUserEmail)
        ? parsedAuth.currentUserEmail
        : null;

    return { users, currentUserEmail };
  } catch {
    return seedState();
  }
}

function writeAuthState(nextState: AuthState) {
  authState = nextState;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextState));
  }

  listeners.forEach((listener) => listener());
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function subscribeToAuth(listener: () => void): () => void {
  listeners.add(listener);

  function handleExternalAuthChange() {
    authState = readAuthState();
    listener();
  }

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleExternalAuthChange);
  }

  return () => {
    listeners.delete(listener);

    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleExternalAuthChange);
    }
  };
}

export function getAuthSnapshot(): AuthState {
  return authState;
}

function getCurrentUser(state: AuthState): PublicUser | null {
  if (!state.currentUserEmail) {
    return null;
  }

  const user = state.users.find((entry) => entry.email === state.currentUserEmail);

  if (!user) {
    return null;
  }

  return { name: user.name, email: user.email };
}

export function useAuth(): { currentUser: PublicUser | null } {
  const state = useSyncExternalStore(subscribeToAuth, getAuthSnapshot, getAuthSnapshot);

  return { currentUser: getCurrentUser(state) };
}

export function login({ email, password }: LoginInput): AuthResult {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    return { success: false, error: "Bitte E-Mail und Passwort eingeben." };
  }

  const user = authState.users.find((entry) => entry.email === normalizedEmail);

  if (!user || user.password !== password) {
    return { success: false, error: "E-Mail oder Passwort ist nicht korrekt." };
  }

  writeAuthState({ ...authState, currentUserEmail: user.email });

  return { success: true };
}

export function register({ name, email, password }: RegisterInput): AuthResult {
  const trimmedName = name.trim();
  const normalizedEmail = normalizeEmail(email);

  if (!trimmedName) {
    return { success: false, error: "Bitte gib deinen Namen ein." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { success: false, error: "Bitte gib eine gueltige E-Mail-Adresse ein." };
  }

  if (password.length < 6) {
    return { success: false, error: "Das Passwort muss mindestens 6 Zeichen lang sein." };
  }

  if (authState.users.some((entry) => entry.email === normalizedEmail)) {
    return { success: false, error: "Fuer diese E-Mail existiert bereits ein Konto." };
  }

  const newUser: User = { name: trimmedName, email: normalizedEmail, password };

  writeAuthState({
    users: [...authState.users, newUser],
    currentUserEmail: newUser.email
  });

  return { success: true };
}

export function logout() {
  writeAuthState({ ...authState, currentUserEmail: null });
}

export function getUserInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
