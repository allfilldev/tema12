'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { nav, site } from '@/content/site';
import { cn, WA_CONTACT_URL } from '@/lib/utils';
import { useCart } from './CartProvider';
import { Icon } from './Icon';
import { Logo } from './Logo';

function AnnouncementBar() {
  const [i, setI] = useState(0);
  const list = site.announcements;
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % list.length), 5000);
    return () => clearInterval(t);
  }, [list.length]);
  return (
    <div className="bg-brand text-white">
      <div className="container-page flex min-h-10 items-center justify-center gap-2 text-center text-[13px] tracking-[0.06em] uppercase">
        <button type="button" aria-label="Info sebelumnya" onClick={() => setI((v) => (v - 1 + list.length) % list.length)} className="hidden size-9 shrink-0 items-center justify-center sm:inline-flex">
          <Icon name="left" size={14} stroke={2} />
        </button>
        <p aria-live="polite" className="py-2">{list[i]}</p>
        <button type="button" aria-label="Info berikutnya" onClick={() => setI((v) => (v + 1) % list.length)} className="hidden size-9 shrink-0 items-center justify-center sm:inline-flex">
          <Icon name="right" size={14} stroke={2} />
        </button>
      </div>
    </div>
  );
}

/** Cari item menu yang paling cocok dengan URL sekarang (path + query). Halaman produk dianggap bagian dari Hampers Lebaran. */
function useActiveHref() {
  const pathname = usePathname();
  const params = useSearchParams();
  const path = pathname.startsWith('/produk/') ? '/koleksi' : pathname;
  let best: { href: string; score: number } | null = null;
  for (const n of nav) {
    const url = new URL(n.href, 'http://x');
    if (url.pathname !== path) continue;
    const entries = [...url.searchParams.entries()];
    if (!entries.every(([k, v]) => params.getAll(k).includes(v))) continue;
    if (!best || entries.length > best.score) best = { href: n.href, score: entries.length };
  }
  return best?.href ?? null;
}

function NavLinks({ variant }: { variant: 'desktop' | 'mobile' }) {
  const active = useActiveHref();
  return <NavList variant={variant} active={active} />;
}

function NavList({ variant, active }: { variant: 'desktop' | 'mobile'; active: string | null }) {
  if (variant === 'desktop')
    return (
      <ul className="flex flex-wrap justify-center gap-x-8 py-3 text-sm font-medium tracking-[0.08em] uppercase">
        {nav.map((n) => {
          const on = n.href === active;
          return (
            <li key={n.label}>
              <Link href={n.href} aria-current={on ? 'page' : undefined} className={cn('inline-block border-b py-1.5 transition-colors hover:text-sale', on ? 'border-sale text-sale' : 'border-transparent text-ink')}>
                {n.label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  return (
    <ul className="flex-1 overflow-y-auto px-4 py-2">
      {nav.map((n) => {
        const on = n.href === active;
        return (
          <li key={n.label} className="border-b border-line">
            <Link href={n.href} aria-current={on ? 'page' : undefined} className={cn('flex min-h-13 items-center justify-between text-[15px] tracking-[0.08em] uppercase', on && 'font-semibold text-sale')}>
              {n.label}
              <Icon name="right" size={16} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Header() {
  const pathname = usePathname();
  const { count, ready, setDrawerOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-page">
          <div className="grid grid-cols-[auto_1fr_auto] items-center py-3 lg:grid-cols-3 lg:pt-5 lg:pb-0">
            <div className="flex items-center">
              <button type="button" aria-label="Buka menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="inline-flex size-11 items-center justify-center lg:hidden">
                <Icon name="menu" size={22} />
              </button>
              <form action="/koleksi" role="search" className="hidden h-11 w-64 items-center gap-2 border border-[#d4d4d0] bg-soft px-3 transition-colors focus-within:border-ink focus-within:bg-white lg:flex">
                <label htmlFor="cari" className="sr-only">Cari hampers</label>
                <Icon name="search" size={18} className="shrink-0 text-muted" />
                <input id="cari" name="q" type="search" placeholder="Cari hampers" className="h-full min-w-0 flex-1 bg-transparent text-sm placeholder:text-muted focus:outline-none" />
              </form>
            </div>
            <Logo priority className="h-11 justify-self-center sm:h-14" />
            <div className="flex items-center justify-self-end">
              <Link href="/koleksi" aria-label="Cari hampers" className="inline-flex size-11 items-center justify-center lg:hidden">
                <Icon name="search" />
              </Link>
              <a href={WA_CONTACT_URL} aria-label="Hubungi via WhatsApp" className="hidden size-11 items-center justify-center lg:inline-flex">
                <Icon name="whatsapp" />
              </a>
              <button type="button" onClick={() => setDrawerOpen(true)} aria-label={`${ready ? count : 0} item di keranjang`} className="relative inline-flex size-11 items-center justify-center">
                <Icon name="bag" />
                <span className="absolute top-1 right-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[11px] text-white">{ready ? count : 0}</span>
              </button>
            </div>
          </div>
          <nav aria-label="Navigasi utama" className="hidden lg:block">
            <Suspense fallback={<NavList variant="desktop" active={null} />}>
              <NavLinks variant="desktop" />
            </Suspense>
          </nav>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" aria-label="Tutup menu" className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-white">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <Logo className="h-10" />
              <button type="button" aria-label="Tutup menu" onClick={() => setMenuOpen(false)} className="inline-flex size-11 items-center justify-center">
                <Icon name="close" />
              </button>
            </div>
            <div className="border-b border-line p-4">
              <form action="/koleksi" role="search" className="flex h-12 items-center gap-2 border border-[#d4d4d0] bg-soft px-3 focus-within:border-ink focus-within:bg-white">
                <Icon name="search" size={18} className="shrink-0 text-muted" />
                <label htmlFor="cari-m" className="sr-only">Cari hampers</label>
                <input id="cari-m" name="q" type="search" placeholder="Cari hampers" className="h-full min-w-0 flex-1 bg-transparent text-base focus:outline-none" />
              </form>
            </div>
            <Suspense fallback={<NavList variant="mobile" active={null} />}>
              <NavLinks variant="mobile" />
            </Suspense>
            <div className="border-t border-line p-4 text-sm text-muted">
              <p>{site.contact.whatsappDisplay}</p>
              <p>{site.contact.hours}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
