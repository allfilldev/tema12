'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import { ProductCard } from '@/components/ProductCard';
import { minPrice, products } from '@/content/products';
import { budgets, categories, recipients } from '@/content/site';
import { cn } from '@/lib/utils';

const sorts = [
  { id: 'populer', label: 'Paling populer' },
  { id: 'termurah', label: 'Harga terendah' },
  { id: 'termahal', label: 'Harga tertinggi' },
  { id: 'terbaru', label: 'Terbaru' },
];

export function Catalog() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [panelOpen, setPanelOpen] = useState(false);

  const kategori = params.getAll('kategori');
  const penerima = params.getAll('penerima');
  const budget = params.get('budget') ?? '';
  const q = params.get('q') ?? '';
  const sort = params.get('urut') ?? 'populer';

  const update = (mut: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params.toString());
    mut(next);
    const s = next.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  };
  const toggle = (key: string, value: string) =>
    update((p) => {
      const cur = p.getAll(key);
      p.delete(key);
      (cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]).forEach((v) => p.append(key, v));
    });

  const list = useMemo(() => {
    const b = budgets.find((x) => x.id === budget);
    const term = q.trim().toLowerCase();
    const res = products.filter(
      (p) =>
        (!kategori.length || kategori.includes(p.category)) &&
        (!penerima.length || p.recipients.some((r) => penerima.includes(r))) &&
        (!b || (minPrice(p) >= b.min && minPrice(p) < b.max)) &&
        (!term || `${p.name} ${p.summary}`.toLowerCase().includes(term)),
    );
    if (sort === 'termurah') res.sort((a, z) => minPrice(a) - minPrice(z));
    if (sort === 'termahal') res.sort((a, z) => minPrice(z) - minPrice(a));
    if (sort === 'terbaru') res.sort((a, z) => Number(!!z.isNew) - Number(!!a.isNew));
    if (sort === 'populer') res.sort((a, z) => z.reviews - a.reviews);
    return res;
  }, [kategori, penerima, budget, q, sort]);

  const activeCount = kategori.length + penerima.length + (budget ? 1 : 0) + (q ? 1 : 0);
  const count = (fn: (p: (typeof products)[number]) => boolean) => products.filter(fn).length;

  const filters = (
    <div className="space-y-8">
      <FilterGroup title="Kategori">
        {categories.map((c) => (
          <Check key={c.id} label={c.label} count={count((p) => p.category === c.id)} checked={kategori.includes(c.id)} onChange={() => toggle('kategori', c.id)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Penerima">
        {recipients.map((r) => (
          <Check key={r.id} label={r.label} count={count((p) => p.recipients.includes(r.id))} checked={penerima.includes(r.id)} onChange={() => toggle('penerima', r.id)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Budget">
        {budgets.map((b) => (
          <label key={b.id} className="flex min-h-10 cursor-pointer items-center gap-3 text-[15px]">
            <input type="radio" name="budget" checked={budget === b.id} onChange={() => update((p) => p.set('budget', b.id))} className="size-[18px] accent-brand" />
            {b.label}
          </label>
        ))}
        {budget && (
          <button type="button" onClick={() => update((p) => p.delete('budget'))} className="mt-1 min-h-10 text-sm text-muted underline underline-offset-4">Hapus budget</button>
        )}
      </FilterGroup>
      <div className="bg-soft p-5">
        <p className="mb-1 font-medium">Pesan lebih dari 20 paket?</p>
        <p className="mb-3 text-sm text-muted">Dapatkan harga corporate dan logo perusahaan di kemasan.</p>
        <a href="/corporate" className="text-sm font-medium tracking-[0.08em] text-brand uppercase underline underline-offset-4">Minta penawaran</a>
      </div>
    </div>
  );

  return (
    <section className="container-page py-10 sm:py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setPanelOpen(true)} className="inline-flex min-h-11 items-center gap-2 border border-line px-4 text-sm tracking-[0.08em] uppercase lg:hidden">
            <Icon name="filter" size={18} /> Filter{activeCount ? ` (${activeCount})` : ''}
          </button>
          <p className="text-sm text-muted" aria-live="polite">{list.length} produk{q && <> untuk “{q}”</>}</p>
          {activeCount > 0 && (
            <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="hidden min-h-11 text-sm underline underline-offset-4 sm:block">Hapus semua filter</button>
          )}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          Urutkan
          <select value={sort} onChange={(e) => update((p) => p.set('urut', e.target.value))} className="h-11 border border-line bg-white px-3 text-ink">
            {sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>
      </div>

      <div className="flex gap-12">
        <aside aria-label="Filter produk" className="hidden w-60 shrink-0 lg:block">{filters}</aside>
        <div className="min-w-0 flex-1">
          {list.length ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-5">
              {list.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 3} />)}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="mb-4 text-muted">Belum ada hampers yang cocok dengan filter ini.</p>
              <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="btn border border-ink">Hapus Filter</button>
            </div>
          )}
        </div>
      </div>

      {panelOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filter produk">
          <button type="button" aria-label="Tutup filter" className="absolute inset-0 bg-black/40" onClick={() => setPanelOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-white">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="text-sm font-medium tracking-[0.12em] uppercase">Filter</p>
              <button type="button" aria-label="Tutup filter" onClick={() => setPanelOpen(false)} className="inline-flex size-11 items-center justify-center"><Icon name="close" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">{filters}</div>
            <div className="border-t border-line p-4">
              <button type="button" onClick={() => setPanelOpen(false)} className={cn('btn w-full bg-brand text-white')}>Lihat {list.length} Produk</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold tracking-[0.1em] uppercase">{title}</legend>
      <div className="flex flex-col">{children}</div>
    </fieldset>
  );
}

function Check({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex min-h-10 cursor-pointer items-center gap-3 text-[15px]">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-[18px] accent-brand" />
      <span className="flex-1">{label}</span>
      <span className="text-[13px] text-muted">{count}</span>
    </label>
  );
}
