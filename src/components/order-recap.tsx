"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@/components/icon";
import { formatPrice } from "@/lib/format";
import {
  formatDeliveryEstimate,
  useLastOrder,
  type PaymentMethodId,
} from "@/lib/order";

const PAYMENT_ICONS: Record<PaymentMethodId, string> = {
  card: "credit-card-light",
  transfer: "bank-light",
  cod: "package-light",
};

function formatOrderDate(iso: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function OrderRecap() {
  const order = useLastOrder();

  if (order === undefined) return <div className="min-h-[50vh]" aria-hidden />;

  if (!order) {
    return (
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-5 px-5 py-28 text-center md:px-8 lg:px-12">
        <Icon name="receipt-light" size={48} className="text-gold-deep" />
        <p className="font-heading text-3xl">Sipariş kaydı bulunamadı</p>
        <p className="max-w-[44ch] text-[15px] leading-relaxed text-muted-foreground">
          Bu sayfayı doğrudan açtıysanız gösterilecek bir sipariş yok olabilir.
        </p>
        <Button
          render={<Link href="/" />}
          nativeButton={false}
          className="mt-2 h-12 px-10 text-[11px] tracking-[0.24em] uppercase"
        >
          Anasayfaya Dön
        </Button>
      </div>
    );
  }

  const firstName = order.name.split(" ")[0];

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 lg:px-12">
      <div className="flex flex-col items-center text-center">
        <span className="flex size-16 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
          <Icon name="check-light" size={30} className="text-gold-deep" />
        </span>
        <p className="eyebrow mt-6">Siparişiniz Alındı</p>
        <h1 className="mt-3 font-heading text-4xl leading-[1.08] font-medium md:text-5xl">
          Teşekkürler, {firstName}.
        </h1>
        <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
          Siparişiniz atölyemizde özenle hazırlanıyor. Sipariş onayı ve kargo
          takip bilgileri{" "}
          <span className="font-medium text-foreground">{order.email}</span>{" "}
          adresine gönderildi.
        </p>
        <p className="mt-6 inline-flex items-baseline gap-3 border border-border bg-card px-6 py-3">
          <span className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
            Sipariş No
          </span>
          <span className="font-heading text-2xl font-medium tracking-[0.08em]">
            {order.no}
          </span>
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-20">
        <div>
          <ul className="divide-y divide-border border-y border-border">
            {order.items.map((item) => (
              <li key={item.slug} className="flex gap-5 py-6">
                <Link
                  href={`/urun/${item.slug}`}
                  className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-secondary"
                  aria-label={item.name}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <Link
                    href={`/urun/${item.slug}`}
                    className="font-heading text-xl font-medium transition-colors hover:text-gold-deep"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    {item.qty} adet • {formatPrice(item.price)}
                  </p>
                  <span className="mt-auto text-sm font-medium">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="border border-border bg-card p-6">
              <p className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                <Icon name="map-pin-light" size={14} className="text-gold-deep" />
                Teslimat Adresi
              </p>
              <address className="mt-3 text-sm leading-relaxed not-italic">
                <span className="font-medium">{order.name}</span>
                <br />
                {order.address.line}
                <br />
                {order.address.district} / {order.address.city}
                {order.address.postal ? ` ${order.address.postal}` : ""}
                <br />
                {order.phone}
              </address>
            </div>
            <div className="border border-border bg-card p-6">
              <p className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                <Icon
                  name={PAYMENT_ICONS[order.payment.method]}
                  size={14}
                  className="text-gold-deep"
                />
                Ödeme Yöntemi
              </p>
              <p className="mt-3 text-sm font-medium">{order.payment.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Sipariş tarihi: {formatOrderDate(order.date)}
              </p>
              <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Icon
                  name="truck-light"
                  size={14}
                  className="text-gold-deep"
                />
                Tahmini teslim: {formatDeliveryEstimate(new Date(order.date))}
              </p>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-border bg-card p-8">
            <p className="eyebrow">Ödeme Özeti</p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-baseline justify-between">
                <dt className="text-muted-foreground">Ara Toplam</dt>
                <dd className="font-medium">{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-muted-foreground">Kargo</dt>
                <dd className="font-medium tracking-wide text-gold-deep">
                  Ücretsiz
                </dd>
              </div>
              {order.fee > 0 && (
                <div className="flex items-baseline justify-between">
                  <dt className="text-muted-foreground">Kapıda Ödeme Bedeli</dt>
                  <dd className="font-medium">{formatPrice(order.fee)}</dd>
                </div>
              )}
            </dl>
            <Separator className="my-5" />
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
                Toplam
              </span>
              <span className="font-heading text-3xl font-medium">
                {formatPrice(order.total)}
              </span>
            </div>
            <p className="mt-1 text-right text-xs text-muted-foreground">
              KDV dahildir.
            </p>

            <div className="mt-6 grid gap-2">
              <Button
                render={<Link href="/" />}
                nativeButton={false}
                className="h-12 text-[11px] tracking-[0.22em] uppercase"
              >
                Alışverişe Devam Et
              </Button>
              <Button
                render={<Link href="/hesap" />}
                nativeButton={false}
                variant="outline"
                className="h-11 text-[11px] tracking-[0.22em] uppercase"
              >
                Hesabım
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
