import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Icon } from "@/components/icon";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { AddToCartPanel } from "@/components/add-to-cart-panel";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CATEGORY_LABELS, getProduct, getRelated, products } from "@/lib/data";
import { formatGram, formatKarat, formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/urun/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Ürün bulunamadı" };
  return {
    title: product.name,
    description: product.description.slice(0, 155),
  };
}

const trustRows = [
  {
    icon: "lock-simple-light",
    title: "Güvenli Ödeme",
    desc: "3D Secure ile korunan altyapı",
  },
  {
    icon: "truck-light",
    title: "Sigortalı Kargo",
    desc: "1–3 iş günü içinde teslim",
  },
  {
    icon: "seal-check-light",
    title: "Sertifikalı Ürün",
    desc: "Ayar ve gram garantili gönderim",
  },
];

export default async function ProductPage({
  params,
}: PageProps<"/urun/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(product);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <nav
          aria-label="Konum"
          className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-5 pt-8 text-[11px] tracking-[0.14em] uppercase text-muted-foreground md:px-8 lg:px-12"
        >
          <Link href="/" className="transition-colors hover:text-gold-deep">
            Anasayfa
          </Link>
          <Icon name="caret-right-light" size={12} className="text-border" />
          <Link
            href="/#kategoriler"
            className="transition-colors hover:text-gold-deep"
          >
            {CATEGORY_LABELS[product.category]}
          </Link>
          <Icon name="caret-right-light" size={12} className="text-border" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-10 md:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-14">
          <ProductGallery images={product.images} name={product.name} />

          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <p className="eyebrow">
                {CATEGORY_LABELS[product.category]} —{" "}
                {formatKarat(product.karat)}
              </p>
              {product.isNew && (
                <Badge className="rounded-none bg-primary px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase text-primary-foreground">
                  Yeni
                </Badge>
              )}
            </div>

            <h1 className="mt-3 font-heading text-4xl leading-[1.08] font-medium text-balance md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 font-heading text-3xl font-medium text-gold-deep">
              {formatPrice(product.price)}
              <span className="ml-2 align-middle font-sans text-xs font-normal tracking-wide text-muted-foreground">
                KDV dahil
              </span>
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="rounded-none border-border px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase"
              >
                {formatKarat(product.karat)} Altın
              </Badge>
              <Badge
                variant="outline"
                className="rounded-none border-border px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase"
              >
                {formatGram(product.gram)}
              </Badge>
              <span className="inline-flex items-center gap-2 px-2 py-1.5 text-[11px] tracking-[0.14em] uppercase text-emerald-800">
                <span className="size-1.5 rounded-full bg-emerald-700" />
                Stokta
              </span>
            </div>

            <p className="mt-6 text-[11px] font-medium tracking-[0.22em] uppercase text-muted-foreground">
              El işçiliği • İmza damgalı • Sertifika ile gönderilir
            </p>

            <Separator className="my-8" />

            <AddToCartPanel slug={product.slug} />

            <ul className="mt-8 grid gap-3 border-t border-border pt-8">
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

            <Accordion className="mt-10 border-t border-border" defaultValue={[0]}>
              <AccordionItem value={0} className="border-b border-border">
                <AccordionTrigger className="py-5 font-heading text-xl font-medium tracking-wide hover:no-underline">
                  Ürün Açıklaması
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value={1} className="border-b border-border">
                <AccordionTrigger className="py-5 font-heading text-xl font-medium tracking-wide hover:no-underline">
                  Ayar • Gram • Ölçü
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <dl className="grid gap-2 text-sm">
                    {product.specs.map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-baseline justify-between gap-6 border-b border-dashed border-border pb-2 last:border-0"
                      >
                        <dt className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                          {label}
                        </dt>
                        <dd className="text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value={2} className="border-b border-border">
                <AccordionTrigger className="py-5 font-heading text-xl font-medium tracking-wide hover:no-underline">
                  Teslimat Bilgisi
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  Siparişleriniz özel hediye kutusunda, tam sigortalı kargo ile
                  1–3 iş günü içinde adresinize teslim edilir. Kargo takip
                  numarası gönderim günü SMS ve e-posta ile iletilir. Yurt dışı
                  gönderilerde teslim süresi 5–7 iş günüdür.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value={3} className="border-b border-border">
                <AccordionTrigger className="py-5 font-heading text-xl font-medium tracking-wide hover:no-underline">
                  Sertifika Bilgisi
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  Her Aurlixa parçası, ayar ve gram bilgilerini belirten resmi
                  sertifika ile gönderilir. Sertifikada ürün kimlik numarası,
                  mühür ve atölye imzası bulunur; bu numara ile ürünün
                  geçmişi her zaman doğrulanabilir.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value={4} className="border-b border-border">
                <AccordionTrigger className="py-5 font-heading text-xl font-medium tracking-wide hover:no-underline">
                  İade & Değişim
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  Kullanılmamış ve ambalajı bozulmamış ürünlerde 30 gün içinde
                  koşulsuz iade ve değişim hakkı sunulur. İade kargosu
                  Aurlixa'ya aittir; geri ödeme, ürün bizimle temas ettiğinde
                  3 iş günü içinde kartınıza yansır.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <section className="border-t border-border">
          <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 lg:px-12">
            <SectionHeading
              eyebrow="Benzer Parçalar"
              title="Bunları da Beğenebilirsiniz"
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
              {related.map((p, i) => (
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
