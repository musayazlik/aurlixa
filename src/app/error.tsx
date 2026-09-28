"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center md:px-8">
        <Icon name="warning-light" size={34} className="text-gold-deep" />
        <p className="eyebrow mt-5">Beklenmeyen Hata — 500</p>
        <h1 className="mt-3 font-heading text-4xl leading-[1.08] font-medium md:text-5xl">
          Bir Aksilik Oldu
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Sayfayı görüntülerken teknik bir sorun yaşandı. Çoğu durumda tekrar
          denemek sorunu çözer; sorun sürerse ekibimiz yardımcı olur.
        </p>
        {error.digest ? (
          <p className="mt-3 text-xs tracking-[0.14em] uppercase text-muted-foreground/70">
            Hata kodu: {error.digest}
          </p>
        ) : null}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button
            onClick={reset}
            className="h-12 bg-espresso px-8 text-[11px] font-medium tracking-[0.22em] uppercase text-ivory hover:bg-gold-deep"
          >
            Tekrar Dene
          </Button>
          <Button
            variant="outline"
            render={<Link href="/" />}
            className="h-12 px-8 text-[11px] font-medium tracking-[0.22em] uppercase"
          >
            Anasayfaya Dön
          </Button>
        </div>
        <p className="mt-10 flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
          <Icon name="headset-light" size={15} className="text-gold-deep" />
          +90 (212) 000 00 00 • merhaba@aurlixa.com
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
