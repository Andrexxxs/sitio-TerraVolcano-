import type { Dictionary } from "@/lib/i18n";

export function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-24 md:px-8 md:py-32">
      <p className="font-mono text-xs tracking-[0.3em] text-ember uppercase">{t.eyebrow}</p>
      <h2 data-split className="display mt-3 text-[clamp(2rem,10vw,2.5rem)] sm:text-5xl md:text-7xl">{t.title}</h2>
      <div className="mt-12 divide-y divide-ash-line border-y border-ash-line">
        {t.items.map((f) => (
          <details key={f.q} data-reveal className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-semibold transition-colors hover:text-lava">
              {f.q}
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-ash-line text-2xl text-lava transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-lava group-open:text-basalt" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-4 max-w-2xl text-mist">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
