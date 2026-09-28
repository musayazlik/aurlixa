"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { QtyStepper } from "@/components/qty-stepper";
import { useCart } from "@/components/cart-provider";
import { formatGram, formatKarat, formatPrice } from "@/lib/format";

const trustRows = [
  {
    icon: "truck-light",
    title: "Ücretsiz Sigortalı Kargo",
    desc: "1–3 iş günü içinde teslim",
  },
  {
    icon: "lock-simple-light",
    title: "Güvenli Ödeme",
    desc: "3D Secure ile korunan altyapı",
  },
  {
    icon: "seal-check-light",
    title: "Sertifikalı Ürün",
    desc: "Ayar ve gram garantili gönderim",
  },
];

export function CartView() {
  const { products, count, subtotal, hydrated, setQty, remove } = useCart();

  if (!hydrated) {
    return <div className="min-h-[50vh]" aria-hidden />;
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-5 px-5 py-28 text-center md:px-8 lg:px-12">
        <Icon name="handbag-light" size={48} className="text-gold-deep" />
        <p className="font-heading text-3xl">Sepetiniz henüz boş</p>
        <p className="max-w-[44ch] text-[15px] leading-relaxed text-muted-foreground">
          Zamansız parçaları keşfedin; beğendiğiniz takıları sepete ekleyerek
          alışverişe başlayabilirsiniz.
        </p>
        <Button
          render={<Link href="/#kategoriler" />}
          nativeButton={false}
          className="mt-2 h-12 px-10 text-[11px] tracking-[0.24em] uppercase"
        >
          Koleksiyonu Keşfet
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-12 md:px-8 lg:grid-cols-[1fr_400px] lg:gap-20 lg:px-12">
      <div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
          {count} parça ürün
        </p>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {products.map((p) => (
            <li key={p.slug} className="flex gap-5 py-7">
              <Link
                href={`/urun/${p.slug}`}
                className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-secondary sm:w-28"
                aria-label={p.name}
              >
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/urun/${p.slug}`}
                      className="font-heading text-xl leading-snug font-medium transition-colors hover:text-gold-deep sm:text-2xl"
                    >
                      {p.name}
                    </Link>
                    <p className="mt-1.5 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {formatKarat(p.karat)} • {formatGram(p.gram)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Birim: {formatPrice(p.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`${p.name} ürününü kaldır`}
                    onClick={() => remove(p.slug)}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Icon name="x-light" size={18} />
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
                  <QtyStepper
                    value={p.qty}
                    onChange={(next) => setQty(p.slug, next)}
                  />
                  <span className="font-heading text-2xl font-medium">
                    {formatPrice(p.price * p.qty)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="link-underline mt-8 text-foreground"
        >
          Alışverişe Devam Et
          <Icon name="arrow-left-light" size={15} />
        </Link>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-border bg-card p-8">
          <p className="eyebrow">Sipariş Özeti</p>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex items-baseline justify-between">
              <dt className="text-muted-foreground">Ara Toplam</dt>
              <dd className="font-medium">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="text-muted-foreground">Kargo</dt>
              <dd className="font-medium tracking-wide text-gold-deep">
                Ücretsiz
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex items-baseline justify-between border-t border-border pt-6">
            <span className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
              Toplam
            </span>
            <span className="font-heading text-3xl font-medium">
              {formatPrice(subtotal)}
            </span>
          </div>
          <p className="mt-1 text-right text-xs text-muted-foreground">
            KDV dahildir.
          </p>

          <Button
            render={<Link href="/odeme" />}
            nativeButton={false}
            className="mt-6 h-12 w-full bg-espresso text-[11px] font-medium tracking-[0.24em] uppercase text-ivory hover:bg-gold-deep"
          >
            Ödemeye Geç
          </Button>
        </div>

        <ul className="mt-8 grid gap-4 px-1">
          {trustRows.map((row) => (
            <li key={row.title} className="flex items-center gap-4">
              <Icon name={row.icon} size={22} className="text-gold-deep" />
              <p className="text-sm">
                <span className="font-medium">{row.title}</span>
                <span className="text-muted-foreground"> — {row.desc}</span>
              </p>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
