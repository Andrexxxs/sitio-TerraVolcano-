import Image from "next/image";
import { contact, images } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";

export function Reviews({ t }: { t: Dictionary["reviews"] }) {
  // Duplicate the list so the CSS marquee can loop seamlessly at -50%.
  const loop = [...t.items, ...t.items];

  return (
    <section id="reviews" className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 md:px-8">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-ember uppercase">{t.eyebrow}</p>
          <h2 data-split className="display mt-3 text-[clamp(2rem,10vw,2.5rem)] sm:text-5xl md:text-7xl">{t.title}</h2>
        </div>
        <a href={contact.tripadvisor} data-reveal className="flex items-center gap-4 text-sm text-mist hover:text-snow">
          <Image unoptimized src={images.tripadvisor} alt={t.badgeAlt} width={64} height={64} className="rounded-xl" />
          {t.all}
        </a>
      </div>

      <div className="mt-14 flex">
        <ul data-marquee="-2.5" className="flex shrink-0 gap-5 pl-5">
          {loop.map((r, i) => (
            <li
              key={i}
              aria-hidden={i >= t.items.length}
              className="w-[80vw] shrink-0 rounded-3xl border border-ash-line bg-ash p-8 transition-[transform,border-color] duration-500 hover:-translate-y-2 hover:-rotate-1 hover:border-lava md:w-[30rem]"
            >
              <p className="text-ember" aria-label={t.stars}>★★★★★</p>
              <blockquote className="mt-4 text-xl leading-snug">“{r.quote}”</blockquote>
              <p className="mt-6 text-sm text-mist">{r.author} · Tripadvisor</p>
            </li>
          ))}
        </ul>
      </div>
      {t.note && <p className="mx-auto mt-6 max-w-7xl px-4 text-xs text-mist md:px-8">{t.note}</p>}
    </section>
  );
}
