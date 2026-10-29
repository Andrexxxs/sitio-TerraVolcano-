"use client";

import Image from "next/image";
import { useRef } from "react";
import { images } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

export function About({ t }: { t: Dictionary["about"] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".about-photo",
          { clipPath: "inset(100% 0% 0% 0% round 24px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: ".about-photo", start: "top 80%" },
          },
        );
        gsap.fromTo(
          ".about-photo img",
          { yPercent: 8, scale: 1.35 },
          {
            yPercent: -8,
            scale: 1.15,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );

        // The story lights up word by word as you read down.
        const story = SplitText.create(".about-body", { type: "words" });
        gsap.fromTo(
          story.words,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ".about-body", start: "top 85%", end: "bottom 45%", scrub: true },
          },
        );

        gsap.from(".stat", {
          y: 60,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".stats", start: "top 85%", once: true },
        });

        const values = gsap.timeline({ scrollTrigger: { trigger: ".values", start: "top 85%", once: true } });
        values
          .from(".value-line", { scaleX: 0, transformOrigin: "left center", stagger: 0.15, duration: 0.9, ease: "power3.inOut" })
          .from(".value-text", { y: 30, opacity: 0, stagger: 0.15, duration: 0.7, ease: "power3.out" }, 0.3);
      });
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="bg-snow py-24 text-basalt md:py-40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center md:gap-20 md:px-8">
        <div className="about-photo relative aspect-square overflow-hidden rounded-3xl [clip-path:inset(0%_0%_0%_0%_round_24px)]">
          <Image unoptimized src={images.flag} alt={t.photoAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="scale-125 object-cover" />
        </div>
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-lava uppercase">{t.eyebrow}</p>
          <h2 data-split className="display mt-3 text-[clamp(2rem,10vw,2.5rem)] sm:text-5xl md:text-6xl">
            {t.title}
          </h2>
          <p className="about-body mt-6 text-xl leading-relaxed md:text-2xl">{t.body}</p>
        </div>
      </div>

      <dl className="stats mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 md:mt-28 md:grid-cols-4 md:px-8">
        {t.stats.map((s) => (
          <div key={s.label} className="stat flex flex-col-reverse gap-2 border-l-2 border-lava pl-4">
            <dt className="text-sm text-basalt/70">{s.label}</dt>
            <dd className="display text-4xl whitespace-nowrap md:text-5xl lg:text-6xl">
              {s.prefix}
              <span data-counter={s.value} data-counter-from={s.from} {...(s.plain ? { "data-counter-plain": "" } : {})}>
                {s.display}
              </span>
              <span className="text-[0.5em]">{s.suffix}</span>
            </dd>
          </div>
        ))}
      </dl>

      <ul className="values mx-auto mt-20 grid max-w-7xl gap-10 px-4 md:mt-28 md:grid-cols-3 md:gap-px md:px-8">
        {t.values.map((v) => (
          <li key={v.title} className="pt-0 md:pr-10">
            <span className="value-line block h-0.5 bg-basalt" />
            <div className="value-text pt-6">
              <h3 className="display text-2xl">{v.title}</h3>
              <p className="mt-3 text-basalt/70">{v.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
