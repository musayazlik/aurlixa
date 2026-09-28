import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { categoryCards, products, type CategoryCard } from "@/lib/data";

function CategoryTile({
  card,
  className,
  large = false,
}: {
  card: CategoryCard;
  className?: string;
  large?: boolean;
}) {
  const count =
    card.id === "yeni"
      ? products.filter((p) => p.isNew).length
      : products.filter((p) => p.category === card.id).length;

  return (
    <Link
      href="#one-cikanlar"
      className={`group relative block overflow-hidden bg-espresso ${className ?? ""}`}
    >
      <Image
        src={card.image}
        alt={`${card.label} koleksiyonu`}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/30 to-transparent transition-colors duration-500 group-hover:from-espresso/90"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 lg:p-8">
        <div>
          <p className="text-[10px] tracking-[0.26em] uppercase text-ivory/60">
            {card.note}
          </p>
          <h3
            className={`mt-1.5 font-heading font-medium text-ivory ${
              large ? "text-3xl lg:text-4xl" : "text-2xl lg:text-3xl"
            }`}
          >
            {card.label}
          </h3>
          <p className="mt-2 flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-gold-soft opacity-0 transition-all duration-500 group-hover:opacity-100">
            Keşfet
            <Icon name="arrow-right-light" size={14} />
          </p>
        </div>
        <span className="mb-1 text-[10px] tracking-[0.2em] uppercase text-ivory/45">
          {count} parça
        </span>
      </div>
    </Link>
  );
}

export function Categories() {
  const [kolye, bileklik, yuzuk, kupe, set] = categoryCards;
  const yeni: CategoryCard = {
    id: "yeni",
    label: "Yeni Gelenler",
    image: "/images/model-blonde.webp",
    note: "Sezonun ilk parçaları",
  };

  return (
    <section id="kategoriler" className="scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 lg:px-12 lg:py-28">
        <SectionHeading
          index="01"
          eyebrow="Kategoriler"
          title="Vitrinden Bir Seçki"
          action={{ label: "Tüm Koleksiyon", href: "#one-cikanlar" }}
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          <Reveal className="md:col-span-2 lg:col-span-7">
            <CategoryTile card={kolye} large className="h-[420px] lg:h-[540px]" />
          </Reveal>
          <Reveal delay={90} className="lg:col-span-5">
            <CategoryTile card={yuzuk} className="h-[420px] lg:h-[540px]" />
          </Reveal>
          <Reveal delay={60} className="lg:col-span-4">
            <CategoryTile card={bileklik} className="h-[420px]" />
          </Reveal>
          <Reveal delay={140} className="lg:col-span-4">
            <CategoryTile card={kupe} className="h-[420px]" />
          </Reveal>
          <Reveal delay={220} className="lg:col-span-4">
            <CategoryTile card={set} className="h-[420px]" />
          </Reveal>
          <Reveal delay={80} className="md:col-span-2 lg:col-span-12">
            <CategoryTile
              card={yeni}
              className="h-[280px] border border-border lg:h-[320px]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
