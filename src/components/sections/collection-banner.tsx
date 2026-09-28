import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";

export function CollectionBanner() {
  return (
    <section
      id="koleksiyon"
      className="dark-section scroll-mt-24 bg-espresso text-ivory"
    >
      <div className="mx-auto grid max-w-[1440px] items-stretch gap-0 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-20 md:px-8 lg:px-12 lg:py-32">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span>03</span>
              <span aria-hidden className="h-px w-8 bg-gold/60" />
              <span>Yeni Sezon — ’26</span>
            </p>
            <h2 className="mt-4 max-w-xl font-heading text-4xl leading-[1.08] font-medium text-balance lg:text-6xl">
              Sonbahar Altın Koleksiyonu
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed font-light text-ivory/70">
              Anadolu’nun yüzyıllık kuyum geleneğinden ilham alan 37 parçalık
              sınırlı seri; sıcak sarı tonlar, el kazıması dokular ve modern
              formlarla buluşuyor.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                render={<Link href="#one-cikanlar" />}
                nativeButton={false}
                className="h-13 bg-primary px-9 text-[11px] font-medium tracking-[0.24em] uppercase text-primary-foreground hover:bg-gold-deep"
              >
                Koleksiyonu Gör
              </Button>
              <Link
                href="#hikaye"
                className="link-underline text-ivory/80 hover:text-gold-soft"
              >
                Atölyeyi Tanıyın
                <Icon name="arrow-up-right-light" size={15} />
              </Link>
            </div>
            <p className="mt-10 text-[11px] tracking-[0.24em] uppercase text-ivory/40">
              Sınırlı üretim • Her parçaya özel sertifika
            </p>
          </Reveal>
        </div>

        <Reveal className="relative min-h-[420px] lg:min-h-[640px]" delay={120}>
          <Image
            src="/images/banner.webp"
            alt="Sonbahar koleksiyonundan altın kolye"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-4 border border-gold-soft/40 lg:inset-6"
          />
          <div className="absolute bottom-8 left-8 bg-background px-6 py-5 text-foreground shadow-xl">
            <p className="font-heading text-4xl leading-none font-medium text-gold-deep">
              37
            </p>
            <p className="mt-1.5 text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
              Benzersiz Parça
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
