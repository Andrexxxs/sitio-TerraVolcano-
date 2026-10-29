"use client";

import { useRef } from "react";
import { tourUrl } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import { FINE_POINTER, gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

type Step = Dictionary["steps"][number] & { metres: number; altitude: string };

// Where each step sits along the trail (0 = trailhead, 1 = crater rim).
const CHECKPOINTS = [0, 0.3, 0.68, 1];
// Scroll timeline (0–1): the climb with its steps, the summit finale with booking, then the dive into the crater.
const CLIMB_START = 0.03;
const CLIMB_END = 0.62;
const FINALE = 0.72;
const DIVE = 0.86;
// Centre of the crater in SVG coordinates; the camera pushes in and finally dives here.
const CRATER = "1080 303";
const at = (checkpoint: number) => CLIMB_START + checkpoint * (CLIMB_END - CLIMB_START);

const TRAIL =
  "M300 770 L520 702 L382 640 L560 576 L440 516 L592 456 L482 402 L612 346 L532 296 L622 248 L598 204";

// Deterministic flake positions so server and client render the same SVG.
const SNOW = Array.from({ length: 40 }, (_, i) => ({
  cx: (i * 397) % 1600,
  cy: (i * 233) % 900,
  r: 1.5 + (i % 3) * 0.8,
}));
const EMBERS = 14;

export function Ascent({ t, steps }: { t: Dictionary["hero"]; steps: Step[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const trail = root.current!.querySelector<SVGPathElement>("#trail")!;
      const climber = root.current!.querySelector<SVGGElement>("#climber")!;
      const altimeter = root.current!.querySelector<HTMLSpanElement>(".altimeter-value")!;
      const length = trail.getTotalLength();
      const format = new Intl.NumberFormat(document.documentElement.lang === "es" ? "es-CL" : "en-US");

      const pointAt = (progress: number) => trail.getPointAtLength(progress * length);
      const placeClimber = (progress: number) => {
        const { x, y } = pointAt(progress);
        climber.setAttribute("transform", `translate(${x} ${y})`);
        // Altitude interpolated between the checkpoint altitudes.
        const i = Math.min(CHECKPOINTS.findIndex((c) => c >= progress), CHECKPOINTS.length - 1);
        const metres =
          i <= 0
            ? steps[0].metres
            : gsap.utils.mapRange(CHECKPOINTS[i - 1], CHECKPOINTS[i], steps[i - 1].metres, steps[i].metres, progress);
        altimeter.textContent = format.format(Math.round(metres));
      };

      gsap.utils.toArray<SVGGElement>(".checkpoint").forEach((g, i) => {
        const { x, y } = pointAt(CHECKPOINTS[i]);
        g.setAttribute("transform", `translate(${x} ${y})`);
      });
      placeClimber(1);

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Ambient life: smoke, glowing crater, embers, snow and the climber's pulse.
        gsap.utils.toArray<SVGCircleElement>(".smoke").forEach((puff, i) => {
          gsap.fromTo(
            puff,
            { y: 0, x: 0, scale: 0.4, opacity: 0.55 },
            { y: -190, x: 70 + i * 14, scale: 1.9, opacity: 0, duration: 6, ease: "sine.out", repeat: -1, delay: i * 1.2 },
          );
        });
        gsap.to(".crater-glow", { opacity: 0.5, duration: 1.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.utils.toArray<SVGCircleElement>(".ember").forEach((ember, i) => {
          gsap.fromTo(
            ember,
            { x: () => gsap.utils.random(-60, 60), y: 0, opacity: 1, scale: () => gsap.utils.random(0.6, 1.4) },
            {
              x: () => gsap.utils.random(-140, 140),
              y: () => gsap.utils.random(-280, -150),
              opacity: 0,
              scale: 0.2,
              duration: () => gsap.utils.random(1.4, 2.8),
              ease: "power1.out",
              repeat: -1,
              repeatRefresh: true,
              delay: i * 0.22,
            },
          );
        });
        gsap.utils.toArray<SVGCircleElement>(".flake").forEach((flake, i) => {
          const { cy } = SNOW[i];
          gsap
            .fromTo(
              flake,
              { y: -cy - 20 },
              { y: 920 - cy, x: (i % 2 ? 1 : -1) * 40, duration: 14 + (i % 5) * 3, ease: "none", repeat: -1 },
            )
            .progress((i * 0.37) % 1);
        });
        gsap.to(".climber-pulse", { scale: 2.6, opacity: 0, transformOrigin: "50% 50%", duration: 1.4, repeat: -1, ease: "power2.out" });
        gsap.to(".hint-wheel", { y: 12, opacity: 0, duration: 1.4, repeat: -1, ease: "power2.in" });

        // Entrance on load: only the volcano, no text.
        gsap
          .timeline({ delay: 0.15 })
          .from(".volcano-rise", { y: 140, opacity: 0, duration: 1.6, ease: "power3.out" })
          .from(".ridge-parallax", { y: 60, opacity: 0, duration: 1.4, ease: "power3.out" }, 0.1)
          .from(".hero-hint-inner", { autoAlpha: 0, y: 12, duration: 0.6 }, 1.2);

        // Scroll: the climb, step by step; the finale with booking at the summit; then the dive.
        const stepPanels = gsap.utils.toArray<HTMLElement>(".hero-step");
        const markers = gsap.utils.toArray<SVGCircleElement>(".checkpoint circle");
        const stepTitles = gsap.utils.toArray<HTMLElement>(".step-title").map((el) => SplitText.create(el, { type: "chars,words" }));
        const stepNumbers = gsap.utils.toArray<HTMLElement>(".step-number");
        const finaleTitle = SplitText.create(".hero-title", { type: "chars,words" });
        const header = document.querySelector<HTMLElement>("[data-autohide]");
        const climb = { progress: 0 };
        placeClimber(0);
        gsap.set(".trail-progress", { strokeDasharray: length, strokeDashoffset: length });
        gsap.set(".summit-flag", { scaleY: 0, transformOrigin: "50% 100%" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=550%", scrub: 0.8, pin: true },
        });

        const climbDuration = CLIMB_END - CLIMB_START;
        tl.to(".hero-hint", { autoAlpha: 0, duration: 0.03 }, 0)
          .fromTo(".hero-altimeter", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, 0.01)
          .to(".trail-progress", { strokeDashoffset: 0, duration: climbDuration }, CLIMB_START)
          .to(climb, { progress: 1, duration: climbDuration, onUpdate: () => placeClimber(climb.progress) }, CLIMB_START)
          .fromTo(".volcano-camera", { scale: 1 }, { scale: 1.1, svgOrigin: CRATER, duration: climbDuration }, CLIMB_START)
          .to(".far-ridge", { y: 50, duration: climbDuration }, CLIMB_START)
          .to(".summit-flag", { scaleY: 1, duration: 0.03, ease: "back.out(3)" }, CLIMB_END)
          .fromTo(".summit-burst", { scale: 0, opacity: 0.9 }, { scale: 6, opacity: 0, transformOrigin: "50% 50%", duration: 0.05, ease: "power2.out" }, CLIMB_END);

        CHECKPOINTS.forEach((checkpoint, i) => {
          const time = at(checkpoint);
          tl.to(markers[i], { attr: { fill: "#ff5b1a" }, duration: 0.01 }, Math.max(time - 0.01, CLIMB_START));
          if (i > 0) tl.to(stepPanels[i - 1], { autoAlpha: 0, y: -30, duration: 0.04 }, time - 0.05);
          tl.fromTo(stepPanels[i], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.04 }, time - 0.01)
            .from(stepTitles[i].chars, { yPercent: 120, opacity: 0, stagger: 0.002, duration: 0.03, ease: "power3.out" }, time - 0.01)
            .from(stepNumbers[i], { xPercent: -25, opacity: 0, duration: 0.05, ease: "power2.out" }, time - 0.01);
        });

        // At the summit: the title, booking buttons and the menu appear.
        tl.to(stepPanels.at(-1)!, { autoAlpha: 0, y: -30, duration: 0.04 }, FINALE - 0.05)
          .fromTo(".hero-finale", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, FINALE - 0.01)
          .from(finaleTitle.chars, { yPercent: 120, opacity: 0, rotate: 8, stagger: 0.003, duration: 0.04, ease: "power4.out" }, FINALE)
          .from([".hero-eyebrow", ".hero-lead", ".hero-actions"], { y: 30, opacity: 0, stagger: 0.012, duration: 0.03 }, FINALE + 0.02);
        if (header) tl.fromTo(header, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, FINALE);

        // Dive into the crater; the dark inside becomes the next section's background.
        tl.to(".hero-finale", { autoAlpha: 0, y: -30, duration: 0.04 }, DIVE)
          .to(".hero-altimeter", { autoAlpha: 0, duration: 0.04 }, DIVE)
          .to(["#climber", ".summit-flag", ".checkpoint", ".trail-line", ".snow-layer"], { autoAlpha: 0, duration: 0.04 }, DIVE)
          .to(".volcano-camera", { scale: 30, svgOrigin: CRATER, duration: 1 - DIVE, ease: "power3.in" }, DIVE)
          .to(".hero-fade", { opacity: 1, duration: 0.05 }, 0.95);
      });

      // Depth: layers drift with the pointer on desktop.
      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        const layers = [
          { el: ".ridge-parallax", x: -30, y: -12 },
          { el: ".volcano-parallax", x: 16, y: 8 },
          { el: ".snow-layer", x: 45, y: 20 },
        ].map((l) => ({
          ...l,
          toX: gsap.quickTo(l.el, "x", { duration: 1.2, ease: "power3.out" }),
          toY: gsap.quickTo(l.el, "y", { duration: 1.2, ease: "power3.out" }),
        }));
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.toX(nx * l.x);
            l.toY(ny * l.y);
          });
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
      });
    },
    { scope: root },
  );

  // With motion, every text block starts hidden and shares one grid cell; GSAP reveals them while climbing.
  // Without motion they stack: the steps, then the finale.
  const stacked = "motion-safe:invisible motion-safe:col-start-1 motion-safe:row-start-1 motion-safe:opacity-0";

  return (
    <section id="top" ref={root} className="relative overflow-hidden bg-basalt motion-safe:h-svh">
      <div className="relative mx-auto aspect-[880/840] w-full max-w-[calc(56svh*880/840)] overflow-hidden md:max-lg:[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] lg:absolute lg:inset-0 lg:aspect-auto lg:max-w-none">
        <Volcano label={t.illustration} />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-basalt via-basalt/70 to-transparent lg:block" />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 md:px-8 lg:flex lg:h-full lg:items-center lg:pb-0">
        <div className="grid gap-12 lg:max-w-xl">
          {steps.map((s, i) => (
            <div key={s.title} className={`hero-step relative ${stacked}`}>
              <span
                aria-hidden="true"
                className="step-number outline-text display pointer-events-none absolute -top-40 -left-3 hidden text-[12rem] text-lava/30 lg:block"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="relative font-mono text-sm text-lava">
                {String(i + 1).padStart(2, "0")} · {s.altitude}
              </p>
              <h2 className="step-title display relative mt-2 text-3xl sm:text-4xl lg:text-5xl">{s.title}</h2>
              <p className="relative mt-3 text-mist lg:text-lg">{s.body}</p>
            </div>
          ))}

          <div className={`hero-finale ${stacked}`}>
            <p className="hero-eyebrow font-mono text-xs tracking-[0.3em] text-ember uppercase">{t.eyebrow}</p>
            <h1 className="hero-title display mt-3 text-[clamp(2.25rem,11.5vw,3rem)] sm:text-6xl lg:text-7xl">
              {t.title[0]}
              <br />
              <span className="text-lava">{t.title[1]}</span>
            </h1>
            <p className="hero-lead mt-4 text-mist lg:text-lg">{t.lead}</p>
            <div className="hero-actions mt-6 flex flex-wrap gap-3">
              <a
                href={tourUrl(1660)}
                data-magnetic
                className="rounded-full bg-lava px-7 py-3 font-semibold text-basalt transition-colors hover:bg-ember"
              >
                {t.cta}
              </a>
              <a
                href="#tours"
                data-magnetic
                className="rounded-full border border-snow/40 px-7 py-3 font-semibold transition-colors hover:border-snow"
              >
                {t.secondary}
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="hero-altimeter absolute top-20 right-4 text-right font-mono text-xs leading-tight text-mist motion-safe:invisible motion-safe:opacity-0 md:right-8 lg:top-auto lg:bottom-8">
        {t.altitude}
        <br />
        <span className="altimeter-value text-xl text-snow">{steps.at(-1)!.metres}</span> m
      </p>

      <div className="hero-hint absolute inset-x-0 bottom-8 hidden justify-center motion-safe:flex">
        <span className="sr-only">{t.hint}</span>
        <span aria-hidden="true" className="hero-hint-inner flex h-11 w-7 justify-center rounded-full border-2 border-snow/50 pt-2">
          <span className="hint-wheel block h-2 w-1 rounded-full bg-lava" />
        </span>
      </div>

      <div className="hero-fade pointer-events-none absolute inset-0 bg-basalt opacity-0" aria-hidden="true" />
    </section>
  );
}

