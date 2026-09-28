import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthShell } from "@/components/auth-shell";
import { VerifySuccess } from "@/components/verify-success";

export const metadata: Metadata = {
  title: "E-posta Doğrulandı",
  robots: { index: false },
};

export default function VerifiedPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[calc(100dvh-var(--chrome-h))] flex-1 flex-col">
        <AuthShell>
          <VerifySuccess />
        </AuthShell>
      </main>
      <SiteFooter />
    </>
  );
}
