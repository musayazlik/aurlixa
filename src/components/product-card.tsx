"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";
import { formatGram, formatKarat, formatPrice } from "@/lib/format";
import { useCart } from "@/components/cart-provider";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { add } = useCart();
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-secondary">
        <Link
          href={`/urun/${product.slug}`}
          aria-label={product.name}
          className="block"
        >
          <div className="relative aspect-[3/4]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn(
                "object-cover transition-all duration-700 ease-out",
                hovered ? "scale-[1.04] opacity-0" : "scale-100 opacity-100"
              )}
            />
            <Image
              src={product.images[1]}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn(
                "scale-[1.04] object-cover transition-all duration-700 ease-out",
                hovered ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              )}
            />
          </div>
        </Link>

        {(product.isNew || product.bestseller) && (
          <span
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1.5 text-[10px] font-medium tracking-[0.22em] uppercase",
              product.isNew
                ? "bg-primary text-primary-foreground"
                : "bg-espresso text-ivory"
            )}
          >
            {product.isNew ? "Yeni" : "Çok Satan"}
          </span>
        )}

        <button
          type="button"
          onClick={() => add(product.slug)}
          className="absolute inset-x-3 bottom-3 h-11 bg-background/95 text-[11px] font-medium tracking-[0.22em] uppercase text-foreground opacity-100 backdrop-blur transition-all duration-300 hover:bg-espresso hover:text-ivory md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          Sepete Ekle
        </button>
      </div>

      <div className="flex flex-col gap-1 pt-4">
        <h3 className="font-heading text-xl leading-snug font-medium">
          <Link
            href={`/urun/${product.slug}`}
            className="transition-colors hover:text-gold-deep"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
          {formatKarat(product.karat)} • {formatGram(product.gram)}
        </p>
        <p className="pt-1 text-[15px] font-medium tracking-wide">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
