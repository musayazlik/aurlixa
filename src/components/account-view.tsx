"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { useAuth } from "@/components/auth-provider";
import { formatPrice } from "@/lib/format";
import { useLastOrder } from "@/lib/order";

const quickLinks = [
  {
    icon: "package-light",
    title: "Siparişlerim",
    desc: "Kargo durumunu görüntüle",
    href: "#siparislerim",
  },
  {
    icon: "arrow-counter-clockwise-light",
    title: "İade & Değişim",
    desc: "30 gün koşulsuz iade hakkı",
    href: "/iade-degisim",
  },
  {
    icon: "chat-circle-text-light",
    title: "Destek",
    desc: "merhaba@aurlixa.com",
    href: "mailto:merhaba@aurlixa.com",
  },
];

function formatMemberSince(iso: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function formatOrderDate(iso: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function AccountView() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const order = useLastOrder();

  if (user === undefined) return <div className="min-h-[50vh]" aria-hidden />;

  if (!user) {
    return (
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-5 px-5 py-28 text-center md:px-8 lg:px-12">
        <Icon name="user-circle-light" size={48} className="text-gold-deep" />
        <p className="font-heading text-3xl">Hesabınızı görün</p>
        <p className="max-w-[44ch] text-[15px] leading-relaxed text-muted-foreground">
          Bu sayfayı görüntülemek için giriş yapmanız veya üye olmanız
          gerekiyor.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button
            render={<Link href="/giris" />}
            nativeButton={false}
            className="h-12 px-10 text-[11px] tracking-[0.24em] uppercase"
          >
            Giriş Yap
          </Button>
          <Button
            render={<Link href="/kayit" />}
            nativeButton={false}
            variant="outline"
            className="h-12 px-10 text-[11px] tracking-[0.24em] uppercase"
          >
            Üye Ol
          </Button>
        </div>
      </div>
    );
  }

  const firstName = user.name.split(" ")[0];

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Hesabım</p>
          <h1 className="mt-3 font-heading text-4xl leading-[1.08] font-medium md:text-5xl">
            Merhaba, {firstName}.
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {user.email} • Üyelik başlangıcı: {formatMemberSince(user.since)}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="h-11 text-[11px] tracking-[0.22em] uppercase"
        >
          <Icon name="sign-out-light" size={16} />
          Çıkış Yap
        </Button>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {quickLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="group border border-border bg-card p-6 transition-colors hover:border-gold-deep/60"
          >
            <Icon
              name={link.icon}
              size={24}
              className="text-gold-deep transition-transform group-hover:-translate-y-0.5"
            />
            <p className="mt-4 font-heading text-xl font-medium">
              {link.title}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{link.desc}</p>
          </Link>
        ))}
      </div>

      <section id="siparislerim" className="mt-14 scroll-mt-28">
        <h2 className="font-heading text-2xl font-medium md:text-3xl">
          Son Siparişiniz
        </h2>

        {order ? (
          <div className="mt-6 border border-border bg-card">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <span className="font-heading text-xl font-medium tracking-[0.06em]">
                  {order.no}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatOrderDate(order.date)}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  {order.payment.label}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 px-1 text-[11px] tracking-[0.18em] uppercase text-emerald-800">
                <span className="size-1.5 rounded-full bg-emerald-700" />
                Hazırlanıyor
              </span>
            </div>

            <ul className="divide-y divide-border px-6">
              {order.items.map((item) => (
                <li key={item.slug} className="flex items-center gap-4 py-4">
                  <Link
                    href={`/urun/${item.slug}`}
                    className="relative aspect-[3/4] w-14 shrink-0 overflow-hidden bg-secondary"
                    aria-label={item.name}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                    <span className="absolute right-0 bottom-0 bg-espresso px-1.5 py-0.5 text-[10px] font-medium text-ivory">
                      ×{item.qty}
                    </span>
                  </Link>
                  <p className="min-w-0 flex-1 truncate font-heading text-lg font-medium">
                    {item.name}
                  </p>
                  <span className="text-sm font-medium tabular-nums">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-4">
              <Link
                href="/odeme/basarili"
                className="link-underline text-foreground"
              >
                Sipariş Detayı
                <Icon name="arrow-right-light" size={15} />
              </Link>
              <p className="text-sm">
                <span className="text-muted-foreground">Toplam: </span>
                <span className="font-heading text-xl font-medium">
                  {formatPrice(order.total)}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center gap-4 border border-dashed border-border px-6 py-14 text-center">
            <Icon
              name="package-light"
              size={36}
              className="text-muted-foreground/50"
            />
            <p className="text-sm text-muted-foreground">
              Henüz bir siparişiniz yok. Koleksiyonu keşfedin; ilk parçanız
              sizi bekliyor.
            </p>
            <Button
              render={<Link href="/#kategoriler" />}
              nativeButton={false}
              variant="outline"
              className="h-11 px-8 text-[11px] tracking-[0.22em] uppercase"
            >
              Koleksiyonu Keşfet
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
