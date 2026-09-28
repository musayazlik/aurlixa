"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/icon";
import { useAuth } from "@/components/auth-provider";

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unverified, setUnverified] = useState(false);
  const [busy, setBusy] = useState(false);

  // Zaten giriş yapıldıysa hesap sayfasına al
  useEffect(() => {
    if (user) router.replace(next || "/hesap");
  }, [user, next, router]);

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setError(null);
    setUnverified(false);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }
    if (password.length === 0) {
      setError("Şifrenizi girin.");
      return;
    }
    setBusy(true);
    const result = await login(email, password);
    if (result.ok) {
      router.push(next || "/hesap");
    } else {
      setError(result.error);
      setUnverified(result.error.includes("doğrulanmamış"));
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="eyebrow">Aurlixa Hesabı</p>
      <h1 className="mt-3 font-heading text-4xl leading-[1.08] font-medium">
        Giriş Yap
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Siparişlerinizi takip edin, favorilerinizi kaydedin ve ödemeyi
        hızlandırın.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-5">
        {error && (
          <p
            role="alert"
            className={
              unverified
                ? "flex items-start gap-2.5 border border-gold-deep/40 bg-gold/10 px-4 py-3 text-sm text-gold-deep"
                : "flex items-start gap-2.5 border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            }
          >
            <Icon
              name={unverified ? "envelope-simple-light" : "warning-circle-light"}
              size={18}
              className="mt-0.5 shrink-0"
            />
            {error}
          </p>
        )}

        <Field>
          <FieldLabel className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            E-posta
          </FieldLabel>
          <Input
            type="email"
            autoComplete="email"
            placeholder="ornek@aurlixa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 bg-background px-3.5"
          />
        </Field>

        <Field>
          <FieldLabel className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Şifre
          </FieldLabel>
          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 bg-background px-3.5 pr-11"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Şifreyi gizle" : "Şifreyi göster"}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon name={show ? "eye-slash-light" : "eye-light"} size={18} />
            </button>
          </div>
        </Field>

        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="size-4 accent-espresso"
            />
            Beni hatırla
          </label>
          <Link
            href="/sifremi-unuttum"
            className="text-sm text-muted-foreground underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold-deep"
          >
            Şifremi unuttum
          </Link>
        </div>

        <Button
          type="submit"
          disabled={busy}
          className="h-12 bg-espresso text-[11px] font-medium tracking-[0.24em] uppercase text-ivory hover:bg-gold-deep"
        >
          {busy ? "Giriş yapılıyor…" : "Giriş Yap"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Hesabınız yok mu?{" "}
        <Link
          href="/kayit"
          className="font-medium text-foreground underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold-deep"
        >
          Üye Olun
        </Link>
      </p>

      <p className="mt-10 border-t border-border pt-5 text-center text-xs text-muted-foreground">
        Bu bir demo mağazadır; ödeme adımı simülasyondur.
      </p>
    </div>
  );
}
