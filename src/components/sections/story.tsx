import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";

const stats = [
  { value: "38", label: "Yıllık Ustalık" },
  { value: "12.000+", label: "Mutlu Müşteri" },
  { value: "%100", label: "Sertifikalı Altın" },
];

export function Story() {
  return (
    <section id="hikaye" className="scroll-mt-24 overflow-hidden">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 py-20 md:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-32">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/story.webp"
              alt="Aurlixa atölyesinde takı detayı"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-4 -bottom-4 hidden h-full w-full border border-gold/50 lg:block"
          />
          <p className="absolute right-5 bottom-5 hidden bg-background px-5 py-4 text-[10px] tracking-[0.26em] uppercase text-muted-foreground shadow-lg lg:block">
            Grand Bazaar Atölyesi — İstanbul
          </p>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span>05</span>
              <span aria-hidden className="h-px w-8 bg-gold/60" />
              <span>Ustalık</span>
            </p>
            <h2 className="mt-4 font-heading text-4xl leading-[1.08] font-medium text-balance lg:text-5xl">
              Her Parçada Bir Hikâye
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              1987'den bu yana Kapalıçarşı'nın dar sokaklarındaki atölyemizde,
              her takı ustasının tezgâhından sabırla geçer. Dökümhane ateşinden
              son cilaya kadar on iki farklı aşamadan geçen her parça, kendi
              sertifikası ve hikâyesiyle size ulaşır.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Toplu üretimin hızını değil, kuyumculuğun sabrını seçiyoruz. Bu
              yüzden her Aurlixa parçası, nesiller boyu taşınabilecek bir
              mirasa dönüştürülür.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-heading text-4xl font-medium text-gold-deep">
                    {s.value}
                  </p>
                  <p className="mt-1.5 text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="#one-cikanlar"
              className="link-underline mt-10 text-foreground"
            >
              Koleksiyonda Hikâyeni Seç
              <Icon name="arrow-right-light" size={15} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
