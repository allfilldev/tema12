'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { heroSlides } from '@/content/site';
import { cn } from '@/lib/utils';

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = heroSlides.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section aria-roledescription="carousel" aria-label="Banner utama" className="relative h-[560px] overflow-hidden bg-brand-2 text-white sm:h-[620px]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {heroSlides.map((s, idx) => (
        <div key={s.title} aria-hidden={idx !== i} className={cn('absolute inset-0 transition-opacity duration-700', idx === i ? 'opacity-100' : 'pointer-events-none opacity-0')}>
          <Image src={s.image} alt="" fill priority={idx === 0} sizes="100vw" className="object-cover object-[70%_center]" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative flex h-full items-center justify-center px-5 text-center">
            <div className="max-w-2xl">
              <p className="kicker mb-4 text-sm">{s.kicker}</p>
              {idx === 0 ? (
                <h1 className="text-[40px] leading-[1.08] font-medium sm:text-6xl lg:text-7xl">{s.title}</h1>
              ) : (
                <h2 className="text-[40px] leading-[1.08] font-medium sm:text-6xl lg:text-7xl">{s.title}</h2>
              )}
              <p className="mx-auto mt-5 mb-8 max-w-lg text-lg text-white/90">{s.text}</p>
              <Link href={s.cta.href} tabIndex={idx === i ? 0 : -1} className="btn bg-white font-semibold text-brand hover:bg-soft">
                {s.cta.label}
              </Link>
            </div>
          </div>
        </div>
      ))}
      <button type="button" aria-label="Slide sebelumnya" onClick={() => setI((i - 1 + n) % n)} className="absolute top-1/2 left-3 hidden size-12 -translate-y-1/2 items-center justify-center border border-white/50 hover:bg-white/10 md:inline-flex">
        <Icon name="left" />
      </button>
      <button type="button" aria-label="Slide berikutnya" onClick={() => setI((i + 1) % n)} className="absolute top-1/2 right-3 hidden size-12 -translate-y-1/2 items-center justify-center border border-white/50 hover:bg-white/10 md:inline-flex">
        <Icon name="right" />
      </button>
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1">
        {heroSlides.map((s, idx) => (
          <button key={s.title} type="button" aria-label={`Ke slide ${idx + 1}`} aria-current={idx === i} onClick={() => setI(idx)} className="flex h-8 w-10 items-center justify-center">
            <span className={cn('h-[3px] w-7', idx === i ? 'bg-white' : 'bg-white/40')} />
          </button>
        ))}
      </div>
    </section>
  );
}
