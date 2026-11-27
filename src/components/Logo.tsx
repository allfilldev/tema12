import Link from 'next/link';
import { preload } from 'react-dom';
import { cn } from '@/lib/utils';

const SRC = '/brand/allfilldev-logo.png';

/**
 * Logo All Fill Dev satu warna. Bentuknya diambil dari PNG sebagai mask (.afd-logo-mark di globals.css),
 * warnanya mengikuti token --color-logo di blok @theme, jadi logo bisa disesuaikan dengan warna tema.
 * `light` = versi untuk latar gelap (token --color-logo-light). Atur tinggi lewat className (contoh: h-11).
 */
export function Logo({ light, priority, className, label = 'All Fill Dev, ke beranda' }: { light?: boolean; priority?: boolean; className?: string; label?: string }) {
  if (priority) preload(SRC, { as: 'image', fetchPriority: 'high' });
  return (
    <Link href="/" aria-label={label} className={cn('inline-flex aspect-[480/335] shrink-0', light ? 'text-logo-light' : 'text-logo', className)}>
      <span aria-hidden="true" className="afd-logo-mark" />
    </Link>
  );
}
