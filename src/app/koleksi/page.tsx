import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Catalog } from './Catalog';

export const metadata: Metadata = {
  title: 'Koleksi Hampers Lebaran 2027',
  description: 'Pilih hampers Lebaran berdasarkan kategori, penerima, dan budget. Semua dengan sistem pre-order dan jadwal kirim yang jelas.',
  alternates: { canonical: '/koleksi' },
};

export default function KoleksiPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-2 text-white">
        <Image src="/images/banner-kue.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="container-page relative py-16 text-center sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-3 text-[13px] text-white/85">
            <Link href="/" className="hover:text-white">Beranda</Link> / <span>Koleksi</span>
          </nav>
          <h1 className="text-4xl font-medium tracking-[0.06em] uppercase sm:text-5xl">Hampers Lebaran 2027</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/90">Semua hampers dikirim dengan sistem pre-order per batch. Pilih batch saat menambahkan ke keranjang.</p>
        </div>
      </section>
      <Suspense fallback={<div className="container-page min-h-[60vh] py-12 text-muted">Memuat koleksi…</div>}>
        <Catalog />
      </Suspense>
    </>
  );
}
