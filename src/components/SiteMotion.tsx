"use client";

import { useRef } from "react";
import { FINE_POINTER, gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

// Page-wide animations driven by data attributes, so server components can opt in without JS of their own:
//   data-split        heading letters rise in when scrolled into view
//   data-reveal       element fades up (batched with its neighbours)
//   data-counter      number counts up; data-counter-from, data-counter-plain (no thousands separator)
//   data-marquee      track with two copies of its content loops sideways (value = % per second);
//                     scrolling speeds it up and scrolling up reverses it
//   data-zoom-out     image scales down to rest as its section scrolls in
//   data-magnetic     element leans toward the pointer
//   data-tilt         card tilts in 3D under the pointer
//   data-cursor       label shown in the custom cursor while hovering
//   data-autohide     header hides while scrolling down
export function SiteMotion() {
  const cursor = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const all = <T extends Element = HTMLElement>(selector: string) => gsap.utils.toArray<T>(selector);

    mm.add(MOTION_OK, () => {
      all("[data-split]").forEach((el) => {
        SplitText.create(el, {
          type: "chars,words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 120,
              opacity: 0,
              rotate: 8,
              stagger: 0.025,
              duration: 0.9,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        });
      });

      gsap.set("[data-reveal]", { autoAlpha: 0, y: 50 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out" }),
      });

      const locale = document.documentElement.lang === "es" ? "es-CL" : "en-US";
      all("[data-counter]").forEach((el) => {
        const to = Number(el.dataset.counter);
        const from = Number(el.dataset.counterFrom ?? 0);
        const format = new Intl.NumberFormat(locale, { useGrouping: !("counterPlain" in el.dataset) });
        const value = { n: from };
        el.textContent = format.format(from);
        gsap.to(value, {
          n: to,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => (el.textContent = format.format(Math.round(value.n))),
        });
      });

      all("[data-zoom-out]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.35 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      });

      // Marquees run on the ticker so they can loop forever in either direction.
      let direction = 1;
      let boost = 0;
      const wrap = gsap.utils.wrap(-50, 0);
      const marquees = all("[data-marquee]").map((track) => ({
        speed: Number(track.dataset.marquee) || -3,
        x: 0,
        setX: gsap.quickSetter(track, "xPercent"),
      }));
      const tick = (_time: number, deltaMs: number) => {
        marquees.forEach((m) => {
          m.x = wrap(m.x + m.speed * direction * (1 + boost) * (deltaMs / 1000));
          m.setX(m.x);
        });
        boost *= 0.94;
      };
      gsap.ticker.add(tick);

      const header = document.querySelector<HTMLElement>("[data-autohide]");
      // The hero shows the menu at the summit; auto-hiding only starts once the hero is over.
      const heroEnd = () => {
        const hero = document.getElementById("top");
        const box = hero?.parentElement?.classList.contains("pin-spacer") ? hero.parentElement : hero;
        return box ? box.offsetTop + box.offsetHeight : 0;
      };
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          direction = self.direction;
          boost = Math.max(boost, Math.min(Math.abs(self.getVelocity()) / 350, 7));
          if (header) {
            const hide = self.direction === 1 && self.scroll() > Math.max(heroEnd(), 160);
            gsap.to(header, { yPercent: hide ? -100 : 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
          }
        },
      });

      return () => gsap.ticker.remove(tick);
    });

    mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
      const cleanups: (() => void)[] = [];
      const listen = <K extends keyof HTMLElementEventMap>(el: HTMLElement | Window, type: K, fn: (e: HTMLElementEventMap[K]) => void) => {
        el.addEventListener(type, fn as EventListener);
        cleanups.push(() => el.removeEventListener(type, fn as EventListener));
      };

      all("[data-magnetic]").forEach((el) => {
        const toX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const toY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        listen(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          toX((e.clientX - (r.left + r.width / 2)) * 0.35);
          toY((e.clientY - (r.top + r.height / 2)) * 0.35);
        });
        listen(el, "pointerleave", () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
        });
      });

      all("[data-tilt]").forEach((el) => {
        gsap.set(el, { transformPerspective: 900 });
        const toRX = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
        const toRY = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
        listen(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          toRY(((e.clientX - r.left) / r.width - 0.5) * 14);
          toRX(-((e.clientY - r.top) / r.height - 0.5) * 14);
        });
        listen(el, "pointerleave", () => {
          toRX(0);
          toRY(0);
        });
      });

      // Custom cursor: a lava dot that grows over links and shows a label over cards.
      const dot = cursor.current!;
      const label = dot.querySelector("span")!;
      gsap.set(dot, { display: "flex", xPercent: -50, yPercent: -50 });
      const toX = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3.out" });
      const toY = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3.out" });
      let hovered: HTMLElement | null = null;
      listen(window, "pointermove", (e) => {
        toX(e.clientX);
        toY(e.clientY);
        const target = (e.target as Element).closest<HTMLElement>("[data-cursor], a, button, summary");
        if (target === hovered) return;
        hovered = target;
        const text = target?.dataset.cursor ?? "";
        label.textContent = text;
        const size = text ? 88 : target ? 44 : 14;
        gsap.to(dot, { width: size, height: size, opacity: target && !text ? 0.5 : 1, duration: 0.3, overwrite: "auto" });
      });

      return () => {
        cleanups.forEach((fn) => fn());
        gsap.set(dot, { display: "none" });
      };
    });
  });

  return (
    <div
      ref={cursor}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden size-3.5 items-center justify-center rounded-full bg-lava text-center font-mono text-[11px] font-semibold text-basalt uppercase"
    >
      <span />
    </div>
  );
}
