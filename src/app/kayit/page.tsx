import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthShell } from "@/components/auth-shell";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Üye Ol",
  description:
    "Aurlixa üyeliği oluşturun; siparişlerinizi takip edin, favorilerinizi kaydedin.",
};

export default function RegisterPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[calc(100dvh-var(--chrome-h))] flex-1 flex-col">
        <AuthShell>
          <RegisterForm />
        </AuthShell>
      </main>
      <SiteFooter />
    </>
  );
}
