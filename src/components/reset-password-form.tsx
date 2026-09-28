"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/icon";
import { authClient } from "@/lib/auth-client";

export function ResetPasswordForm({ token }: { token?: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const missingToken = !token;

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setError(null);

    const errors: Record<string, string> = {};
    if (password.length < 6)
      errors.password = "Şifreniz en az 6 karakter olmalı.";
    if (confirm !== password)
      errors.confirm = "Şifreler birbiriyle eşleşmiyor.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setBusy(true);
    const { error: authError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });
    if (authError) {
      setError(
        authError.code === "INVALID_TOKEN"
          ? "Bu sıfırlama bağlantısı geçersiz veya süresi dolmuş. Yeni bir bağlantı talep edin."
          : (authError.message ?? "Bir hata oluştu. Lütfen tekrar deneyin.")
      );
      setBusy(false);
      return;
    }
    setBusy(false);
    setDone(true);
    router.refresh();
  }

  if (missingToken) {
    return (
      <div className="text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
          <Icon name="link-break-light" size={26} className="text-gold-deep" />
        </span>
        <h1 className="mt-6 font-heading text-3xl leading-[1.12] font-medium">
          Bağlantı Geçersiz
        </h1>
        <p className="mx-auto mt-4 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
          Şifre sıfırlama bağlantısı eksik görünüyor. Lütfen e-postanızdaki
          bağlantıyı tam olarak kullanın veya yeni bir sıfırlama talebi
          oluşturun.
        </p>
        <div className="mt-8 grid gap-2">
          <Button
            render={<Link href="/sifremi-unuttum" />}
            nativeButton={false}
            className="h-12 text-[11px] tracking-[0.22em] uppercase"
          >
            Yeni Bağlantı Talep Et
          </Button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
          <Icon name="check-light" size={26} className="text-gold-deep" />
        </span>
        <h1 className="mt-6 font-heading text-3xl leading-[1.12] font-medium">
          Şifreniz Güncellendi
        </h1>
        <p className="mx-auto mt-4 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
          Artık yeni şifrenizle giriş yapabilirsiniz.
        </p>
        <div className="mt-8 grid gap-2">
          <Button
            render={<Link href="/giris" />}
            nativeButton={false}
            className="h-12 text-[11px] tracking-[0.22em] uppercase"
          >
            Giriş Yap
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow">Aurlixa Hesabı</p>
      <h1 className="mt-3 font-heading text-4xl leading-[1.08] font-medium">
        Yeni Şifre Belirle
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Hesabınız için yeni bir şifre oluşturun.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-5">
        {error && (
          <p
            role="alert"
            className="flex items-start gap-2.5 border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            <Icon
              name="warning-circle-light"
              size={18}
              className="mt-0.5 shrink-0"
            />
            {error}
          </p>
        )}

        <Field data-invalid={fieldErrors.password ? true : undefined}>
          <FieldLabel className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Yeni Şifre
          </FieldLabel>
          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              autoComplete="new-password"
              placeholder="En az 6 karakter"
              value={password}
              aria-invalid={fieldErrors.password ? true : undefined}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((fe) => {
                  if (!fe.password) return fe;
                  const next = { ...fe };
                  delete next.password;
                  return next;
                });
              }}
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
          {fieldErrors.password && (
            <FieldError className="text-xs">{fieldErrors.password}</FieldError>
          )}
        </Field>

        <Field data-invalid={fieldErrors.confirm ? true : undefined}>
          <FieldLabel className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Şifre Tekrar
          </FieldLabel>
          <Input
            type={show ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Şifrenizi tekrar girin"
            value={confirm}
            aria-invalid={fieldErrors.confirm ? true : undefined}
            onChange={(e) => {
              setConfirm(e.target.value);
              setFieldErrors((fe) => {
                if (!fe.confirm) return fe;
                const next = { ...fe };
                delete next.confirm;
                return next;
              });
            }}
            className="h-11 bg-background px-3.5"
          />
          {fieldErrors.confirm && (
            <FieldError className="text-xs">{fieldErrors.confirm}</FieldError>
          )}
        </Field>

        <Button
          type="submit"
          disabled={busy}
          className="h-12 bg-espresso text-[11px] font-medium tracking-[0.24em] uppercase text-ivory hover:bg-gold-deep"
        >
          {busy ? "Güncelleniyor…" : "Şifremi Güncelle"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link
          href="/giris"
          className="inline-flex items-center gap-1.5 font-medium text-foreground underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold-deep"
        >
          <Icon name="arrow-left-light" size={14} />
          Girişe dön
        </Link>
      </p>
    </div>
  );
}
