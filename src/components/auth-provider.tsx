"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { authClient } from "@/lib/auth-client";

export type User = { name: string; email: string; since: string };

type AuthResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  /** undefined = hidrasyon sürüyor, null = giriş yapılmamış */
  user: User | null | undefined;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (name: string, email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/** Mock auth döneminin kalıntıları — ilk yüklemede temizlenir. */
const LEGACY_KEYS = ["aurlixa-user", "aurlixa-users"];

/** better-auth hata kodlarını Türkçe kullanıcı mesajlarına çevirir. */
function toAuthError(error: { code?: string; message?: string } | null): string {
  switch (error?.code) {
    case "INVALID_EMAIL_OR_PASSWORD":
      return "E-posta veya şifre hatalı. Lütfen tekrar deneyin.";
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_SOCIAL":
      return "Bu e-posta adresi zaten kayıtlı. Giriş yapmayı deneyin.";
    case "EMAIL_NOT_VERIFIED":
      return "E-posta adresiniz doğrulanmamış. Giriş denemeniz üzerine doğrulama bağlantısını yeniden gönderdik; gelen kutunuzu kontrol edin.";
    case "USER_NOT_FOUND":
      return "Bu e-posta ile kayıtlı bir hesap bulunamadı.";
    default:
      return (
        error?.message ??
        "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin."
      );
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  // Eski localStorage tabanlı mock auth kalıntılarını kaldır
  useEffect(() => {
    for (const key of LEGACY_KEYS) window.localStorage.removeItem(key);
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const dbUser = session?.user;
    const user: User | null = dbUser
      ? {
          name: dbUser.name,
          email: dbUser.email,
          since: new Date(dbUser.createdAt).toISOString(),
        }
      : null;

    return {
      user: isPending ? undefined : user,
      login: async (email, password) => {
        const { error } = await authClient.signIn.email({
          email: email.trim().toLowerCase(),
          password,
        });
        return error ? { ok: false, error: toAuthError(error) } : { ok: true };
      },
      register: async (name, email, password) => {
        const { error } = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          callbackURL: "/dogrulandi",
        });
        return error ? { ok: false, error: toAuthError(error) } : { ok: true };
      },
      logout: async () => {
        await authClient.signOut();
      },
    };
  }, [session, isPending]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth, AuthProvider içinde kullanılmalı");
  return ctx;
}
