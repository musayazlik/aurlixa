import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthShell } from "@/components/auth-shell";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description:
    "Aurlixa hesabınıza giriş yapın; siparişlerinizi takip edin, favorilerinizi kaydedin.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[calc(100dvh-var(--chrome-h))] flex-1 flex-col">
        <AuthShell>
          <LoginForm next={typeof next === "string" ? next : undefined} />
        </AuthShell>
      </main>
      <SiteFooter />
    </>
  );
}
