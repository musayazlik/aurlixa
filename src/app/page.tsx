import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Categories } from "@/components/sections/categories";
import { Featured } from "@/components/sections/featured";
import { CollectionBanner } from "@/components/sections/collection-banner";
import { Bestsellers } from "@/components/sections/bestsellers";
import { WhyUs } from "@/components/sections/why-us";
import { Story } from "@/components/sections/story";
import { Instagram } from "@/components/sections/instagram";
import { Newsletter } from "@/components/sections/newsletter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <WhyUs />
        <Categories />
        <Featured />
        <CollectionBanner />
        <Bestsellers />
        <Story />
        <Instagram />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
