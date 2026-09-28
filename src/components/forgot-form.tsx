"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/icon";
import { authClient } from "@/lib/auth-client";

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }
    setBusy(true);
    const { error: authError } = await authClient.requestPasswordReset({
      email: email.trim().toLowerCase(),
      redirectTo: `${window.location.origin}/sifre-sifirla`,
    });
    // E-posta listelemesini önlemek için better-auth bilinmeyen adreslerde de
    // başarı döner; herhangi bir hata ise genel mesajla gösterilir.
    if (authError) {
      setError(authError.message ?? "Bir hata oluştu. Lütfen tekrar deneyin.");
      setBusy(false);
      return;
    }
    setBusy(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
          <Icon
            name="arrow-u-up-left-light"
            size={26}
            className="text-gold-deep"
          />
        </span>
        <h1 className="mt-6 font-heading text-3xl leading-[1.12] font-medium">
          E-posta Gönderildi
        </h1>
        <p className="mx-auto mt-4 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
          Şifre sıfırlama bağlantısını{" "}
          <span className="font-medium text-foreground">{email}</span> adresine
          gönderdik. Gelen kutunuzu kontrol edin; birkaç dakika içinde
          ulaşmazsa spam klasörüne göz atın.
        </p>
        <div className="mt-8 grid gap-2">
          <Button
            render={<Link href="/giris" />}
            nativeButton={false}
            className="h-12 text-[11px] tracking-[0.22em] uppercase"
          >
            Girişe Dön
          </Button>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="text-sm text-muted-foreground underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold-deep"
          >
            Farklı bir e-posta dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow">Aurlixa Hesabı</p>
      <h1 className="mt-3 font-heading text-4xl leading-[1.08] font-medium">
        Şifremi Unuttum
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Üye olduğunuz e-posta adresini girin; şifrenizi sıfırlamak için
        bağlantı gönderelim.
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

        <Field>
          <FieldLabel className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            E-posta
          </FieldLabel>
          <Input
            type="email"
            autoComplete="email"
            placeholder="ornek@aurlixa.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            className="h-11 bg-background px-3.5"
          />
        </Field>

        <Button
          type="submit"
          disabled={busy}
          className="h-12 bg-espresso text-[11px] font-medium tracking-[0.24em] uppercase text-ivory hover:bg-gold-deep"
        >
          {busy ? "Gönderiliyor…" : "Sıfırlama Bağlantısı Gönder"}
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