function Volcano({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMaxYMax slice"
      // Below lg the 16:9 drawing is cropped by CSS to the volcano (x 640–1520, y 60–900).
      className="absolute top-0 left-0 aspect-[16/9] w-[181.82%] max-w-none -translate-x-[40%] -translate-y-[6.67%] lg:aspect-auto lg:h-full lg:w-full lg:translate-x-0 lg:translate-y-0"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14100e" />
          <stop offset="1" stopColor="#2a1d17" />
        </linearGradient>
        <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b302a" />
          <stop offset="1" stopColor="#1b1512" />
        </linearGradient>
        <linearGradient id="snow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f3efe8" />
          <stop offset="0.6" stopColor="#d9d2c8" />
          <stop offset="1" stopColor="#a9a097" />
        </linearGradient>
        <radialGradient id="lava" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffb547" />
          <stop offset="0.6" stopColor="#ff5b1a" />
          <stop offset="1" stopColor="#ff5b1a" stopOpacity="0" />
        </radialGradient>
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <rect width="1600" height="900" fill="url(#sky)" />
      <g className="ridge-parallax">
        <path
          className="far-ridge"
          d="M-60 960 L-60 600 L120 560 L230 600 L340 520 L450 575 L560 545 L640 600 L1360 600 L1430 540 L1500 575 L1660 530 L1660 960 Z"
          fill="#241e1a"
        />
      </g>

      <g className="volcano-rise">
        <g className="volcano-parallax">
          <g className="volcano-camera">
            {/* The volcano is drawn in a 1200×800 space and shifted right so text can sit on its left. */}
            <g transform="translate(480 100)">
              <g transform="translate(600 185)">
                {[0, 1, 2, 3, 4].map((i) => (
                  <circle key={i} className="smoke" r="34" cx={i * 6 - 12} fill="#8d837a" opacity="0.25" />
                ))}
              </g>
              <ellipse className="crater-glow" cx="600" cy="195" rx="140" ry="40" fill="url(#lava)" filter="url(#blur)" opacity="0.9" />
              <g transform="translate(600 200)">
                {Array.from({ length: EMBERS }, (_, i) => (
                  <circle key={i} className="ember" r={i % 3 ? 3 : 4.5} fill={i % 2 ? "#ffb547" : "#ff5b1a"} opacity="0" />
                ))}
              </g>

              <path d="M20 820 L470 212 Q520 186 560 193 L640 193 Q680 186 730 212 L1180 820 Z" fill="url(#cone)" />
              <path
                d="M300 452 L470 212 Q520 186 560 193 L640 193 Q680 186 730 212 L900 452 L860 436 L810 466 L752 428 L700 462 L640 430 L572 468 L512 426 L452 462 L392 430 L340 460 Z"
                fill="url(#snow)"
              />
              <path d="M470 212 Q520 186 560 193 L640 193 Q680 186 730 212 Q600 228 470 212 Z" fill="#14100e" />
              <ellipse cx="600" cy="205" rx="70" ry="6" fill="#ff5b1a" opacity="0.8" />

              {/* Trail: faint full route, a glow, and the progress drawn on top */}
              <path
                className="trail-line"
                d={TRAIL}
                fill="none"
                stroke="#f3efe8"
                strokeOpacity="0.3"
                strokeWidth="3"
                strokeDasharray="2 10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="trail-line trail-progress"
                d={TRAIL}
                fill="none"
                stroke="#ff5b1a"
                strokeOpacity="0.55"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />
              <path
                id="trail"
                className="trail-line trail-progress"
                d={TRAIL}
                fill="none"
                stroke="#ff5b1a"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {CHECKPOINTS.map((_, i) => (
                <g key={i} className="checkpoint">
                  <circle r="10" fill="#14100e" stroke="#f3efe8" strokeWidth="3" />
                  <text x={i % 2 ? -20 : 20} y="6" textAnchor={i % 2 ? "end" : "start"} className="fill-snow font-mono text-[20px]">
                    {String(i + 1).padStart(2, "0")}
                  </text>
                </g>
              ))}

              <circle className="summit-burst" cx="598" cy="204" r="20" fill="none" stroke="#ffb547" strokeWidth="3" opacity="0" />
              <g className="summit-flag" transform="translate(598 204)">
                <line x1="0" y1="0" x2="0" y2="-50" stroke="#f3efe8" strokeWidth="3" />
                <path d="M0 -50 L34 -41 L0 -30 Z" fill="#ff5b1a" />
              </g>

              <g id="climber">
                <circle className="climber-pulse" r="12" fill="none" stroke="#ffb547" strokeWidth="3" />
                <circle r="20" fill="#ff5b1a" opacity="0.3" />
                <circle r="9" fill="#ffb547" stroke="#14100e" strokeWidth="2" />
              </g>
            </g>
          </g>
        </g>
      </g>

      <g className="snow-layer" fill="#f3efe8" opacity="0.55">
        {SNOW.map((f, i) => (
          <circle key={i} className="flake" cx={f.cx} cy={f.cy} r={f.r} />
        ))}
      </g>
    </svg>
  );
}
