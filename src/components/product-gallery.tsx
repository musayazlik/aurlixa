"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: [string, string]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === active ? name : ""}
            aria-hidden={i !== active}
            fill
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              i === active ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`${name} — görsel ${i + 1}`}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-[3/4] w-20 overflow-hidden border transition-colors",
              i === active ? "border-gold-deep" : "border-transparent hover:border-border"
            )}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
