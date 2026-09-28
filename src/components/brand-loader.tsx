import { Icon } from "@/components/icon";

/** Markaya uygun tam ekran yükleme göstergesi. */
export function BrandLoader({ label = "Yükleniyor" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-label={label}
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background"
    >
      <Icon
        name="diamonds-four-light"
        size={38}
        className="animate-pulse text-gold-deep"
      />
      <span
        className="font-heading text-[26px] leading-none font-medium tracking-[0.42em] text-foreground"
        style={{ marginRight: "-0.42em" }}
      >
        AURLIXA
      </span>
      <span aria-hidden className="h-px w-24 animate-pulse bg-gold/60" />
      <p className="eyebrow">{label}…</p>
    </div>
  );
}
