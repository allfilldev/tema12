import type { Batch, CategoryId, RecipientId } from './types';

export const site = {
  name: 'Bingkis',
  tagline: 'Hampers Lebaran Kurasi',
  description:
    'Toko hampers Lebaran dengan sistem pre-order terjadwal. Kue kering, perlengkapan ibadah, dan self-care dalam kotak kayu yang bisa dipakai lagi. Kirim ke seluruh Indonesia.',
  url: 'https://bingkis.vercel.app',
  city: 'Semarang',
  contact: {
    whatsapp: '62895326422692',
    whatsappDisplay: '+62 895-3264-22692',
    email: 'info@allfilldev.com',
    address: 'Pd. Bukit Agung No.1 Blok H, Sumurboto, Kec. Banyumanik, Semarang, Jawa Tengah',
    maps: 'https://maps.app.goo.gl/rhZBkKp7CNydwZQh7',
    hours: 'Senin sampai Sabtu, 07.00 sampai 22.00 WIB',
    instagram: 'https://www.instagram.com/allfilldev',
    instagramHandle: '@allfilldev',
  },
  announcements: [
    'Pre-order hampers Lebaran Batch 1 dibuka sampai 20 Januari 2027',
    'Gratis kartu ucapan custom untuk setiap paket',
    'Harga early bird sampai 10 Januari 2027',
  ],
  /** Batas tutup PO batch aktif, dipakai untuk hitung mundur. */
  poDeadline: '2027-01-20T23:59:00+07:00',
  payments: ['BCA', 'Mandiri', 'QRIS', 'GoPay', 'OVO'],
};

export const nav = [
  { label: 'Hampers Lebaran', href: '/koleksi' },
  { label: 'Per Penerima', href: '/koleksi?penerima=orang-tua' },
  { label: 'Per Budget', href: '/koleksi?budget=250-500' },
  { label: 'Kue Kering', href: '/koleksi?kategori=kue-kering' },
  { label: 'Perlengkapan Ibadah', href: '/koleksi?kategori=ibadah' },
  { label: 'Corporate', href: '/corporate' },
  { label: 'Cara Pesan', href: '/cara-pesan' },
];

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'kue-kering', label: 'Kue Kering' },
  { id: 'ibadah', label: 'Perlengkapan Ibadah' },
  { id: 'self-care', label: 'Self-care' },
  { id: 'keluarga', label: 'Keluarga Besar' },
  { id: 'corporate', label: 'Corporate' },
];

export const recipients: { id: RecipientId; label: string }[] = [
  { id: 'orang-tua', label: 'Orang Tua' },
  { id: 'atasan', label: 'Atasan & Klien' },
  { id: 'sahabat', label: 'Sahabat' },
];

export const budgets = [
  { id: '0-250', label: 'Di bawah 250rb', min: 0, max: 250_000 },
  { id: '250-500', label: '250rb sampai 500rb', min: 250_000, max: 500_000 },
  { id: '500-1000', label: '500rb sampai 1jt', min: 500_000, max: 1_000_000 },
  { id: '1000+', label: 'Di atas 1jt', min: 1_000_000, max: Infinity },
];

export type NavLink = { label: string; href: string };
export type NavMenu = {
  label: string;
  groups: { title: string; items: NavLink[] }[];
  feature: NavLink & { image: string };
};

const koleksiHref = (key: string, value: string) => `/koleksi?${new URLSearchParams({ [key]: value })}`;

/** Menu desktop (satu baris + dropdown). Menu mobile tetap memakai `nav`. */
export const desktopNav: (NavLink | NavMenu)[] = [
  { label: 'Hampers Lebaran', href: '/koleksi' },
  {
    label: 'Pilih Hadiah',
    groups: [
      { title: 'Per Penerima', items: recipients.map((r) => ({ label: r.label, href: koleksiHref('penerima', r.id) })) },
      { title: 'Per Budget', items: budgets.map((b) => ({ label: b.label, href: koleksiHref('budget', b.id) })) },
      {
        title: 'Kategori',
        items: categories.filter((c) => c.id !== 'corporate').map((c) => ({ label: c.label, href: koleksiHref('kategori', c.id) })),
      },
    ],
    feature: { label: 'Lihat semua hampers', href: '/koleksi', image: '/images/hero-1.webp' },
  },
  { label: 'Corporate', href: '/corporate' },
  { label: 'Cara Pesan', href: '/cara-pesan' },
];

export const homeSelections = [
  { label: 'Orang Tua', href: '/koleksi?penerima=orang-tua', image: '/images/kategori-orang-tua.webp' },
  { label: 'Atasan', href: '/koleksi?penerima=atasan', image: '/images/kategori-atasan.webp' },
  { label: 'Sahabat', href: '/koleksi?penerima=sahabat', image: '/images/kategori-sahabat.webp' },
  { label: 'Kue Kering', href: '/koleksi?kategori=kue-kering', image: '/images/kategori-kue-kering.webp' },
  { label: 'Ibadah', href: '/koleksi?kategori=ibadah', image: '/images/kategori-ibadah.webp' },
  { label: 'Self-care', href: '/koleksi?kategori=self-care', image: '/images/kategori-self-care.webp' },
];

