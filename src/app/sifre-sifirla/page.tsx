import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthShell } from "@/components/auth-shell";
import { ResetPasswordForm } from "@/components/reset-password-form";

export const metadata: Metadata = {
  title: "Şifre Sıfırla",
  robots: { index: false },
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[calc(100dvh-var(--chrome-h))] flex-1 flex-col">
        <AuthShell>
          <ResetPasswordForm
            token={typeof token === "string" ? token : undefined}
          />
        </AuthShell>
      </main>
      <SiteFooter />
    </>
  );
}
