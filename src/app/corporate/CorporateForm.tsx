'use client';

import { useState } from 'react';
import { Icon } from '@/components/Icon';
import { waLink } from '@/lib/utils';

const field = 'h-12 w-full border border-line bg-white px-3.5 text-[15px] placeholder:text-faint focus:border-ink focus:outline-none';

export function CorporateForm() {
  const [f, setF] = useState({ nama: '', perusahaan: '', jumlah: '', budget: '', tanggal: '', catatan: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      'Halo Bingkis, saya mau minta penawaran hampers corporate.',
      '',
      `Nama: ${f.nama}`,
      `Perusahaan: ${f.perusahaan}`,
      `Jumlah paket: ${f.jumlah}`,
      `Budget per paket: ${f.budget}`,
      `Target kirim: ${f.tanggal}`,
      ...(f.catatan ? [`Catatan: ${f.catatan}`] : []),
    ].join('\n');
    window.open(waLink(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={submit} className="grid min-w-0 flex-[1_1_420px] gap-4 sm:grid-cols-2">
      <F id="c-nama" label="Nama"><input id="c-nama" required value={f.nama} onChange={set('nama')} className={field} autoComplete="name" /></F>
      <F id="c-pt" label="Perusahaan"><input id="c-pt" required value={f.perusahaan} onChange={set('perusahaan')} className={field} autoComplete="organization" /></F>
      <F id="c-jml" label="Jumlah paket"><input id="c-jml" required type="number" min={20} value={f.jumlah} onChange={set('jumlah')} placeholder="Minimal 20" className={field} /></F>
      <F id="c-budget" label="Budget per paket">
        <select id="c-budget" required value={f.budget} onChange={set('budget')} className={field}>
          <option value="">Pilih budget</option>
          <option>Di bawah Rp250.000</option>
          <option>Rp250.000 sampai Rp500.000</option>
          <option>Rp500.000 sampai Rp1.000.000</option>
          <option>Di atas Rp1.000.000</option>
        </select>
      </F>
      <F id="c-tgl" label="Target kirim" full>
        <select id="c-tgl" required value={f.tanggal} onChange={set('tanggal')} className={field}>
          <option value="">Pilih batch</option>
          <option>Batch 1 (20 sampai 24 Feb 2027)</option>
          <option>Batch 2 (25 Feb sampai 2 Mar 2027)</option>
          <option>Batch 3 (3 sampai 6 Mar 2027)</option>
        </select>
      </F>
      <F id="c-cat" label="Catatan (opsional)" full>
        <textarea id="c-cat" rows={3} value={f.catatan} onChange={set('catatan')} placeholder="Jumlah alamat tujuan, kebutuhan logo, isi yang diinginkan" className={`${field} h-auto py-3`} />
      </F>
      <button type="submit" className="btn h-13 bg-brand text-white hover:bg-brand-2 sm:col-span-2">
        <Icon name="whatsapp" size={18} /> Kirim via WhatsApp
      </button>
    </form>
  );
}

function F({ id, label, full, children }: { id: string; label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="mb-1.5 block text-sm">{label}</label>
      {children}
    </div>
  );
}
