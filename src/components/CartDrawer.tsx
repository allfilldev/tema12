'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { batches } from '@/content/site';
import { rupiah } from '@/lib/utils';
import { useCart } from './CartProvider';
import { Icon } from './Icon';
import { QtyInput } from './QtyInput';

export function CartDrawer() {
  const { items, subtotal, drawerOpen, setDrawerOpen, setQty, remove } = useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen, setDrawerOpen]);

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Keranjang belanja">
      <button type="button" aria-label="Tutup keranjang" className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <p className="text-sm font-medium tracking-[0.12em] uppercase">Keranjang ({items.length})</p>
          <button type="button" aria-label="Tutup keranjang" onClick={() => setDrawerOpen(false)} className="inline-flex size-11 items-center justify-center">
            <Icon name="close" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <Icon name="bag" size={40} stroke={1.2} className="text-faint" />
            <p className="text-muted">Keranjang Anda masih kosong.</p>
            <Link href="/koleksi" onClick={() => setDrawerOpen(false)} className="btn bg-brand text-white hover:bg-brand-2">
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map((it) => (
                <li key={it.key} className="flex gap-4 py-5">
                  <Image src={it.image} alt={it.name} width={88} height={88} className="size-22 shrink-0 bg-soft object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <Link href={`/produk/${it.slug}`} onClick={() => setDrawerOpen(false)} className="font-medium hover:text-brand">{it.name}</Link>
                      <button type="button" aria-label={`Hapus ${it.name}`} onClick={() => remove(it.key)} className="-mt-2 -mr-2 inline-flex size-10 shrink-0 items-center justify-center text-muted hover:text-sale">
                        <Icon name="trash" size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-muted">{it.variant} · {batches.find((b) => b.id === it.batch)?.name}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <QtyInput value={it.qty} onChange={(q) => setQty(it.key, q)} small label={it.name} />
                      <span className="font-medium">{rupiah(it.price * it.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-5 py-5">
              <div className="flex justify-between text-lg"><span>Subtotal</span><span className="font-medium">{rupiah(subtotal)}</span></div>
              <p className="mt-1 text-sm text-muted">DP 50%: {rupiah(Math.round(subtotal / 2))}. Ongkir dihitung saat konfirmasi.</p>
              <Link href="/keranjang" onClick={() => setDrawerOpen(false)} className="btn mt-4 w-full bg-brand text-white hover:bg-brand-2">
                Lanjut ke Checkout
              </Link>
              <button type="button" onClick={() => setDrawerOpen(false)} className="mt-2 min-h-11 w-full text-sm tracking-[0.08em] text-muted uppercase underline-offset-4 hover:underline">
                Lanjut Belanja
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
