import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OrderRecap } from "@/components/order-recap";

export const metadata: Metadata = {
  title: "Siparişiniz Alındı",
  robots: { index: false },
};

export default function OrderSuccessPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <OrderRecap />
        <div className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8 lg:px-12">
          <p className="text-center text-sm text-muted-foreground">
            Sorularınız için{" "}
            <Link
              href="mailto:merhaba@aurlixa.com"
              className="underline decoration-gold/60 underline-offset-4 hover:text-gold-deep"
            >
              merhaba@aurlixa.com
            </Link>{" "}
            adresinden bize ulaşabilirsiniz.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
