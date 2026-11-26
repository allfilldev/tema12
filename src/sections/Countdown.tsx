'use client';

import { useEffect, useState } from 'react';
import { site } from '@/content/site';

const pad = (n: number) => String(n).padStart(2, '0');

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return { hari: Math.floor(ms / 864e5), jam: Math.floor(ms / 36e5) % 24, menit: Math.floor(ms / 6e4) % 60, detik: Math.floor(ms / 1e3) % 60 };
}

export function Countdown() {
  const target = new Date(site.poDeadline).getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
      <span className="text-sm font-medium tracking-[0.08em] uppercase">Batch 1 ditutup dalam</span>
      <div className="flex gap-2" role="timer" aria-label="Sisa waktu pre-order Batch 1">
        {(['hari', 'jam', 'menit', 'detik'] as const).map((k) => (
          <span key={k} className="min-w-15 border border-line bg-white px-2 py-1.5 text-center">
            <span className="block text-2xl leading-tight font-medium tabular-nums">{t ? pad(t[k]) : '--'}</span>
            <span className="text-[11px] tracking-[0.08em] text-muted uppercase">{k}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
