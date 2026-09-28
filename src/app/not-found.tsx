import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { bestsellerProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto flex max-w-2xl flex-col items-center px-5 pt-20 pb-20 text-center md:px-8 lg:pt-28">
          <p className="eyebrow flex items-center gap-3">
            <Icon name="compass-light" size={16} />
            <span>404 — Sayfa Bulunamadı</span>
          </p>
          <p
            aria-hidden
            className="mt-6 font-heading text-[110px] leading-none font-medium text-gold/25 select-none md:text-[140px]"
          >
            404
          </p>
          <h1 className="mt-4 font-heading text-4xl leading-[1.08] font-medium md:text-5xl">
            Bu Sayfa Kaybolmuş
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Aradığınız sayfa taşınmış, adı değişmiş ya da hiç var olmamış
            olabilir. Işıltıya geri dönmek için sizi anasayfaya davet ediyoruz.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button
              render={<Link href="/" />}
              className="h-12 bg-espresso px-8 text-[11px] font-medium tracking-[0.22em] uppercase text-ivory hover:bg-gold-deep"
            >
              Anasayfaya Dön
            </Button>
            <Button
              variant="outline"
              render={<Link href="/#kategoriler" />}
              className="h-12 px-8 text-[11px] font-medium tracking-[0.22em] uppercase"
            >
              Koleksiyonu Keşfet
            </Button>
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 lg:px-12 lg:py-20">
            <SectionHeading
              eyebrow="Yolunuzu Şaşırdınız"
              title="Bunları Beğenebilirsiniz"
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
              {bestsellerProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
