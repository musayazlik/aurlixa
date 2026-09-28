import Link from "next/link";
import { Icon } from "@/components/icon";

const footerColumns = [
  {
    title: "Kurumsal",
    links: [
      { label: "Hakkımızda", href: "#" },
      { label: "Atölyemiz", href: "/#hikaye" },
      { label: "Koleksiyonlar", href: "/#koleksiyon" },
      { label: "İletişim", href: "#" },
    ],
  },
  {
    title: "Müşteri Hizmetleri",
    links: [
      { label: "Sipariş Takibi", href: "/hesap" },
      { label: "Kargo & Teslimat", href: "/iade-degisim#teslimat" },
      { label: "İade & Değişim", href: "/iade-degisim" },
      { label: "Sıkça Sorulan Sorular", href: "/iade-degisim#sss" },
    ],
  },
  {
    title: "Yasal",
    links: [
      { label: "Mesafeli Satış Sözleşmesi", href: "/mesafeli-satis" },
      { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
      { label: "Gizlilik Politikası", href: "/gizlilik" },
      { label: "Çerez Politikası", href: "/cerez-politikasi" },
    ],
  },
];

const socials = [
  { name: "instagram-logo-light", label: "Instagram" },
  { name: "facebook-logo-light", label: "Facebook" },
  { name: "x-logo-light", label: "X" },
];

export function SiteFooter() {
  return (
    <footer className="dark-section bg-espresso text-ivory/70">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 pb-8 md:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <p className="flex items-center gap-2.5 text-ivory">
              <Icon name="diamonds-four-light" size={14} className="text-gold-soft" />
              <span
                className="font-heading text-[24px] leading-none font-medium tracking-[0.42em]"
                style={{ marginRight: "-0.42em" }}
              >
                AURLIXA
              </span>
            </p>
            <p className="mt-5 max-w-[30ch] text-sm leading-relaxed text-ivory/55">
              1987’den beri İstanbul’da, el işçiliğiyle hazırlanan sertifikalı 14
              ve 22 ayar altın takılar.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center border border-ivory/15 text-ivory/70 transition-colors hover:border-gold-soft hover:text-gold-soft"
                >
                  <Icon name={s.name} size={18} />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[11px] font-medium tracking-[0.26em] uppercase text-gold-soft">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory/60 transition-colors hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-[11px] font-medium tracking-[0.26em] uppercase text-gold-soft">
              İletişim
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-ivory/60">
              <li className="flex gap-3">
                <Icon name="map-pin-light" size={17} className="mt-0.5 text-gold-soft/70" />
                <span>
                  Kuyumcukent Caddesi No: 12
                  <br />
                  Küçükçekmece / İstanbul
                </span>
              </li>
              <li className="flex gap-3">
                <Icon name="phone-light" size={17} className="mt-0.5 text-gold-soft/70" />
                <a href="tel:+902120000000" className="hover:text-ivory">
                  +90 (212) 000 00 00
                </a>
              </li>
              <li className="flex gap-3">
                <Icon
                  name="envelope-simple-light"
                  size={17}
                  className="mt-0.5 text-gold-soft/70"
                />
                <a href="mailto:merhaba@aurlixa.com" className="hover:text-ivory">
                  merhaba@aurlixa.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-y border-ivory/10 py-5">
          <p className="text-[11px] tracking-[0.2em] uppercase text-ivory/40">
            Güvenli Ödeme Seçenekleri
          </p>
          <div className="flex flex-wrap gap-2">
            {["Visa", "Mastercard", "Troy", "Amex", "3D Secure"].map((m) => (
              <span
                key={m}
                className="border border-ivory/15 px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-ivory/55"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="text-xs text-ivory/35">
            © 2026 Aurlixa Kuyumculuk San. ve Tic. A.Ş. Tüm hakları saklıdır.
          </p>
          <p className="text-[11px] tracking-[0.2em] uppercase text-ivory/35">
            <a
              href="https://musayazlik.com"
              target="_blank"
              rel="noreferrer"
              className="text-gold-soft/80 transition-colors hover:text-gold-soft"
            >
              Musa Yazlık
            </a>{" "}
            tarafından tasarlandı ve geliştirildi
          </p>
        </div>
      </div>
    </footer>
  );
}
