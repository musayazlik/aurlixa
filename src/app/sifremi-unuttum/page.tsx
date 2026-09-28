import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthShell } from "@/components/auth-shell";
import { ForgotForm } from "@/components/forgot-form";

export const metadata: Metadata = {
  title: "Şifremi Unuttum",
  description: "Aurlixa hesabınızın şifresini sıfırlayın.",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[calc(100dvh-var(--chrome-h))] flex-1 flex-col">
        <AuthShell>
          <ForgotForm />
        </AuthShell>
      </main>
      <SiteFooter />
    </>
  );
}
