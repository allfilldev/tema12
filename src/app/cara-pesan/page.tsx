import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { faqs, orderSteps, site } from '@/content/site';
import { BatchSchedule } from '@/sections/BatchSchedule';
import { WA_CONTACT_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Cara Pesan & Jadwal Pre-Order',
  description: 'Cara pesan hampers Lebaran Bingkis, jadwal batch pre-order 2027, syarat DP, pengiriman, dan pertanyaan umum.',
  alternates: { canonical: '/cara-pesan' },
};

const terms = [
  'Pesanan dianggap masuk setelah DP 50% diterima dan dikonfirmasi admin.',
  'Pelunasan paling lambat 7 hari sebelum batch yang dipilih dikirim. Pesanan tanpa pelunasan dipindah ke batch berikutnya.',
  'Pembatalan bisa dilakukan sebelum produksi batch dimulai. Setelah produksi berjalan, DP tidak dapat dikembalikan.',
  'Isi hampers bisa berbeda sedikit dari foto bila ada bahan yang tidak tersedia, dengan nilai yang setara.',
  'Ongkos kirim ditanggung pembeli dan dihitung saat konfirmasi. Area Kota Semarang tersedia kurir same day.',
  'Kerusakan saat pengiriman diganti penuh dengan syarat video unboxing dikirim maksimal 1x24 jam setelah paket diterima.',
];

export default function CaraPesanPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <section className="border-b border-line bg-soft">
        <div className="container-page py-16 text-center sm:py-20">
          <p className="kicker mb-3 text-brand">Panduan</p>
          <h1 className="text-4xl font-medium tracking-[0.06em] uppercase sm:text-5xl">Cara Pesan</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">Semua hampers Bingkis memakai sistem pre-order per batch, supaya kue tetap segar dan paket tiba sebelum hari raya.</p>
        </div>
      </section>

      <section className="container-page pt-18">
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {orderSteps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-ink pt-5">
              <span className="text-4xl font-medium text-brand">0{i + 1}</span>
              <h2 className="mt-3 mb-1.5 text-lg font-medium">{s.title}</h2>
              <p className="text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page pt-20">
        <BatchSchedule id="jadwal" />
      </section>

      <section id="syarat" className="container-page scroll-mt-40 pt-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="section-title mb-6 text-center">Syarat Pre-Order</h2>
          <ul className="space-y-3.5">
            {terms.map((t) => (
              <li key={t} className="flex gap-3 text-ink-2"><Icon name="check" size={20} className="mt-0.5 shrink-0 text-brand" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="container-page scroll-mt-40 py-20">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-x-16 gap-y-10">
          <div className="min-w-0 flex-[1_1_280px]">
            <h2 className="section-title mb-4">Pertanyaan Umum</h2>
            <p className="mb-6 text-muted">Belum terjawab? Admin kami membalas {site.contact.hours.toLowerCase()}.</p>
            <a href={WA_CONTACT_URL} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] font-semibold text-ink hover:bg-[#1DA851]">
              <Icon name="whatsapp" size={18} /> Chat WhatsApp
            </a>
          </div>
          <div className="min-w-0 flex-[999_1_480px] border-t border-ink">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="group border-b border-line">
                <summary className="flex min-h-15 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[17px] font-medium">
                  {f.q}
                  <Icon name="plus" size={18} className="shrink-0 transition-transform group-open:rotate-45" />
                </summary>
                <p className="pb-5 text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
