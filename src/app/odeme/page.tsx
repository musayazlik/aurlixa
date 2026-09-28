import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CheckoutFlow } from "@/components/checkout-flow";

export const metadata: Metadata = {
  title: "Ödeme",
  description:
    "Teslimat bilgilerinizi girin, ödeme yönteminizi seçin ve siparişinizi 3D Secure ile güvenle tamamlayın.",
};

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-[1440px] px-5 pt-10 pb-2 md:px-8 lg:px-12 lg:pt-14">
          <p className="eyebrow flex items-center gap-3">
            <span>Güvenli Ödeme</span>
            <span aria-hidden className="h-px w-8 bg-gold/60" />
          </p>
          <h1 className="mt-3 font-heading text-4xl leading-[1.08] font-medium md:text-5xl">
            Ödemeyi Tamamla
          </h1>
        </div>

        <CheckoutFlow />
      </main>
      <SiteFooter />
    </>
  );
}
