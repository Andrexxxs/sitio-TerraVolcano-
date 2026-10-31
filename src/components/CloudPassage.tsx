"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Dictionary } from "@/lib/i18n";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** A reversible cloud wipe between the illustrated ascent and the expeditions. */
export function CloudPassage({ t }: { t: Dictionary["clouds"] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const route = root.current!.querySelector<SVGPathElement>(".cloud-route-line")!;
        const length = route.getTotalLength();
        gsap.set(".cloud-night", { opacity: 1 });
        gsap.set(route, { strokeDasharray: length, strokeDashoffset: length });
        gsap.set(".cloud-destination", { autoAlpha: 0, y: 36 });
        gsap.set(".cloud-invitation", { display: "flex", autoAlpha: 1 });
        gsap.set(".cloud-veil--back", { autoAlpha: 1, yPercent: 46, xPercent: -3 });
        gsap.set(".cloud-veil--front", { autoAlpha: 1, yPercent: 54, xPercent: 3 });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (window.innerWidth < 768 ? 1.2 : 1.7)}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(".cloud-photo", { scale: 1.16, yPercent: 4 }, { scale: 1, yPercent: -2, duration: 1 }, 0)
          .to(".cloud-invitation", { autoAlpha: 0, y: -28, duration: 0.16 }, 0.08)
          .to(".cloud-veil--back", { yPercent: -61, xPercent: 4, duration: 0.76 }, 0)
          .to(".cloud-veil--front", { yPercent: -63, xPercent: -4, duration: 0.8 }, 0.04)
          .to(".cloud-night", { opacity: 0, duration: 0.35 }, 0.36)
          .to(".cloud-destination", { autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.04, ease: "power2.out" }, 0.58)
          .to(route, { strokeDashoffset: 0, duration: 0.25 }, 0.64)
          .fromTo(".cloud-route-beacon", { scale: 0 }, { scale: 1, transformOrigin: "50% 50%", duration: 0.08 }, 0.86);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="above-the-clouds" className="cloud-passage" aria-labelledby="cloud-title">
      <div className="cloud-photo">
        <Image src="/images/cloud-summit.jpg" alt={t.photoAlt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="cloud-shade" aria-hidden="true" />
      <div className="cloud-night" aria-hidden="true" />

      <div className="cloud-invitation" aria-hidden="true">
        <span className="cloud-kicker">Terra Volcano / {t.eyebrow}</span>
        <p className="display">{t.invitation}</p>
        <span>{t.invitationBody}</span>
        <svg viewBox="0 0 24 40" width="24" height="40" fill="none">
          <path d="M12 1v34m-7-7 7 7 7-7" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="cloud-veil cloud-veil--back" aria-hidden="true" />
      <div className="cloud-veil cloud-veil--front" aria-hidden="true" />

      <div className="cloud-content">
        <p className="cloud-destination cloud-kicker"><span />{t.eyebrow}</p>
        <h2 id="cloud-title" className="cloud-destination display">
          {t.title[0]}<br /><span>{t.title[1]}</span>
        </h2>
        <p className="cloud-destination cloud-body">{t.body}</p>
        <a href="#tours" className="cloud-destination cloud-cta">
          {t.cta}<span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="cloud-route cloud-destination">
        <svg viewBox="0 0 220 300" fill="none" aria-hidden="true">
          <path d="M0 265q95-150 220-10M0 240q100-150 220-10M0 215q105-150 220-10M0 190q110-150 220-10M0 165q115-150 220-10" stroke="currentColor" opacity=".15" />
          <path className="cloud-route-line" d="M22 281c110-32 15-72 86-98s-31-59 32-90 17-36 43-62" stroke="#ffb547" strokeWidth="2" strokeLinecap="round" />
          <g className="cloud-route-beacon">
            <circle cx="183" cy="31" r="13" stroke="#ffb547" opacity=".5" />
            <circle cx="183" cy="31" r="4" fill="#ffb547" />
          </g>
        </svg>
        <span className="cloud-route-altitude">{t.altitude}</span>
        <span className="cloud-kicker">{t.summit}</span>
      </div>

      <div className="cloud-footer cloud-destination">
        <span>01 / Terra Volcano</span>
        <a href="#tours">{t.scroll}<span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
