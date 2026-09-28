"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { useAuth } from "@/components/auth-provider";

/**
 * E-posta doğrulama bağlantısının callback hedefi.
 * autoSignInAfterVerification sayesinde oturum bu sayfaya gelmeden kurulur;
 * kullanıcı kısa bir karşılamadan sonra hesabına yönlendirilir.
 */
export function VerifySuccess() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const t = setTimeout(() => router.replace("/hesap"), 1600);
      return () => clearTimeout(t);
    }
  }, [user, router]);

  return (
    <div className="text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
        <Icon name="check-light" size={26} className="text-gold-deep" />
      </span>
      <h1 className="mt-6 font-heading text-3xl leading-[1.12] font-medium">
        E-postanız Doğrulandı
      </h1>
      <p className="mx-auto mt-4 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
        Aurlixa hesabınız aktif. Keyifli alışverişler dileriz.
      </p>
      <div className="mt-8 grid gap-2">
        <Button
          render={<Link href="/hesap" />}
          nativeButton={false}
          className="h-12 text-[11px] tracking-[0.22em] uppercase"
        >
          Hesabıma Git
        </Button>
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
