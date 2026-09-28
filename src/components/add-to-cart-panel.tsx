"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { useCart } from "@/components/cart-provider";
import { QtyStepper } from "@/components/qty-stepper";

export function AddToCartPanel({ slug }: { slug: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-stretch gap-3">
      <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} />
      <Button
        onClick={() => add(slug, qty)}
        className="h-12 flex-1 bg-espresso text-[11px] font-medium tracking-[0.24em] uppercase text-ivory hover:bg-gold-deep"
      >
        Sepete Ekle
      </Button>
      <button
        type="button"
        aria-pressed={liked}
        aria-label="Favorilere ekle"
        onClick={() => setLiked((v) => !v)}
        className={`flex w-12 items-center justify-center border transition-colors ${
          liked
            ? "border-gold-deep text-gold-deep"
            : "border-input text-muted-foreground hover:border-gold-deep hover:text-gold-deep"
        }`}
      >
        <Icon name={liked ? "heart-fill" : "heart-light"} size={20} />
      </button>
    </div>
  );
}
