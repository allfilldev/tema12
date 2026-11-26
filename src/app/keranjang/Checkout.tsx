'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { Icon } from '@/components/Icon';
import { QtyInput } from '@/components/QtyInput';
import { batches } from '@/content/site';
import { rupiah, waLink } from '@/lib/utils';

const field = 'h-12 w-full border border-line bg-white px-3.5 text-[15px] placeholder:text-faint focus:border-ink focus:outline-none';

export function Checkout() {
  const { items, subtotal, ready, setQty, remove } = useCart();
  const [form, setForm] = useState({ nama: '', wa: '', alamat: '', kota: '', catatan: '' });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  if (!ready) return <div className="min-h-[40vh]" />;

  if (!items.length)
    return (
      <div className="py-16 text-center">
        <Icon name="bag" size={44} stroke={1.2} className="mx-auto mb-4 text-faint" />
        <p className="mb-6 text-muted">Keranjang Anda masih kosong.</p>
        <Link href="/koleksi" className="btn bg-brand text-white hover:bg-brand-2">Mulai Belanja</Link>
      </div>
    );

  const dp = Math.round(subtotal / 2);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = items.map((it, i) => {
      const b = batches.find((x) => x.id === it.batch)!;
      return `${i + 1}. ${it.name} (${it.variant}) x${it.qty} = ${rupiah(it.price * it.qty)}\n   ${b.name}, kirim ${b.shipStart} sampai ${b.shipEnd}${it.note ? `\n   Kartu: "${it.note}"` : ''}`;
    });
    const text = [
      'Halo Bingkis, saya mau pre-order hampers:',
      '',
      ...lines,
      '',
      `Subtotal: ${rupiah(subtotal)}`,
      `DP 50%: ${rupiah(dp)}`,
      '',
      `Nama: ${form.nama}`,
      `WhatsApp: ${form.wa}`,
      `Alamat: ${form.alamat}, ${form.kota}`,
      ...(form.catatan ? [`Catatan: ${form.catatan}`] : []),
    ].join('\n');
    window.open(waLink(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-wrap gap-x-14 gap-y-12">
      <div className="min-w-0 flex-[999_1_560px]">
        <ul className="divide-y divide-line border-y border-line">
          {items.map((it) => {
            const b = batches.find((x) => x.id === it.batch)!;
            return (
              <li key={it.key} className="flex gap-4 py-6 sm:gap-6">
                <Link href={`/produk/${it.slug}`} className="shrink-0">
                  <Image src={it.image} alt={it.name} width={120} height={120} className="size-24 bg-soft object-cover sm:size-30" />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link href={`/produk/${it.slug}`} className="text-lg font-medium hover:text-brand">{it.name}</Link>
                      <p className="text-sm text-muted">{it.variant} · {b.name}, kirim {b.shipStart} sampai {b.shipEnd}</p>
                      {it.note && <p className="mt-1 text-sm text-ink-2">Kartu: “{it.note}”</p>}
                    </div>
                    <button type="button" aria-label={`Hapus ${it.name}`} onClick={() => remove(it.key)} className="-mt-2 inline-flex size-11 shrink-0 items-center justify-center text-muted hover:text-sale">
                      <Icon name="trash" size={18} />
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <QtyInput value={it.qty} onChange={(q) => setQty(it.key, q)} small label={it.name} />
                    <span className="font-medium">{rupiah(it.price * it.qty)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <Link href="/koleksi" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm tracking-[0.08em] uppercase underline-offset-4 hover:underline">
          <Icon name="left" size={16} /> Lanjut belanja
        </Link>
      </div>

      <form onSubmit={submit} className="min-w-0 flex-[1_1_340px] self-start bg-soft p-6 sm:p-8">
        <h2 className="mb-5 text-sm font-semibold tracking-[0.12em] uppercase">Data Pengiriman</h2>
        <div className="space-y-4">
          <Field id="nama" label="Nama penerima"><input id="nama" required value={form.nama} onChange={set('nama')} className={field} autoComplete="name" /></Field>
          <Field id="wa" label="Nomor WhatsApp"><input id="wa" required type="tel" inputMode="tel" value={form.wa} onChange={set('wa')} placeholder="08xx" className={field} autoComplete="tel" /></Field>
          <Field id="alamat" label="Alamat lengkap"><textarea id="alamat" required rows={3} value={form.alamat} onChange={set('alamat')} className={`${field} h-auto py-3`} autoComplete="street-address" /></Field>
          <Field id="kota" label="Kota"><input id="kota" required value={form.kota} onChange={set('kota')} className={field} autoComplete="address-level2" /></Field>
          <Field id="catatan" label="Catatan (opsional)"><textarea id="catatan" rows={2} value={form.catatan} onChange={set('catatan')} placeholder="Kirim ke beberapa alamat, jam pengiriman, dll." className={`${field} h-auto py-3`} /></Field>
        </div>
        <dl className="mt-6 space-y-2 border-t border-line pt-5 text-[15px]">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{rupiah(subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Ongkir</dt><dd className="text-muted">Dihitung admin</dd></div>
          <div className="flex justify-between text-lg font-medium"><dt>DP 50%</dt><dd>{rupiah(dp)}</dd></div>
        </dl>
        <button type="submit" className="btn mt-6 h-13 w-full bg-[#25D366] font-semibold text-ink hover:bg-[#1DA851]">
          <Icon name="whatsapp" size={18} /> Pesan via WhatsApp
        </button>
        <p className="mt-3 text-center text-xs text-muted">Pesanan akan dikirim ke admin untuk konfirmasi stok, ongkir, dan rekening pembayaran.</p>
      </form>
    </div>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm">{label}</label>
      {children}
    </div>
  );
}
