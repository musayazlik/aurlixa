import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { featuredProducts } from "@/lib/data";

export function Featured() {
  return (
    <section id="one-cikanlar" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 lg:px-12 lg:py-28">
        <SectionHeading
          index="02"
          eyebrow="Vitrin"
          title="Öne Çıkan Parçalar"
          description="Atölyemizin en sevilen işleri; her biri el işçiliğiyle, sınırlı sayıda üretilir."
          action={{ label: "Tümünü Gör", href: "#en-cok-tercih-edilenler" }}
        />

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {featuredProducts.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 4) * 80}>
              <ProductCard product={product} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
