# Bingkis, Tema Toko Hampers Lebaran

Showcase tema e-commerce Bratamedia: toko hampers Lebaran 2027 dengan sistem pre-order per batch dan checkout via WhatsApp. Statis penuh, tanpa backend dan CMS.

## Stack
Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, font Jost self-host.

## Jalankan
```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # cek build production
```

## Halaman
- `/` Beranda: banner slider, keunggulan, kategori, best seller, banner koleksi, jadwal PO + hitung mundur, cerita brand, corporate, logo klien, testimoni, Instagram
- `/koleksi` Katalog dengan filter kategori, penerima, budget, pencarian (`?q=`), urutan
- `/produk/[slug]` Detail produk: galeri, ukuran, pilih batch, kartu ucapan, jumlah, tambah ke keranjang
- `/keranjang` Keranjang dan form pengiriman, checkout terkirim sebagai pesan WhatsApp
- `/corporate` Program corporate, harga bertingkat, form penawaran via WhatsApp
- `/cara-pesan` Langkah pesan, jadwal batch, syarat PO, FAQ

## Ubah konten
Semua konten ada di `src/content/`:
- `site.ts`: kontak, pengumuman, batch PO (`batches`, `poDeadline`), banner, FAQ, testimoni, logo klien, harga corporate
- `products.ts`: daftar produk, varian harga, batch yang penuh (`soldOutBatches`), badge
- Logo All Fill Dev: satu warna, ganti warnanya lewat token `--color-logo` (dan `--color-logo-light` untuk latar gelap) di `src/app/globals.css`
- Warna dan font: `src/app/globals.css` (blok `@theme`)

Keranjang disimpan di localStorage browser.

## Gambar
Semua gambar di `public/images/` adalah ilustrasi dummy. Ganti dengan foto asli memakai nama file yang sama (format webp, produk 1000x1000, banner 1920x900).
