"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@/components/icon";
import { useCart } from "@/components/cart-provider";
import { useAuth } from "@/components/auth-provider";
import { QtyStepper } from "@/components/qty-stepper";
import { navLinks } from "@/lib/data";
import { formatGram, formatKarat, formatPrice } from "@/lib/format";

function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 text-foreground ${className ?? ""}`}
      aria-label="Aurlixa anasayfa"
    >
      <Icon name="diamonds-four-light" size={14} className="text-gold-deep" />
      <span
        className="font-heading text-[26px] leading-none font-medium tracking-[0.42em]"
        style={{ marginRight: "-0.42em" }}
      >
        AURLIXA
      </span>
    </Link>
  );
}

function CartSheet() {
  const { products, count, subtotal, isOpen, setOpen, setQty, remove } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setOpen(open)}>
      <SheetContent
        side="right"
        className="w-full gap-0 bg-background sm:max-w-md"
        showCloseButton={false}
      >
        <SheetHeader className="flex-row items-center justify-between border-b border-border py-5 pr-14">
          <div>
            <SheetTitle className="font-heading text-2xl font-medium">
              Sepetiniz
            </SheetTitle>
            <SheetDescription className="text-[11px] tracking-[0.2em] uppercase">
              {count > 0 ? `${count} parça ürün` : "Henüz ürün yok"}
            </SheetDescription>
          </div>
        </SheetHeader>

        {products.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <Icon name="handbag-light" size={44} className="text-gold-deep" />
            <p className="font-heading text-2xl">Sepetiniz henüz boş</p>
            <p className="max-w-[26ch] text-sm text-muted-foreground">
              Zamansız parçaları keşfedin ve favorilerinizi sepete ekleyin.
            </p>
            <Button
              render={<Link href="/#kategoriler" />}
              nativeButton={false}
              onClick={() => setOpen(false)}
              className="h-12 px-8 text-[11px] tracking-[0.22em] uppercase"
            >
              Koleksiyonu Keşfet
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-4">
              {products.map((p) => (
                <li key={p.slug} className="flex gap-4 py-5">
                  <Link
                    href={`/urun/${p.slug}`}
                    onClick={() => setOpen(false)}
                    className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-secondary"
                  >
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/urun/${p.slug}`}
                        onClick={() => setOpen(false)}
                        className="font-heading text-lg leading-snug hover:text-gold-deep"
                      >
                        {p.name}
                      </Link>
                      <button
                        type="button"
                        aria-label={`${p.name} ürününü kaldır`}
                        onClick={() => remove(p.slug)}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Icon name="x-light" size={16} />
                      </button>
                    </div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {formatKarat(p.karat)} • {formatGram(p.gram)}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QtyStepper
                        value={p.qty}
                        onChange={(next) => setQty(p.slug, next)}
                        className="h-9"
                      />
                      <span className="text-sm font-medium">
                        {formatPrice(p.price * p.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-4 py-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
                  Ara Toplam
                </span>
                <span className="font-heading text-2xl font-medium">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Kargo ve ödeme seçenekleri bir sonraki adımda hesaplanır.
              </p>
              <div className="mt-4 grid gap-2">
                <Button
                render={<Link href="/odeme" />}
                nativeButton={false}
                onClick={() => setOpen(false)}
                className="h-12 text-[11px] tracking-[0.22em] uppercase"
              >
                Ödemeye Geç
              </Button>
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="h-11 text-[11px] tracking-[0.22em] uppercase"
                >
                  Alışverişe Devam Et
                </Button>
              </div>
              <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                <Icon name="lock-simple-light" size={14} className="text-gold-deep" />
                256-bit SSL ile güvenli ödeme
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <p className="flex h-(--announcement-h) items-center justify-center bg-espresso text-center text-[10px] font-light tracking-[0.28em] uppercase text-ivory/80">
        Tüm siparişlerde ücretsiz sigortalı kargo • 30 gün kolay iade
      </p>

      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto grid h-(--header-h) max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-8 lg:h-(--header-h-lg) lg:px-12">
          {/* Masaüstü sol menü */}
          <nav
            aria-label="Ana menü"
            className="hidden gap-5 text-[11px] font-medium tracking-[0.18em] uppercase lg:flex xl:gap-7 xl:tracking-[0.2em]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-foreground/80 transition-colors hover:text-gold-deep"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobil menü */}
          <div className="flex items-center lg:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                aria-label="Menüyü aç"
                className="flex h-10 w-10 items-center justify-center"
              >
                <Icon name="list-light" size={22} />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full gap-0 bg-background sm:max-w-sm"
                showCloseButton={false}
              >
                <SheetHeader className="border-b border-border py-5 pr-14">
                  <SheetTitle className="sr-only">Menü</SheetTitle>
                  <Wordmark />
                </SheetHeader>
                <nav aria-label="Mobil menü" className="flex flex-col px-6 py-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="border-b border-border py-4 font-heading text-2xl font-medium transition-colors hover:text-gold-deep"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto px-6 pb-8">
                  <Separator className="mb-5" />
                  <p className="text-[11px] leading-relaxed tracking-[0.18em] uppercase text-muted-foreground">
                    Sertifikalı Altın • Güvenli Ödeme • Sigortalı Kargo
                  </p>
                  <a
                    href="tel:+902120000000"
                    className="mt-3 block text-sm text-foreground"
                  >
                    +90 (212) 000 00 00
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Wordmark />

          {/* Sağ ikonlar */}
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Ara"
              className="hidden h-10 w-10 items-center justify-center text-foreground/80 transition-colors hover:text-gold-deep sm:flex"
            >
              <Icon name="magnifying-glass-light" size={21} />
            </button>
            <Link
              href={user ? "/hesap" : "/giris"}
              aria-label={user ? "Hesabım" : "Giriş yap"}
              className="relative flex h-10 w-10 items-center justify-center text-foreground/80 transition-colors hover:text-gold-deep"
            >
              <Icon name="user-light" size={21} />
              {user && (
                <span
                  aria-hidden
                  className="absolute top-1 right-1 size-1.5 rounded-full bg-gold-deep"
                />
              )}
            </Link>
            <button
              type="button"
              aria-label={`Sepeti aç, ${count} ürün`}
              onClick={() => setOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center text-foreground/80 transition-colors hover:text-gold-deep"
            >
              <Icon name="handbag-light" size={21} />
              {count > 0 && (
                <span className="absolute top-0.5 right-0.5 flex size-4 items-center justify-center bg-gold-deep text-[9px] font-medium text-ivory">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartSheet />
    </>
  );
}
