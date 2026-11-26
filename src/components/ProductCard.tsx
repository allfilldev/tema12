'use client';

import Image from 'next/image';
import Link from 'next/link';
import { minCompareAt, minPrice } from '@/content/products';
import { batches, categories } from '@/content/site';
import type { Product } from '@/content/types';
import { cn, rupiah, WA_CONTACT_URL } from '@/lib/utils';
import { useCart } from './CartProvider';
import { Icon } from './Icon';

const activeBatch = batches.find((b) => b.status === 'Dibuka')!;
const nextBatch = batches.find((b) => b.status === 'Segera')!;

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { add } = useCart();
  const price = minPrice(product);
  const compareAt = minCompareAt(product);
  const multi = product.variants.length > 1;
  const soldOut = !!product.soldOutBatches?.includes(activeBatch.id) || product.quota.booked >= product.quota.total;
  const shipBatch = soldOut ? nextBatch : activeBatch;
  const left = product.quota.total - product.quota.booked;
  const pct = Math.min(100, Math.round((product.quota.booked / product.quota.total) * 100));
  const scarce = !soldOut && pct >= 80;
  const href = `/produk/${product.slug}`;
  const category = categories.find((c) => c.id === product.category)?.label;
  const badge = compareAt ? `${product.badge === 'Early bird' ? 'Early bird' : 'Hemat'} ${Math.round((1 - price / compareAt) * 100)}%` : product.badge === 'Baru' ? 'Baru' : null;

  const quotaText = soldOut
    ? `${activeBatch.name} penuh, lanjut ${nextBatch.name}`
    : left <= 30
      ? `Sisa ${left} paket di ${activeBatch.name}`
      : `${product.quota.booked} dari ${product.quota.total} paket terisi`;

  const quickAdd = () => {
    const v = product.variants[0];
    add({ slug: product.slug, name: product.name, variant: v.label, price: v.price, image: product.images[0], batch: shipBatch.id, qty: 1, note: '' });
  };

  const btnCls = cn('btn h-11 min-h-11 flex-1 px-2 text-xs font-semibold text-white sm:text-[13px]', soldOut ? 'bg-muted hover:bg-ink-2' : 'bg-brand hover:bg-brand-2');

  return (
    <div className="group flex flex-col">
      <Link href={href} className="relative block aspect-square overflow-hidden bg-soft">
        <Image src={product.images[0]} alt={product.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" priority={priority} className="object-cover transition-opacity duration-500 group-hover:opacity-0" />
        <Image src={product.images[1]} alt="" aria-hidden fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {badge && <span className={cn('absolute top-3 left-3 px-2.5 py-1 text-xs tracking-[0.04em] text-white', compareAt ? 'bg-sale' : 'bg-brand')}>{badge}</span>}
        <span className={cn('absolute inset-x-0 bottom-0 flex justify-between gap-2 px-3 py-2 text-[11px] tracking-[0.06em] text-white sm:text-xs', soldOut ? 'bg-ink/85' : 'bg-brand/90')}>
          <span>{soldOut ? `${activeBatch.name} penuh` : `Kirim mulai ${shipBatch.shipStart}`}</span>
          <span className="hidden sm:inline">{soldOut ? `${nextBatch.name}: ${nextBatch.shipStart}` : `PO tutup ${activeBatch.orderEnd.replace(' 2027', '')}`}</span>
        </span>
      </Link>

      <p className="mt-3.5 text-[11px] tracking-[0.14em] text-brand uppercase sm:text-xs">{category}</p>
      <h3 className="text-[15px] leading-snug font-medium sm:text-[17px]">
        <Link href={href} className="hover:text-brand">{product.name}</Link>
      </h3>
      <p className="mt-1 line-clamp-2 min-h-[2.6em] text-[13px] leading-snug text-muted sm:text-sm">{product.summary}</p>

      <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
        <span className={cn('text-base font-semibold sm:text-lg', !!compareAt && 'text-sale')}>{multi ? `Mulai ${rupiah(price)}` : rupiah(price)}</span>
        {compareAt && <span className="text-[13px] text-faint line-through sm:text-sm">{rupiah(compareAt)}</span>}
      </p>
      <p className="text-[13px] text-muted">DP 50%: {rupiah(Math.round(price / 2))}</p>

      <div className="mt-3">
        <div className="h-1 bg-line" role="progressbar" aria-valuenow={product.quota.booked} aria-valuemin={0} aria-valuemax={product.quota.total} aria-label={`Kuota ${product.name}`}>
          <div className={cn('h-full', scarce || soldOut ? 'bg-sale' : 'bg-brand')} style={{ width: `${pct}%` }} />
        </div>
        <p className={cn('mt-1.5 text-xs', scarce ? 'font-medium text-sale' : 'text-muted')}>{quotaText}</p>
      </div>

      <div className="mt-auto flex gap-2 pt-3.5">
        {multi ? (
          <Link href={href} className={btnCls}>Pre-order</Link>
        ) : (
          <button type="button" onClick={quickAdd} className={btnCls}>Pre-order</button>
        )}
        <a href={WA_CONTACT_URL} target="_blank" rel="noopener noreferrer" aria-label={`Tanya ${product.name} via WhatsApp`} className="inline-flex size-11 shrink-0 items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-white">
          <Icon name="whatsapp" size={18} stroke={1.7} />
        </a>
      </div>
    </div>
  );
}
