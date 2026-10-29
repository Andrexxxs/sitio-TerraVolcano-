import Image from "next/image";
import { BOOKING_URL, contact, images, whatsappUrl } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import { Logo } from "./Nav";

export function Contact({ t, backToTop }: { t: Dictionary["contact"]; backToTop: string }) {
  const whatsapp = whatsappUrl(t.whatsappMessage);

  return (
    <footer>
      <section className="relative overflow-hidden">
        <div data-zoom-out className="absolute inset-0">
          <Image unoptimized src={images.sliding} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-basalt/60" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-32 md:px-8 md:py-48">
          <h2 data-split className="display max-w-4xl text-[clamp(2rem,10vw,2.5rem)] sm:text-5xl md:text-8xl">
            {t.title[0]} <span className="text-lava">{t.title[1]}</span>
          </h2>
          <div className="flex flex-wrap gap-4">
            <a href={BOOKING_URL} data-magnetic className="rounded-full bg-lava px-7 py-3 font-semibold text-basalt transition-colors hover:bg-ember">
              {t.book}
            </a>
            <a href={whatsapp} data-magnetic className="rounded-full border border-snow/40 px-7 py-3 font-semibold transition-colors hover:border-snow">
              {t.whatsapp}
            </a>
          </div>
        </div>
      </section>

      <div data-reveal className="mx-auto grid max-w-7xl gap-10 px-4 py-14 text-sm text-mist md:grid-cols-4 md:px-8">
        <Logo label={backToTop} />
        <address className="not-italic">
          {contact.address.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </address>
        <a href={whatsapp} className="hover:text-snow">
          {contact.phone}
        </a>
        <p className="flex gap-6">
          <a href={contact.instagram} className="hover:text-snow">Instagram</a>
          <a href={contact.facebook} className="hover:text-snow">Facebook</a>
          <a href={contact.tripadvisor} className="hover:text-snow">Tripadvisor</a>
        </p>
      </div>
    </footer>
  );
}
