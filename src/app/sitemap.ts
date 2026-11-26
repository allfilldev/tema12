import type { MetadataRoute } from 'next';
import { products } from '@/content/products';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/koleksi', '/corporate', '/cara-pesan'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.8 })),
    ...products.map((p) => ({ url: `${site.url}/produk/${p.slug}`, priority: 0.7 })),
  ];
}
