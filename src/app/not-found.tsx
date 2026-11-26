import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-page py-28 text-center">
      <p className="kicker mb-3 text-brand">404</p>
      <h1 className="mb-4 text-4xl font-medium">Halaman tidak ditemukan</h1>
      <p className="mb-8 text-muted">Mungkin hampers ini sudah tidak tersedia atau tautannya berubah.</p>
      <Link href="/koleksi" className="btn bg-brand text-white hover:bg-brand-2">Lihat Koleksi</Link>
    </section>
  );
}
