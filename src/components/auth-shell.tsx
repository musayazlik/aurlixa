import type { ReactNode } from "react";
import Image from "next/image";
import { Icon } from "@/components/icon";

const trustItems = [
  { icon: "seal-check-light", label: "Sertifikalı 14 & 22 ayar altın" },
  { icon: "lock-simple-light", label: "3D Secure ile güvenli ödeme" },
  { icon: "truck-light", label: "Ücretsiz sigortalı kargo" },
];

/**
 * Auth sayfaları için ortak düzen: masaüstünde solda marka paneli,
 * sağda form; mobilde yalnızca form.
 */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-[1440px] flex-1 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-espresso lg:block">
        <Image
          src="/images/story.webp"
          alt=""
          aria-hidden
          fill
          sizes="50vw"
          className="object-cover opacity-45"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/20"
        />
        <div className="relative flex h-full flex-col justify-between p-12 text-ivory xl:p-16">
          <p className="flex items-center gap-2.5">
            <Icon name="diamonds-four-light" size={14} className="text-gold-soft" />
            <span
              className="font-heading text-[22px] leading-none font-medium tracking-[0.42em]"
              style={{ marginRight: "-0.42em" }}
            >
              AURLIXA
            </span>
          </p>

          <div>
            <p className="font-heading text-4xl leading-[1.15] font-light xl:text-[44px]">
              “Altın zamansızdır;
              <br />
              <em className="text-gold-soft italic">şıklık da öyle.</em>”
            </p>
            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-ivory/70">
              1987’den beri İstanbul’daki atölyemizde, her biri sertifikalı
              el işçiliği parçalar üretiyoruz. Hesabınızla koleksiyonları
              takip edin, favorilerinizi saklayın.
            </p>
          </div>

          <ul className="grid gap-3">
            {trustItems.map((t) => (
              <li
                key={t.label}
                className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-ivory/75"
              >
                <Icon name={t.icon} size={17} className="text-gold-soft" />
                {t.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-16 md:px-8 lg:py-24">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
