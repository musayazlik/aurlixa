"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
  }

  return (
    <section className="border-t border-border bg-secondary/45">
      <div className="mx-auto max-w-2xl px-5 py-20 text-center md:px-8 lg:py-24">
        <Reveal className="flex flex-col items-center">
          <p className="eyebrow">Bülten</p>
          <h2 className="mt-3 font-heading text-4xl leading-[1.1] font-medium text-balance md:text-5xl">
            Yeni koleksiyonlardan ve özel fırsatlardan ilk siz haberdar olun
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Ayda yalnızca birkaç e-posta; rahatsız etmeyiz, değer katarız.
          </p>

          {done ? (
            <p className="mt-9 flex items-center gap-3 border border-border bg-background px-6 py-4 text-sm">
              <Icon name="check-light" size={20} className="text-gold-deep" />
              Teşekkürler! Bültene kaydınız alındı.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-9 flex w-full max-w-md items-stretch border border-input bg-background"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                E-posta adresiniz
              </label>
              <Input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                className="h-13 flex-1 rounded-none border-0 bg-transparent px-4 text-sm shadow-none focus-visible:ring-0 dark:bg-transparent"
              />
              <Button
                type="submit"
                className="h-13 rounded-none bg-espresso px-7 text-[11px] font-medium tracking-[0.2em] uppercase text-ivory hover:bg-gold-deep"
              >
                Abone Ol
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            Gizliliğinize saygı duyuyoruz — dilediğiniz zaman tek tıkla
            çıkabilirsiniz.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
