"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { bestsellerProducts } from "@/lib/data";

function CarouselArrows() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  const base =
    "flex size-12 items-center justify-center border border-border text-foreground transition-colors hover:border-gold-deep hover:bg-gold-deep hover:text-ivory disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="flex gap-2 md:mb-1">
      <button
        type="button"
        aria-label="Önceki ürünler"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={base}
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Sonraki ürünler"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={base}
      >
        →
      </button>
    </div>
  );
}

export function Bestsellers() {
  return (
    <section
      id="en-cok-tercih-edilenler"
      className="scroll-mt-24 border-t border-border bg-secondary/45"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 lg:px-12 lg:py-28">
        <Carousel opts={{ align: "start" }}>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              index="04"
              eyebrow="Bu Ayın Favorileri"
              title="En Çok Tercih Edilenler"
              className="md:max-w-none md:flex-none md:flex-row"
            />
            <CarouselArrows />
          </div>

          <CarouselContent className="mt-12 pb-2">
            {bestsellerProducts.map((product) => (
              <CarouselItem
                key={product.slug}
                className="basis-[78%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
