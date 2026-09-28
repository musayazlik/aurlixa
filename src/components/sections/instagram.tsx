import Image from "next/image";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { instagramImages } from "@/lib/data";

export function Instagram() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 lg:px-12 lg:py-28">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
          <p className="eyebrow">@aurlixa</p>
          <h2 className="mt-3 font-heading text-4xl leading-[1.08] font-medium text-balance md:text-5xl">
            Instagram'da Bizi Takip Edin
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Kombin fikirleri, yeni parçalar ve atölyeden kareler için sosyal
            kanaldaki topluluğumuza katılın.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {instagramImages.map((src, i) => (
            <Reveal key={src} delay={i * 60}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden bg-secondary"
              >
                <Image
                  src={src}
                  alt={`Aurlixa Instagram gönderisi ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-espresso/0 text-ivory opacity-0 transition-all duration-500 group-hover:bg-espresso/55 group-hover:opacity-100">
                  <Icon name="instagram-logo-light" size={26} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
