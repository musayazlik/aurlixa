import type { ReactNode } from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";

/**
 * Aurlixa e-postaları için ortak zarf.
 * Marka paleti globals.css ile aynı: ivory zemin, espresso metin, altın vurgu.
 */
export function EmailLayout({
  preview,
  children,
}: {
  preview: string;
  children: ReactNode;
}) {
  return (
    <Html lang="tr">
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                espresso: "#1b150e",
                "espresso-light": "#2a2216",
                gold: "#b08d57",
                "gold-deep": "#8c6d3f",
                "gold-soft": "#d4b678",
                ivory: "#f8f4ec",
                parchment: "#ede4d3",
              },
              fontFamily: {
                heading: ['"Cormorant Garamond"', "Georgia", "serif"],
                sans: ["Jost", "Arial", "Helvetica", "sans-serif"],
              },
            },
          },
        }}
      >
        <Body className="bg-ivory font-sans text-espresso">
          <Container className="mx-auto max-w-[560px] px-6 py-10">
            <p className="text-center text-[11px] font-medium tracking-[0.42em] text-gold-deep">
              ◆ AURLIXA
            </p>
            <section className="mt-6 border border-parchment bg-white px-8 py-10 text-center">
              {children}
            </section>
            <Hr className="mt-8 border-parchment" />
            <p className="mt-4 text-center text-[11px] leading-relaxed text-espresso/50">
              Aurlixa Kuyumculuk • Kuyumcukent Caddesi No: 12, Küçükçekmece /
              İstanbul
              <br />
              Bu e-postayı Aurlixa hesabınız nedeniyle aldınız.
            </p>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
