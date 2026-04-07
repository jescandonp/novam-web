"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 50, suffix: "+", label: "Instalaciones en Colombia" },
  { value: 3, suffix: "", label: "Tecnologías líderes mundiales" },
  { value: 10, suffix: "+", label: "Sectores industriales" },
  { value: 6, suffix: "+", label: "Años como partner Smar" },
  { value: 3, suffix: "", label: "Oficinas en Colombia" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const startTime = performance.now();

          function update(now: number) {
            const elapsed = Math.min((now - startTime) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - elapsed, 3);
            setDisplay(Math.round(eased * value));
            if (elapsed < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section
      className="bg-nova-blue py-14"
      aria-label="Estadísticas Nova Measurement"
    >
      <div className="container mx-auto max-w-[1280px] px-6 lg:px-8">
        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={[
                "flex flex-col items-center text-center gap-2",
                i < STATS.length - 1
                  ? "lg:border-r lg:border-white/20"
                  : "",
              ].join(" ")}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd
                className="font-display font-black text-4xl text-white leading-none"
                aria-live="polite"
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </dd>
              <p className="text-xs text-white/65 font-sans leading-tight max-w-[120px]">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
