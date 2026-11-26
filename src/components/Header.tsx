'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useId, useRef, useState } from 'react';
import { desktopNav, nav, site, type NavLink, type NavMenu } from '@/content/site';
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
      <div className="container-page flex min-h-9 items-center justify-center gap-2 text-center text-xs tracking-[0.08em] uppercase">
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

const isMenu = (item: NavLink | NavMenu): item is NavMenu => 'groups' in item;

const desktopLinks: NavLink[] = desktopNav.flatMap((item) => (isMenu(item) ? item.groups.flatMap((g) => g.items) : [item]));

/** Cari item menu yang paling cocok dengan URL sekarang (path + query). Halaman produk dianggap bagian dari Hampers Lebaran. */
function useActiveHref(list: NavLink[]) {
  const pathname = usePathname();
  const params = useSearchParams();
  const path = pathname.startsWith('/produk/') ? '/koleksi' : pathname;
  let best: { href: string; score: number } | null = null;
  for (const n of list) {
    const url = new URL(n.href, 'http://x');
    if (url.pathname !== path) continue;
    const entries = [...url.searchParams.entries()];
    if (!entries.every(([k, v]) => params.getAll(k).includes(v))) continue;
    if (!best || entries.length > best.score) best = { href: n.href, score: entries.length };
  }
  return best?.href ?? null;
}

const linkClass = (on: boolean) =>
  cn('inline-flex items-center gap-1.5 border-b py-1.5 transition-colors hover:text-sale', on ? 'border-sale text-sale' : 'border-transparent text-ink');

function GiftMenu({ menu, active }: { menu: NavMenu; active: string | null }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();
  const on = menu.groups.some((g) => g.items.some((i) => i.href === active));

  useEffect(() => setOpen(false), [pathname]);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <li
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(linkClass(on), 'tracking-[inherit] uppercase', open && !on && 'border-ink')}
      >
        {menu.label}
        <Icon name="down" size={12} stroke={2.2} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      <div id={panelId} hidden={!open} className="absolute inset-x-0 top-full border-t border-line bg-white shadow-[0_12px_24px_rgba(0,0,0,0.08)]">
        <div className="container-page grid grid-cols-[repeat(3,minmax(0,1fr))_1.3fr] gap-10 py-8 normal-case tracking-normal">
          {menu.groups.map((g) => (
            <div key={g.title}>
              <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-brand uppercase">{g.title}</p>
              <ul className="space-y-1.5 text-[15px] font-normal">
                {g.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} onClick={() => setOpen(false)} aria-current={i.href === active ? 'page' : undefined} className={cn('hover:text-sale', i.href === active ? 'text-sale' : 'text-ink')}>
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link href={menu.feature.href} onClick={() => setOpen(false)} className="group relative block h-40 overflow-hidden text-white">
            <Image src={menu.feature.image} alt="" fill sizes="360px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent to-60%" />
            <span className="absolute bottom-3.5 left-4 text-[13px] font-semibold tracking-[0.1em] uppercase">{menu.feature.label}</span>
          </Link>
        </div>
      </div>
    </li>
  );
}

function DesktopNavList({ active }: { active: string | null }) {
  return (
    <ul className="flex items-center gap-x-8 text-[13px] font-medium tracking-[0.08em] whitespace-nowrap uppercase">
      {desktopNav.map((item) =>
        isMenu(item) ? (
          <GiftMenu key={item.label} menu={item} active={active} />
        ) : (
          <li key={item.label}>
            <Link href={item.href} aria-current={item.href === active ? 'page' : undefined} className={linkClass(item.href === active)}>
              {item.label}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}

function DesktopNav() {
  const active = useActiveHref(desktopLinks);
  return <DesktopNavList active={active} />;
}

function MobileNav() {
  const active = useActiveHref(nav);
  return <MobileNavList active={active} />;
}

function MobileNavList({ active }: { active: string | null }) {
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
        <div className="container-page grid grid-cols-[1fr_auto_1fr] items-center py-3 lg:flex lg:h-18 lg:gap-10 lg:py-0">
          <div className="flex items-center lg:hidden">
            <button type="button" aria-label="Buka menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="inline-flex size-11 items-center justify-center">
              <Icon name="menu" size={22} />
            </button>
          </div>
          <Logo priority className="h-11 justify-self-center sm:h-14 lg:h-11" />
          <nav aria-label="Navigasi utama" className="hidden flex-1 lg:block">
            <Suspense fallback={<DesktopNavList active={null} />}>
              <DesktopNav />
            </Suspense>
          </nav>
          <div className="flex items-center justify-self-end">
            <Link href="/koleksi" aria-label="Cari hampers" className="inline-flex size-11 items-center justify-center lg:hidden">
              <Icon name="search" />
            </Link>
            <a href={WA_CONTACT_URL} className="mr-2 hidden h-10 items-center gap-2 border border-ink px-3.5 text-xs font-medium tracking-[0.08em] uppercase transition-colors hover:bg-ink hover:text-white lg:inline-flex">
              <Icon name="whatsapp" size={16} className="text-[#25D366]" />
              Chat Admin
            </a>
            <button type="button" onClick={() => setDrawerOpen(true)} aria-label={`${ready ? count : 0} item di keranjang`} className="relative inline-flex size-11 items-center justify-center">
              <Icon name="bag" />
              <span className="absolute top-1 right-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[11px] text-white">{ready ? count : 0}</span>
            </button>
          </div>
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
            <Suspense fallback={<MobileNavList active={null} />}>
              <MobileNav />
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
