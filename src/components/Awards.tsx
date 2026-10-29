"use client";

import Image from "next/image";
import { useRef } from "react";
import { awardLogos } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export function Awards({ t }: { t: Dictionary["awards"] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        // Badges flip up one after another, then their logos settle.
        gsap
          .timeline({ scrollTrigger: { trigger: ".award-grid", start: "top 80%", once: true } })
          .from(".award-deal", {
            y: 120,
            rotationX: -70,
            opacity: 0,
            transformPerspective: 900,
            transformOrigin: "50% 100%",
            stagger: 0.14,
            duration: 1.1,
            ease: "power3.out",
          })
          .from(".award-logo", { scale: 0.6, opacity: 0, stagger: 0.14, duration: 0.8, ease: "back.out(2)" }, 0.35)
          .from(".award-line", { scaleX: 0, transformOrigin: "left center", stagger: 0.14, duration: 0.8, ease: "power3.inOut" }, 0.5);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-x-clip bg-snow pb-24 text-basalt md:pb-40">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="font-mono text-xs tracking-[0.3em] text-lava uppercase">{t.eyebrow}</p>
        <h2 data-split className="display mt-3 max-w-3xl text-[clamp(2rem,10vw,2.5rem)] sm:text-5xl md:text-6xl">
          {t.title}
        </h2>

        <ul className="award-grid mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((award) => (
            <li key={award.id} className="award-deal">
              <div
                data-tilt
                className="group h-full rounded-3xl border border-basalt/10 bg-white p-6 shadow-[0_10px_40px_-20px_rgba(20,16,14,0.35)] transition-[border-color,box-shadow] duration-500 hover:border-lava hover:shadow-[0_30px_60px_-25px_rgba(255,91,26,0.55)]"
              >
                <div className="award-logo flex aspect-[25/13] items-center justify-center overflow-hidden rounded-2xl">
                  <Image
                    unoptimized
                    src={awardLogos[award.id as keyof typeof awardLogos]}
                    alt={award.name}
                    width={250}
                    height={130}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="award-line mt-6 block h-0.5 bg-lava" />
                <p className="mt-4 text-basalt/75">{award.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
