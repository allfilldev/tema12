import type { Metadata } from 'next';
import Image from 'next/image';
import { Icon } from '@/components/Icon';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/content/products';
import { corporateTiers } from '@/content/site';
import { ClientLogos } from '@/sections/home';
import { CorporateForm } from './CorporateForm';

export const metadata: Metadata = {
  title: 'Corporate Hampers Lebaran',
  description: 'Hampers Lebaran untuk klien dan karyawan dengan logo perusahaan. Minimal 20 paket, harga bertingkat, kirim ke banyak alamat, faktur tersedia.',
  alternates: { canonical: '/corporate' },
};

const steps = [
  { title: 'Kirim kebutuhan', desc: 'Jumlah paket, budget per paket, dan tanggal kirim.' },
  { title: 'Terima penawaran', desc: 'Proposal isi hampers dan mockup logo dalam 1x24 jam.' },
  { title: 'Sampel & approval', desc: 'Sampel fisik untuk pesanan di atas 100 paket.' },
  { title: 'Produksi & kirim', desc: 'Laporan pengiriman per alamat dan faktur resmi.' },
];

export default function CorporatePage() {
  return (
    <>
      <section className="relative overflow-hidden text-white">
        <Image src="/images/corporate.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="container-page relative py-24 text-center sm:py-32">
          <p className="kicker mb-4 text-white/85">Corporate Program</p>
          <h1 className="mx-auto max-w-3xl text-4xl leading-tight font-medium sm:text-6xl">Hampers Lebaran dengan logo perusahaan Anda</h1>
          <p className="mx-auto mt-5 mb-8 max-w-xl text-lg text-white/90">Untuk klien, mitra, dan karyawan. Minimal 20 paket, kirim ke banyak alamat sekaligus.</p>
          <a href="#penawaran" className="btn bg-white font-semibold text-ink hover:bg-soft">Minta Penawaran</a>
        </div>
      </section>

      <ClientLogos />

      <section className="container-page pt-20 text-center">
        <h2 className="section-title mb-2">Harga Bertingkat</h2>
        <p className="mb-9 text-muted">Semakin banyak paket, semakin hemat per paket</p>
        <div className="grid gap-5 text-left md:grid-cols-3">
          {corporateTiers.map((t, i) => (
            <div key={t.range} className={i === 1 ? 'border border-brand p-7' : 'border border-line p-7'}>
              <p className="text-sm tracking-[0.1em] text-muted uppercase">{t.range}</p>
              <p className="mt-2 mb-5 text-3xl font-medium text-brand">{t.discount}</p>
              <ul className="space-y-2.5">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-2.5"><Icon name="check" size={18} className="mt-0.5 shrink-0 text-brand" />{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pt-20">
        <h2 className="section-title mb-9 text-center">Alur Pemesanan</h2>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-ink pt-5">
              <span className="text-4xl font-medium text-brand">0{i + 1}</span>
              <h3 className="mt-3 mb-1.5 text-lg font-medium">{s.title}</h3>
              <p className="text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page pt-20">
        <h2 className="section-title mb-8 text-center">Paket Corporate Populer</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
          {products.filter((p) => p.category === 'corporate' || p.recipients.includes('atasan')).slice(0, 4).map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      <section id="penawaran" className="container-page scroll-mt-36 py-20">
        <div className="flex flex-wrap gap-x-16 gap-y-10 bg-soft p-6 sm:p-12">
          <div className="min-w-0 flex-[1_1_320px]">
            <p className="kicker mb-3 text-brand">Minta Penawaran</p>
            <h2 className="mb-4 text-3xl leading-tight font-medium sm:text-4xl">Ceritakan kebutuhan hampers kantor Anda.</h2>
            <p className="text-ink-2">Tim kami membalas lewat WhatsApp dengan proposal isi hampers, mockup logo, dan harga per paket dalam 1x24 jam kerja.</p>
          </div>
          <CorporateForm />
        </div>
      </section>
    </>
  );
}
