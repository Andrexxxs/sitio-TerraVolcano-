"use client";

import Image from "next/image";
import { useRef } from "react";
import { BOOKING_URL } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export type TourCard = {
  id: number;
  name: string;
  kind: string;
  duration: string;
  price: string;
  image: string;
  href: string;
};

const BACKDROP = "Villarrica · Quetrupillán · Lanín · Llaima · Lonquimay ·";

export function Tours({ t, tours }: { t: Dictionary["tours"]; tours: TourCard[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Cards deal in from below, each with a slight twist.
      mm.add(MOTION_OK, () => {
        // On a wrapper, so it never fights the pointer tilt on the card itself.
        gsap.from(".tour-deal", {
          y: 160,
          rotate: (i: number) => (i % 2 ? 7 : -7),
          opacity: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
      });

      // Desktop: vertical scroll drives the cards sideways. Mobile keeps a native swipe row.
      mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;

        // The track leans with scroll speed and springs back.
        const lean = { skew: 0 };
        const setSkew = gsap.quickSetter(track.current, "skewX", "deg");
        const clampSkew = gsap.utils.clamp(-10, 10);

        const slide = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const skew = clampSkew(self.getVelocity() / -250);
              if (Math.abs(skew) > Math.abs(lean.skew)) {
                lean.skew = skew;
                gsap.to(lean, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => setSkew(lean.skew) });
              }
            },
          },
        });

        // Photos drift inside their frames as the cards pass.
        gsap.utils.toArray<HTMLElement>(".tour-photo").forEach((photo) => {
          gsap.fromTo(
            photo,
            { xPercent: -10 },
            {
              xPercent: 10,
              ease: "none",
              scrollTrigger: { trigger: photo.parentElement, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
            },
          );
        });

        // Giant outlined names slide the opposite way behind the cards.
        gsap.fromTo(
          ".tours-backdrop",
          { xPercent: -40 },
          {
            xPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: () => `+=${distance() + window.innerHeight * 2}`, scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      id="tours"
      ref={root}
      className="relative overflow-hidden py-24 md:flex md:h-svh md:flex-col md:justify-center md:py-0"
    >
      <p
        aria-hidden="true"
        className="tours-backdrop outline-text display pointer-events-none absolute top-1/2 left-0 hidden -translate-y-1/2 text-[18vw] whitespace-nowrap text-ash-line md:block"
      >
        {BACKDROP} {BACKDROP}
      </p>

      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8">
        <p className="font-mono text-xs tracking-[0.3em] text-ember uppercase">{t.eyebrow}</p>
        <h2 data-split className="display mt-3 text-[clamp(2rem,10vw,2.5rem)] sm:text-5xl md:text-7xl">
          {t.title}
        </h2>
      </div>

      <div
        ref={track}
        className="relative mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:w-max md:snap-none md:overflow-visible md:px-8"
      >
        {tours.map((tour) => (
          <div key={tour.id} className="tour-deal shrink-0 snap-start">
            <a
              href={tour.href}
              data-tilt
              data-cursor={t.book}
              className="tour-card group relative block aspect-[3/4] w-[78vw] overflow-hidden rounded-3xl bg-ash md:h-[min(58svh,34rem)] md:w-auto"
            >
              <div className="tour-photo absolute inset-y-0 -left-[12%] w-[124%]">
                <Image
                  src={tour.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 32rem, 96vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-basalt via-basalt/30 to-transparent" />
              <div className="absolute inset-0 bg-lava opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-30" />
              <span className="absolute top-5 left-5 rounded-full bg-basalt/70 px-3 py-1 text-xs backdrop-blur">
                {tour.kind} · {tour.duration}
              </span>
              <div className="absolute inset-x-5 bottom-5 transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="display text-3xl">{tour.name}</h3>
                <p className="mt-2 flex items-center justify-between text-sm text-mist">
                  <span>
                    {t.from} <span className="font-semibold text-snow">{tour.price}</span> {t.perPerson}
                  </span>
                  <span className="text-lava transition-transform group-hover:translate-x-1">{t.book} →</span>
                </p>
              </div>
            </a>
          </div>
        ))}
        <div className="tour-deal shrink-0 snap-start">
          <a
            href={BOOKING_URL}
            data-tilt
            data-cursor={t.allTitle}
            className="tour-card flex aspect-[3/4] w-[78vw] flex-col justify-end rounded-3xl border border-ash-line bg-basalt p-6 transition-colors hover:border-lava hover:bg-lava hover:text-basalt md:h-[min(58svh,34rem)] md:w-auto"
          >
            <span className="display text-3xl">{t.allTitle}</span>
            <span className="mt-2 text-sm opacity-80">{t.allBody}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
