"use client";

import { useCart } from "@/components/cart-provider";

export function QtyStepper({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex h-11 items-center border border-input ${className ?? ""}`}
    >
      <button
        type="button"
        aria-label="Adedi azalt"
        onClick={() => onChange(value - 1)}
        className="flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        −
      </button>
      <span
        aria-live="polite"
        className="w-8 text-center text-sm font-medium tabular-nums"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Adedi artır"
        onClick={() => onChange(value + 1)}
        className="flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        +
      </button>
    </div>
  );
}
