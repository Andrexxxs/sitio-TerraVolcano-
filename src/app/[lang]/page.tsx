import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { Awards } from "@/components/Awards";
import { Ascent } from "@/components/Ascent";
import { CloudPassage } from "@/components/CloudPassage";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { LavaBands } from "@/components/LavaBands";
import { Nav } from "@/components/Nav";
import { Reviews } from "@/components/Reviews";
import { SiteMotion } from "@/components/SiteMotion";
import { Tours, type TourCard } from "@/components/Tours";
import { climbAltitudes, tourData, tourImage, tourUrl } from "@/lib/content";
import { getDictionary, hasLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const metres = new Intl.NumberFormat(lang === "es" ? "es-CL" : "en-US");
  const steps = t.steps.map((s, i) => ({
    ...s,
    metres: climbAltitudes[i],
    altitude: `${s.place} · ${metres.format(climbAltitudes[i])} m`,
  }));

  const tours: TourCard[] = tourData.map((tour) => ({
    id: tour.id,
    name: t.tours.names[tour.id],
    kind: t.tours.kinds[tour.kind],
    duration: "days" in tour ? `${tour.days} ${t.tours.days}` : `${tour.hours} ${t.tours.hours}`,
    price: `CLP ${metres.format(tour.priceFrom)}`,
    image: tourImage(tour.id),
    href: tourUrl(tour.id),
  }));

  return (
    <>
      <Nav lang={lang} t={t.nav} />
      <main>
        <Ascent t={t.hero} steps={steps} />
        <CloudPassage t={t.clouds} />
        <Tours t={t.tours} tours={tours} />
        <LavaBands words={t.bands} />
        <About t={t.about} />
        <Awards t={t.awards} />
        <Reviews t={t.reviews} />
        <Faq t={t.faq} />
      </main>
      <Contact t={t.contact} backToTop={t.nav.backToTop} />
      <SiteMotion />
    </>
  );
}
