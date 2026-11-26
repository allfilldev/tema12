import Link from 'next/link';
import { site } from '@/content/site';
import { WA_CONTACT_URL } from '@/lib/utils';
import { Logo } from './Logo';
import { NewsletterForm } from './NewsletterForm';

const shop = [
  { label: 'Semua Hampers', href: '/koleksi' },
  { label: 'Kue Kering', href: '/koleksi?kategori=kue-kering' },
  { label: 'Perlengkapan Ibadah', href: '/koleksi?kategori=ibadah' },
  { label: 'Self-care', href: '/koleksi?kategori=self-care' },
  { label: 'Corporate', href: '/corporate' },
];
const help = [
  { label: 'Cara Pesan', href: '/cara-pesan' },
  { label: 'Jadwal Pre-Order', href: '/cara-pesan#jadwal' },
  { label: 'Syarat Pre-Order', href: '/cara-pesan#syarat' },
  { label: 'FAQ', href: '/cara-pesan#faq' },
  { label: 'Keranjang', href: '/keranjang' },
];

export function Footer() {
  return (
    <footer className="bg-brand text-brand-muted">
      <div className="container-page pt-16 pb-7">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-sm flex-[1_1_280px]">
            <Logo light className="h-16" />
            <p className="mt-5 mb-4 text-sm">Dapatkan info batch PO dan promo early bird lebih dulu.</p>
            <NewsletterForm />
          </div>
          <div className="flex flex-wrap gap-x-16 gap-y-10 text-sm">
            <FooterCol title="Belanja" links={shop} />
            <FooterCol title="Bantuan" links={help} />
            <div className="flex max-w-64 flex-col gap-2.5">
              <p className="font-medium tracking-[0.1em] text-white uppercase">Kontak</p>
              <a href={WA_CONTACT_URL} className="hover:text-white">WhatsApp {site.contact.whatsappDisplay}</a>
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">{site.contact.email}</a>
              <a href={site.contact.maps} target="_blank" rel="noopener noreferrer" className="hover:text-white">{site.contact.address}</a>
              <span>{site.contact.hours}</span>
              <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram {site.contact.instagramHandle}</a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-brand-line pt-6 text-[13px]">
          <span>© 2027 {site.name}. Seluruh hak cipta dilindungi.</span>
          <span>{site.payments.join(' · ')}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="mb-1.5 font-medium tracking-[0.1em] text-white uppercase">{title}</p>
      {links.map((l) => (
        <Link key={l.label} href={l.href} className="py-1 hover:text-white">{l.label}</Link>
      ))}
    </div>
  );
}
