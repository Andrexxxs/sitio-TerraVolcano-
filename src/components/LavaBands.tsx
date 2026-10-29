// Two crossing ticker bands between sections; SiteMotion moves them (data-marquee).
export function LavaBands({ words }: { words: string[] }) {
  const line = (key: string) => (
    <span key={key} className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-6">{w}</span>
          <span className="text-[0.6em]">▲</span>
        </span>
      ))}
    </span>
  );

  return (
    <div aria-hidden="true" className="relative h-44 overflow-hidden md:h-60">
      <div className="absolute top-1/2 left-[-10%] w-[120%] -translate-y-1/2 rotate-[4deg] bg-snow py-3 text-basalt">
        <div data-marquee="2" className="display flex w-max text-2xl md:text-4xl">
          {line("a")}
          {line("b")}
        </div>
      </div>
      <div className="absolute top-1/2 left-[-10%] w-[120%] -translate-y-1/2 -rotate-[3deg] bg-lava py-4 text-basalt shadow-[0_20px_60px_-10px_rgba(255,91,26,0.5)]">
        <div data-marquee="-3" className="display flex w-max text-3xl md:text-5xl">
          {line("a")}
          {line("b")}
        </div>
      </div>
    </div>
  );
}
