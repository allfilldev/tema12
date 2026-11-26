import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { clientLogos, homeSelections, perks, site, testimonials } from '@/content/site';

export function Perks() {
  return (
    <section className="border-b border-line">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-6 py-7 lg:grid-cols-4">
        {perks.map((p) => (
          <li key={p.title} className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:text-left">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-brand text-brand"><Icon name={p.icon} /></span>
            <span>
              <span className="block text-[15px] font-semibold">{p.title}</span>
              <span className="text-[13px] text-muted">{p.desc}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Selections() {
  return (
    <section className="container-page pt-18 text-center">
      <h2 className="section-title mb-2">Pilihan Kami</h2>
      <p className="mb-8 text-muted">Temukan hampers sesuai penerima dan momennya</p>
      <ul className="grid grid-cols-3 gap-3 sm:gap-5 lg:grid-cols-6">
        {homeSelections.map((s) => (
          <li key={s.label}>
            <Link href={s.href} className="group block">
              <span className="mb-3 block overflow-hidden bg-soft">
                <Image src={s.image} alt="" width={400} height={400} sizes="(min-width: 1024px) 16vw, 33vw" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </span>
              <span className="text-[13px] font-medium tracking-[0.1em] uppercase sm:text-sm">{s.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CollectionBanners() {
  const items = [
    { kicker: 'Koleksi', title: 'Kue Kering Lebaran', href: '/koleksi?kategori=kue-kering', image: '/images/banner-kue.webp' },
    { kicker: 'Koleksi', title: 'Perlengkapan Ibadah', href: '/koleksi?kategori=ibadah', image: '/images/banner-ibadah.webp' },
  ];
  return (
    <section className="container-page grid gap-5 pt-20 md:grid-cols-2">
      {items.map((b) => (
        <Link key={b.title} href={b.href} className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden p-8 text-white sm:min-h-[460px] sm:p-9">
          <Image src={b.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <span className="relative kicker text-white/85">{b.kicker}</span>
          <span className="relative mt-1.5 mb-4 text-3xl leading-tight font-medium sm:text-[34px]">{b.title}</span>
          <span className="relative self-start border-b border-white pb-1 text-sm tracking-[0.12em] uppercase">Lihat Koleksi</span>
        </Link>
      ))}
    </section>
  );
}

export function Story() {
  return (
    <section className="container-page flex flex-wrap items-center gap-x-18 gap-y-10 pt-20">
      <div className="relative aspect-[5/4] min-w-0 flex-[1_1_440px]">
        <Image src="/images/cerita.webp" alt="Hampers Bingkis sedang dikemas dalam kotak kayu" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="min-w-0 flex-[1_1_400px]">
        <p className="kicker mb-3 text-brand">Tentang Bingkis</p>
        <h2 className="mb-5 text-3xl leading-tight font-medium sm:text-[42px]">Setiap bingkisan membawa pesan.</h2>
        <p className="mb-4 text-ink-2">Kami memilih isi hampers satu per satu, dari kue kering buatan rumahan sampai perlengkapan ibadah, lalu mengemasnya dalam kotak kayu yang bisa dipakai lagi.</p>
        <p className="mb-8 text-ink-2">Setiap paket disertai kartu ucapan tulisan Anda dan foto paket sebelum dikirim.</p>
        <Link href="/cara-pesan" className="btn bg-brand text-white hover:bg-brand-2">Cara Pesan</Link>
      </div>
    </section>
  );
}

export function CorporateBand() {
  return (
    <section className="relative mt-20 overflow-hidden text-white">
      <Image src="/images/corporate.webp" alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="container-page relative flex flex-wrap items-center justify-between gap-7 py-22">
        <div className="max-w-xl">
          <p className="kicker mb-3 text-white/85">Corporate Program</p>
          <h2 className="mb-3.5 text-3xl leading-tight font-medium sm:text-[42px]">Hampers untuk klien dan karyawan, dengan logo perusahaan Anda.</h2>
          <p className="text-white/90">Minimal 20 paket, harga bertingkat, kirim ke banyak alamat sekaligus, faktur tersedia.</p>
        </div>
        <Link href="/corporate" className="btn bg-white font-semibold text-ink hover:bg-soft">Minta Penawaran</Link>
      </div>
    </section>
  );
}

export function ClientLogos() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section className="border-b border-line py-14 text-center">
      <p className="kicker mb-6 text-muted">Dipercaya 300+ perusahaan dan institusi</p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-4">
          {row.map((l, i) => (
            <li key={i} aria-hidden={i >= clientLogos.length} className="flex h-14 w-44 items-center justify-center border border-line text-sm font-medium tracking-[0.12em] text-faint uppercase">
              {l}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="container-page pt-20">
      <h2 className="section-title mb-8 text-center">Kata Pelanggan</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="border border-line">
            <Image src={t.image} alt={`Foto hampers dari ${t.name}`} width={800} height={600} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/3] w-full object-cover" />
            <div className="p-6">
              <div className="flex gap-0.5 text-star" role="img" aria-label="Rating 5 dari 5">
                {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" size={15} stroke={0} className="fill-current" />)}
              </div>
              <blockquote className="my-3 text-ink-2">“{t.quote}”</blockquote>
              <figcaption className="text-sm font-semibold">{t.name} <span className="font-normal text-muted">· {t.city}</span></figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function InstagramGrid() {
  return (
    <section className="container-page py-20 text-center">
      <h2 className="section-title mb-1.5">#BingkisLebaran</h2>
      <p className="mb-7 text-muted">
        Ikuti kami di Instagram{' '}
        <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">{site.contact.instagramHandle}</a>
      </p>
      <ul className="grid grid-cols-3 gap-2 lg:grid-cols-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <li key={n}>
            <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Lihat postingan Instagram ${n}`} className="block overflow-hidden">
              <Image src={`/images/insta-${n}.webp`} alt="" width={300} height={300} sizes="(min-width: 1024px) 16vw, 33vw" className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
