import Image from "next/image";
import { BOOKING_URL, images } from "@/lib/content";
import type { Dictionary, Locale } from "@/lib/i18n";

// Terra Volcano's white logo from terravolcano.com (191×50 PNG).
export function Logo({ label }: { label: string }) {
  return (
    <a href="#top" className="flex shrink-0 items-center" aria-label={label}>
      <Image unoptimized src={images.logoWhite} alt="" width={191} height={50} className="h-9 w-auto" />
    </a>
  );
}

export function Nav({ lang, t }: { lang: Locale; t: Dictionary["nav"] }) {
  const links = [
    { href: "#tours", label: t.tours },
    { href: "#about", label: t.about },
    { href: "#reviews", label: t.reviews },
    { href: "#faq", label: t.faq },
  ];
  const other = lang === "es" ? "en" : "es";

  // With motion the hero reveals the menu at the summit (see Ascent).
  return (
    <header
      data-autohide
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-basalt/70 backdrop-blur-md motion-safe:invisible motion-safe:opacity-0"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Logo label={t.backToTop} />
        <ul className="hidden gap-8 text-sm text-mist md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-snow">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`/${other}`}
            hrefLang={other}
            aria-label={t.switchLabel}
            className="rounded-full border border-ash-line px-3 py-2 font-mono text-xs text-mist uppercase transition-colors hover:border-snow hover:text-snow"
          >
            {other}
          </a>
          <a
            href={BOOKING_URL}
            data-magnetic
            className="rounded-full bg-lava px-4 py-2 text-sm font-semibold whitespace-nowrap sm:px-5 text-basalt transition-colors hover:bg-ember"
          >
            {t.book}
          </a>
        </div>
      </nav>
    </header>
  );
}
