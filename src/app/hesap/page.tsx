import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AccountView } from "@/components/account-view";

export const metadata: Metadata = {
  title: "Hesabım",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <AccountView />
      </main>
      <SiteFooter />
    </>
  );
}
