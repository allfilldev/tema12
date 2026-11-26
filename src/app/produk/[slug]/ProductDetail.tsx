'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { Icon } from '@/components/Icon';
import { QtyInput } from '@/components/QtyInput';
import { batches } from '@/content/site';
import type { BatchId, Product } from '@/content/types';
import { cn, rupiah, WA_CONTACT_URL } from '@/lib/utils';

export function ProductDetail({ product, categoryLabel }: { product: Product; categoryLabel: string }) {
  const { add } = useCart();
  const [img, setImg] = useState(0);
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const available = batches.filter((b) => b.status !== 'Ditutup' && !product.soldOutBatches?.includes(b.id));
  const [batchId, setBatchId] = useState<BatchId>(available[0]?.id ?? 'batch-2');
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState('');
  const [added, setAdded] = useState(false);

  const variant = product.variants.find((v) => v.id === variantId)!;
  const batch = batches.find((b) => b.id === batchId)!;
  const total = variant.price * qty;

  const onAdd = () => {
    add({ slug: product.slug, name: product.name, variant: variant.label, price: variant.price, image: product.images[0], batch: batchId, qty, note });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };


  return (
    <div className="flex flex-wrap gap-x-16 gap-y-10">
      <div className="flex min-w-0 flex-[1_1_480px] flex-col-reverse gap-3 self-start sm:flex-row sm:items-start lg:sticky lg:top-36">
        <div className="flex gap-3 sm:w-22 sm:flex-col" role="tablist" aria-label="Foto produk">
          {product.images.map((src, i) => (
            <button key={src} type="button" role="tab" aria-selected={i === img} aria-label={`Foto ${i + 1}`} onClick={() => setImg(i)} className={cn('relative aspect-square w-20 shrink-0 overflow-hidden border-2 sm:w-22', i === img ? 'border-ink' : 'border-transparent')}>
              <Image src={src} alt="" fill sizes="88px" className="object-cover" />
            </button>
          ))}
        </div>
        <div className="relative aspect-square w-full min-w-0 flex-1 self-start overflow-hidden bg-soft">
          <Image src={product.images[img]} alt={`${product.name}, foto ${img + 1}`} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          <span className="absolute top-4 left-4 bg-brand px-3 py-1 text-xs tracking-[0.06em] text-white">Pre-order</span>
        </div>
      </div>

      <div className="min-w-0 flex-[1_1_400px]">
        <p className="kicker mb-2 text-brand">{categoryLabel}</p>
        <h1 className="text-[34px] leading-tight font-medium sm:text-[42px]">{product.name}</h1>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted">
          <span className="flex text-star" aria-hidden="true">{Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" size={15} stroke={0} className="fill-current" />)}</span>
          {product.rating.toLocaleString('id-ID')} dari {product.reviews} ulasan
        </div>
        <div className="mt-5 flex flex-wrap items-baseline gap-x-3">
          <span className={cn('text-[30px] font-medium', !!variant.compareAt && 'text-sale')}>{rupiah(variant.price)}</span>
          {variant.compareAt && <span className="text-lg text-faint line-through">{rupiah(variant.compareAt)}</span>}
        </div>
        <p className="text-sm text-muted">DP 50%: {rupiah(Math.round(total / 2))} untuk {qty} paket</p>
        <p className="mt-5 text-ink-2">{product.description}</p>

        {product.variants.length > 1 && (
          <fieldset className="mt-7">
            <legend className="mb-2.5 text-sm font-semibold tracking-[0.08em] uppercase">Ukuran paket</legend>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button key={v.id} type="button" aria-pressed={v.id === variantId} onClick={() => setVariantId(v.id)} className={cn('min-h-11 border px-5 text-sm', v.id === variantId ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink')}>
                  {v.label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <fieldset className="mt-6">
          <legend className="mb-2.5 text-sm font-semibold tracking-[0.08em] uppercase">Batch pengiriman</legend>
          <div className="grid gap-2">
            {batches.map((b) => {
              const full = product.soldOutBatches?.includes(b.id);
              return (
                <label key={b.id} className={cn('flex min-h-13 cursor-pointer items-center gap-3 border px-4 text-sm', b.id === batchId ? 'border-ink' : 'border-line', full && 'cursor-not-allowed opacity-50')}>
                  <input type="radio" name="batch" disabled={full} checked={b.id === batchId} onChange={() => setBatchId(b.id)} className="size-[18px] accent-brand" />
                  <span className="flex-1"><span className="font-medium">{b.name}</span> · kirim {b.shipStart} sampai {b.shipEnd}</span>
                  <span className="text-xs text-muted">{full ? 'Penuh' : `Tutup ${b.orderEnd}`}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6">
          <label htmlFor="kartu" className="mb-2.5 block text-sm font-semibold tracking-[0.08em] uppercase">Pesan kartu ucapan (gratis)</label>
          <textarea id="kartu" rows={3} maxLength={200} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Contoh: Mohon maaf lahir dan batin, salam hangat dari keluarga Rahman." className="w-full resize-y border border-line px-3.5 py-3 text-[15px] placeholder:text-faint focus:border-ink focus:outline-none" />
          <p className="text-right text-xs text-muted">{note.length}/200</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <QtyInput value={qty} onChange={setQty} label={product.name} />
          <button type="button" onClick={onAdd} disabled={!available.length} className="btn h-[52px] flex-[1_1_220px] bg-brand text-white hover:bg-brand-2 disabled:opacity-50">
            {added ? <><Icon name="check" size={18} /> Masuk keranjang</> : `Pre-order · ${rupiah(total)}`}
          </button>
        </div>
        <a href={WA_CONTACT_URL} target="_blank" rel="noopener noreferrer" className="btn mt-3 w-full border border-ink hover:bg-ink hover:text-white">
          <Icon name="whatsapp" size={18} /> Tanya via WhatsApp
        </a>

        <dl className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 bg-soft p-5 text-sm">
          <div><dt className="text-muted">Batch dipilih</dt><dd className="font-medium">{batch.name}</dd></div>
          <div><dt className="text-muted">Pemesanan ditutup</dt><dd className="font-medium">{batch.orderEnd}</dd></div>
          <div><dt className="text-muted">Estimasi kirim</dt><dd className="font-medium">{batch.shipStart} sampai {batch.shipEnd}</dd></div>
          <div><dt className="text-muted">Sisa kuota batch</dt><dd className="font-medium">{batch.status === 'Dibuka' ? Math.max(0, product.quota.total - product.quota.booked) : product.quota.total} paket</dd></div>
        </dl>

        <div className="mt-6 border-t border-line">
          <Accordion title="Isi hampers" open>
            <ul className="list-disc space-y-1 pl-5">{product.contents.map((c) => <li key={c}>{c}</li>)}</ul>
          </Accordion>
          <Accordion title="Syarat pre-order">
            DP 50% saat pesanan dikonfirmasi, pelunasan paling lambat 7 hari sebelum batch dikirim. Pembatalan setelah produksi batch dimulai tidak dapat dikembalikan DP-nya.
          </Accordion>
          <Accordion title="Pengiriman">
            Kirim ke seluruh Indonesia. Area Kota Semarang bisa kurir same day. Ongkir dihitung saat konfirmasi via WhatsApp. Foto paket dan nomor resi dikirim sebelum dan setelah pengiriman.
          </Accordion>
        </div>
      </div>
    </div>
  );
}

function Accordion({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group border-b border-line">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-sm font-semibold tracking-[0.08em] uppercase">
        {title}
        <Icon name="plus" size={18} className="transition-transform group-open:rotate-45" />
      </summary>
      <div className="pb-5 text-[15px] text-ink-2">{children}</div>
    </details>
  );
}
