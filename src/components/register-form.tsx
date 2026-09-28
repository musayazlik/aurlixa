"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/icon";
import { useAuth } from "@/components/auth-provider";

export function RegisterForm() {
  const router = useRouter();
  const { user, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [awaitingVerification, setAwaitingVerification] = useState(false);

  useEffect(() => {
    if (user) router.replace("/hesap");
  }, [user, router]);

  function clearError(key: string) {
    setFieldErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setError(null);

    const errors: Record<string, string> = {};
    if (name.trim().length < 3) errors.name = "Adınızı ve soyadınızı girin.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errors.email = "Geçerli bir e-posta adresi girin.";
    if (password.length < 6)
      errors.password = "Şifreniz en az 6 karakter olmalı.";
    if (confirm !== password)
      errors.confirm = "Şifreler birbiriyle eşleşmiyor.";
    if (!consent)
      errors.consent =
        "Üye olmak için KVKK aydınlatma metnini ve mesafeli satış sözleşmesini onaylamanız gerekir.";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setBusy(true);
    const result = await register(name, email, password);
    if (result.ok) {
      // Doğrulama e-postası gönderildi; giriş, doğrulamadan sonra otomatik
      setAwaitingVerification(true);
      setBusy(false);
    } else {
      setError(result.error);
      setBusy(false);
    }
  }

  if (awaitingVerification) {
    return (
      <div className="text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
          <Icon name="envelope-simple-light" size={26} className="text-gold-deep" />
        </span>
        <h1 className="mt-6 font-heading text-3xl leading-[1.12] font-medium">
          E-postanızı Doğrulayın
        </h1>
        <p className="mx-auto mt-4 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
          Hesabınız oluşturuldu. Doğrulama bağlantısını{" "}
          <span className="font-medium text-foreground">{email.trim()}</span>{" "}
          adresine gönderdik. Bağlantıya tıklayınca giriş yapmış olarak hesabınıza
          yönlendirileceksiniz.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          E-posta ulaşmadıysa spam klasörünü kontrol edin.
        </p>
        <div className="mt-8 grid gap-2">
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            variant="outline"
            className="h-12 text-[11px] tracking-[0.22em] uppercase"
          >
            Alışverişe Devam Et
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow">Aurlixa Hesabı</p>
      <h1 className="mt-3 font-heading text-4xl leading-[1.08] font-medium">
        Üye Ol
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        30 saniyede üye olun; sipariş geçmişinizi ve favorilerinizi tek
        hesapta toplayın.
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

        <Field data-invalid={fieldErrors.name ? true : undefined}>
          <FieldLabel className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Ad Soyad
          </FieldLabel>
          <Input
            autoComplete="name"
            placeholder="Ayşe Yılmaz"
            value={name}
            aria-invalid={fieldErrors.name ? true : undefined}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            className="h-11 bg-background px-3.5"
          />
          {fieldErrors.name && (
            <FieldError className="text-xs">{fieldErrors.name}</FieldError>
          )}
        </Field>

        <Field data-invalid={fieldErrors.email ? true : undefined}>
          <FieldLabel className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            E-posta
          </FieldLabel>
          <Input
            type="email"
            autoComplete="email"
            placeholder="ornek@aurlixa.com"
            value={email}
            aria-invalid={fieldErrors.email ? true : undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
            className="h-11 bg-background px-3.5"
          />
          {fieldErrors.email && (
            <FieldError className="text-xs">{fieldErrors.email}</FieldError>
          )}
        </Field>

        <Field data-invalid={fieldErrors.password ? true : undefined}>
          <FieldLabel className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Şifre
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
                clearError("password");
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
              clearError("confirm");
            }}
            className="h-11 bg-background px-3.5"
          />
          {fieldErrors.confirm && (
            <FieldError className="text-xs">{fieldErrors.confirm}</FieldError>
          )}
        </Field>

        <div className={fieldErrors.consent ? "text-destructive" : ""}>
          <label className="flex cursor-pointer gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              checked={consent}
              aria-invalid={fieldErrors.consent ? true : undefined}
              onChange={(e) => {
                setConsent(e.target.checked);
                clearError("consent");
              }}
              className="mt-0.5 size-4 shrink-0 accent-espresso"
            />
            <span>
              <Link
                href="/kvkk"
                className="underline decoration-gold/60 underline-offset-4 hover:text-gold-deep"
              >
                KVKK aydınlatma metnini
              </Link>{" "}
              ve{" "}
              <Link
                href="/mesafeli-satis"
                className="underline decoration-gold/60 underline-offset-4 hover:text-gold-deep"
              >
                mesafeli satış sözleşmesini
              </Link>{" "}
              okudum; kabul ediyorum.
              <span aria-hidden className="text-gold-deep">
                {" "}
                *
              </span>
            </span>
          </label>
          {fieldErrors.consent && (
            <p role="alert" className="mt-2 text-xs">
              {fieldErrors.consent}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={busy}
          className="h-12 bg-espresso text-[11px] font-medium tracking-[0.24em] uppercase text-ivory hover:bg-gold-deep"
        >
          {busy ? "Hesap oluşturuluyor…" : "Üye Ol"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Zaten üye misiniz?{" "}
        <Link
          href="/giris"
          className="font-medium text-foreground underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold-deep"
        >
          Giriş Yapın
        </Link>
      </p>
    </div>
  );
}
