import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartView } from "@/components/cart-view";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { bestsellerProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sepet",
  description:
    "Sepetinizdeki sertifikalı 14 ve 22 ayar altın takıları gözden geçirin ve güvenle ödemeye geçin.",
};

export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-[1440px] px-5 pt-10 pb-2 md:px-8 lg:px-12 lg:pt-14">
          <p className="eyebrow flex items-center gap-3">
            <span>Sepet</span>
            <span aria-hidden className="h-px w-8 bg-gold/60" />
          </p>
          <h1 className="mt-3 font-heading text-4xl leading-[1.08] font-medium md:text-5xl">
            Alışveriş Sepetiniz
          </h1>
        </div>

        <CartView />

        <section className="border-t border-border">
          <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 lg:px-12">
            <SectionHeading
              eyebrow="Sepetinize Yakışır"
              title="En Çok Satanlar"
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
              {bestsellerProducts.slice(0, 4).map((p, i) => (
                <Reveal key={p.slug} delay={i * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
