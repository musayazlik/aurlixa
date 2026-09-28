import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";

const trustItems = [
  { icon: "shield-check-light", label: "Güvenli Ödeme" },
  { icon: "seal-check-light", label: "Sertifikalı Ürünler" },
  { icon: "truck-light", label: "Sigortalı Kargo" },
];

export function Hero() {
  return (
    <section className="dark-section relative flex min-h-[86vh] items-stretch overflow-hidden bg-espresso lg:min-h-[88vh]">
      <Image
        src="/images/hero.webp"
        alt="Altın kolye takan model"
        fill
        priority
        sizes="100vw"
        className="hero-zoom object-cover object-[70%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/45 to-espresso/10"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-espresso/70 to-transparent"
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-center px-5 py-24 md:px-8 lg:px-12 lg:py-32">
        <ul
          className="hero-anim flex flex-wrap items-center gap-x-6 gap-y-2"
          style={{ animationDelay: "0.05s" }}
        >
          {trustItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 border border-ivory/25 px-3 py-1.5 text-[10px] font-light tracking-[0.22em] uppercase text-ivory/85 backdrop-blur-[2px]"
            >
              <Icon name={item.icon} size={14} className="text-gold-soft" />
              {item.label}
            </li>
          ))}
        </ul>

        <h1
          className="hero-anim mt-8 max-w-3xl font-heading text-[52px] leading-[1.04] font-medium text-ivory sm:text-6xl lg:text-[84px]"
          style={{ animationDelay: "0.18s" }}
        >
          Zamansız Şıklık,
          <br />
          <em className="font-light text-gold-soft italic">Gerçek Altın.</em>
        </h1>

        <p
          className="hero-anim mt-6 max-w-md text-[15px] leading-relaxed font-light text-ivory/75 lg:text-base"
          style={{ animationDelay: "0.32s" }}
        >
          Özenle seçilmiş 14 ve 22 ayar altın takı koleksiyonlarını keşfedin.
          Her parça, İstanbul’daki atölyemizde el işçiliğiyle hayat bulur.
        </p>

        <div
          className="hero-anim mt-10 flex flex-wrap gap-3"
          style={{ animationDelay: "0.45s" }}
        >
          <Button
            render={<Link href="/#kategoriler" />}
            nativeButton={false}
            className="h-13 bg-primary px-9 text-[11px] font-medium tracking-[0.24em] uppercase text-primary-foreground hover:bg-gold-deep"
          >
            Koleksiyonu Keşfet
          </Button>
          <Button
            render={<Link href="/#one-cikanlar" />}
            nativeButton={false}
            className="h-13 border border-ivory/40 bg-transparent px-9 text-[11px] font-medium tracking-[0.24em] uppercase text-ivory hover:border-ivory hover:bg-ivory/10"
          >
            Yeni Gelenler
          </Button>
        </div>
      </div>

      <p
        aria-hidden
        className="hero-anim absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[10px] tracking-[0.34em] uppercase text-ivory/50 lg:block"
        style={{ animationDelay: "0.7s" }}
      >
        Aşağı Kaydırın ↓
      </p>
    </section>
  );
}
