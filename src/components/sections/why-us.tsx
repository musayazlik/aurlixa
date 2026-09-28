import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";

const items = [
  {
    icon: "seal-check-light",
    title: "Sertifikalı Altın",
    desc: "Her parça ayar ve gram garantili",
  },
  {
    icon: "shield-check-light",
    title: "Güvenli Ödeme",
    desc: "256-bit SSL ile korunan altyapı",
  },
  {
    icon: "truck-light",
    title: "Sigortalı Kargo",
    desc: "Tüm siparişler tam sigortalı",
  },
  {
    icon: "arrows-counter-clockwise-light",
    title: "Kolay İade",
    desc: "30 gün içinde koşulsuz",
  },
  {
    icon: "headset-light",
    title: "Müşteri Desteği",
    desc: "Hafta içi 09.00–19.00 canlı",
  },
];

export function WhyUs() {
  return (
    <section className="border-y border-border">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 md:grid-cols-3 md:px-8 lg:grid-cols-5 lg:px-12">
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 70}
            className="flex flex-col items-center gap-3 text-center"
          >
            <Icon name={item.icon} size={30} className="text-gold-deep" />
            <div>
              <h3 className="text-[13px] font-medium tracking-[0.14em] uppercase">
                {item.title}
              </h3>
              <p className="mt-1 text-[13px] font-light text-muted-foreground">
                {item.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