export const heroSlides = [
  {
    image: '/images/hero-1.webp',
    kicker: 'Koleksi Idul Fitri 1448 H',
    title: 'Hampers Lebaran 2027',
    text: 'Bingkisan untuk keluarga dan rekan tersayang. Pre-order sekarang, tiba sebelum hari raya.',
    cta: { label: 'Belanja Sekarang', href: '/koleksi' },
  },
  {
    image: '/images/hero-2.webp',
    kicker: 'Corporate Program',
    title: 'Hampers berlogo untuk klien Anda',
    text: 'Minimal 20 paket, harga bertingkat, kirim ke banyak alamat sekaligus.',
    cta: { label: 'Minta Penawaran', href: '/corporate' },
  },
  {
    image: '/images/hero-3.webp',
    kicker: 'Early Bird',
    title: 'Kue kering hemat sampai 15%',
    text: 'Harga early bird berlaku untuk pesanan Batch 1 sampai 10 Januari 2027.',
    cta: { label: 'Lihat Kue Kering', href: '/koleksi?kategori=kue-kering' },
  },
];

export const perks = [
  { title: 'Pre-order terjadwal', desc: 'Pilih tanggal kirim', icon: 'calendar' },
  { title: 'Kirim seluruh Indonesia', desc: 'Same day area Semarang', icon: 'truck' },
  { title: 'Kartu ucapan gratis', desc: 'Tulis pesan Anda sendiri', icon: 'card' },
  { title: 'Foto sebelum dikirim', desc: 'Bukti paket rapi', icon: 'camera' },
] as const;

export const batches: Batch[] = [
  { id: 'batch-1', name: 'Batch 1', orderStart: '1 Jan', orderEnd: '20 Jan 2027', shipStart: '20 Feb', shipEnd: '24 Feb 2027', quota: 150, booked: 64, status: 'Dibuka' },
  { id: 'batch-2', name: 'Batch 2', orderStart: '21 Jan', orderEnd: '10 Feb 2027', shipStart: '25 Feb', shipEnd: '2 Mar 2027', quota: 200, booked: 0, status: 'Segera' },
  { id: 'batch-3', name: 'Batch 3', orderStart: '11 Feb', orderEnd: '25 Feb 2027', shipStart: '3 Mar', shipEnd: '6 Mar 2027', quota: 120, booked: 0, status: 'Segera' },
];

export const orderSteps = [
  { title: 'Pilih hampers', desc: 'Pilih paket, ukuran, dan batch pengiriman yang sesuai.' },
  { title: 'Tulis kartu ucapan', desc: 'Pesan pribadi Anda dicetak gratis di kartu.' },
  { title: 'Checkout via WhatsApp', desc: 'Pesanan terkirim otomatis ke admin untuk dikonfirmasi.' },
  { title: 'Bayar DP 50%', desc: 'Pelunasan paling lambat 7 hari sebelum batch dikirim.' },
  { title: 'Hampers dikirim', desc: 'Foto paket dan nomor resi dikirim ke WhatsApp Anda.' },
];

export const faqs = [
  { q: 'Kapan hampers akan dikirim?', a: 'Sesuai batch yang Anda pilih. Batch 1 dikirim 20 sampai 24 Februari 2027, Batch 2 tanggal 25 Februari sampai 2 Maret, dan Batch 3 tanggal 3 sampai 6 Maret 2027.' },
  { q: 'Apakah bisa kirim ke luar kota?', a: 'Bisa, ke seluruh Indonesia melalui ekspedisi. Untuk area Kota Semarang tersedia kurir same day. Ongkos kirim dihitung saat konfirmasi.' },
  { q: 'Bagaimana sistem pembayarannya?', a: 'DP 50% saat pemesanan dikonfirmasi. Pelunasan paling lambat 7 hari sebelum batch dikirim, lewat transfer bank, QRIS, atau e-wallet.' },
  { q: 'Bisa kirim ke beberapa alamat berbeda?', a: 'Bisa. Tulis daftar alamat saat checkout atau kirim file daftar alamat ke admin lewat WhatsApp.' },
  { q: 'Apakah pesanan bisa dibatalkan?', a: 'Pembatalan bisa dilakukan sebelum produksi batch dimulai. Setelah produksi berjalan, DP tidak dapat dikembalikan.' },
  { q: 'Bisa pesan dalam jumlah banyak untuk kantor?', a: 'Bisa, minimal 20 paket dengan harga bertingkat dan logo perusahaan di kemasan. Lihat halaman Corporate untuk detailnya.' },
];

export const testimonials = [
  { quote: 'Kotaknya cantik dan masih dipakai ibu untuk simpan kue sampai sekarang. Nastarnya juga enak.', name: 'Nadia', city: 'Semarang', image: '/images/ulasan-1.webp' },
  { quote: 'Pesan 60 paket untuk klien, semua sampai tepat waktu dengan logo kantor kami di kartunya.', name: 'Reza, HR Manager', city: 'Jakarta', image: '/images/ulasan-2.webp' },
  { quote: 'Kartu ucapannya bisa ditulis sendiri, jadi terasa personal walau dikirim dari jauh.', name: 'Sinta', city: 'Bandung', image: '/images/ulasan-3.webp' },
];

export const clientLogos = ['Nusantara Bank', 'Kopi Pagi', 'Sentosa Group', 'Rumah Sehat', 'Arka Logistik', 'Tirta Mandiri', 'Lentera Edu', 'Studio Kayu'];

export const corporateTiers = [
  { range: '20 sampai 49 paket', discount: 'Diskon 5%', perks: ['Kartu ucapan berlogo', 'Satu alamat atau banyak alamat'] },
  { range: '50 sampai 199 paket', discount: 'Diskon 10%', perks: ['Stiker logo di kotak', 'Pita warna brand', 'Faktur pajak'] },
  { range: '200+ paket', discount: 'Diskon 15%', perks: ['Kotak custom sablon logo', 'Isi hampers bisa dikurasi', 'Account manager khusus'] },
];
