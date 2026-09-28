import Link from "next/link";
import { Icon } from "@/components/icon";

export type LegalBlock =
  | string
  | string[]
  | { headers: string[]; rows: string[][] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

type LegalPageProps = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return (
      <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
        {block}
      </p>
    );
  }
  if (Array.isArray(block)) {
    return (
      <ul className="mt-4 grid gap-2.5">
        {block.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-foreground/80">
            <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-gold/70" />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse border border-border text-sm">
        <thead>
          <tr>
            {block.headers.map((h) => (
              <th
                key={h}
                className="border-b border-border bg-muted px-4 py-3 text-left text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`border-b border-border px-4 py-3 align-top leading-relaxed ${
                    j === 0 ? "font-medium whitespace-nowrap" : "text-foreground/80"
                  } ${i === block.rows.length - 1 ? "border-b-0" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Yasal/metin ağırlıklı sayfalar için ortak düzen: başlık alanı,
 * yapışkan içindekiler menüsü ve bölümlere ayrılmış içerik.
 */
export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <main>
      <div className="mx-auto max-w-[1440px] px-5 pt-10 pb-12 md:px-8 lg:px-12 lg:pt-14">
        <p className="eyebrow flex items-center gap-3">
          <span>Yasal</span>
          <span aria-hidden className="h-px w-8 bg-gold/60" />
        </p>
        <h1 className="mt-3 max-w-3xl font-heading text-4xl leading-[1.08] font-medium text-balance md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          {intro}
        </p>
        <p className="mt-3 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
          Son güncelleme: {updated}
        </p>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-28 md:px-8 lg:grid-cols-[250px_1fr] lg:gap-20 lg:px-12">
        <nav
          aria-label="Sayfa içeriği"
          className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
        >
          <p className="text-[10px] font-medium tracking-[0.26em] uppercase text-gold-deep">
            İçindekiler
          </p>
          <ol className="mt-4 grid gap-2.5 border-l border-border">
            {sections.map((s, i) => (
              <li key={s.id} className="pl-4">
                <a
                  href={`#${s.id}`}
                  className="group flex items-baseline gap-2 text-sm text-muted-foreground transition-colors hover:text-gold-deep"
                >
                  <span className="text-[10px] tabular-nums text-gold-deep/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 max-w-3xl">
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-28 border-t border-border py-9 first:border-t-0 first:pt-0"
            >
              <h2 className="font-heading text-2xl leading-snug font-medium md:text-3xl">
                {s.title}
              </h2>
              {s.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </section>
          ))}

          <div className="mt-4 border-t border-border pt-8">
            <Link href="/" className="link-underline text-foreground">
              <Icon name="arrow-left-light" size={15} />
              Anasayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
