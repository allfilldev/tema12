'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/content/products';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'hampers', label: 'Hampers', pick: () => products.filter((p) => p.featured) },
  { id: 'kue', label: 'Kue Kering', pick: () => products.filter((p) => p.category === 'kue-kering') },
  { id: 'baru', label: 'Terbaru', pick: () => products.filter((p) => p.isNew) },
];

export function BestSeller() {
  const [tab, setTab] = useState(tabs[0].id);
  const list = tabs.find((t) => t.id === tab)!.pick().slice(0, 4);

  return (
    <section className="container-page pt-20">
      <div className="mb-8 text-center">
        <h2 className="section-title mb-4">Best Seller Lebaran</h2>
        <div role="tablist" aria-label="Filter produk" className="inline-flex flex-wrap justify-center gap-x-6">
          {tabs.map((t) => (
            <button key={t.id} type="button" role="tab" aria-selected={t.id === tab} onClick={() => setTab(t.id)} className={cn('min-h-11 border-b-2 px-0.5 text-sm tracking-[0.08em] uppercase', t.id === tab ? 'border-ink text-ink' : 'border-transparent text-faint hover:text-ink')}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div role="tabpanel" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
      <div className="mt-10 text-center">
        <Link href="/koleksi" className="btn border border-ink hover:bg-ink hover:text-white">Lihat Semua</Link>
      </div>
    </section>
  );
}
