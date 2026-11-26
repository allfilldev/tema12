import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { getProduct, minPrice, products } from '@/content/products';
import { categories, site } from '@/content/site';
import { ProductDetail } from './ProductDetail';

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name}, Hampers Lebaran`,
    description: `${p.summary}. ${p.description}`.slice(0, 160),
    alternates: { canonical: `/produk/${p.slug}` },
    openGraph: { images: [{ url: p.images[0], width: 1000, height: 1000 }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = categories.find((c) => c.id === product.category)!;
  const related = products.filter((p) => p.slug !== product.slug && (p.category === product.category || p.recipients.some((r) => product.recipients.includes(r)))).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((i) => `${site.url}${i}`),
    brand: { '@type': 'Brand', name: site.name },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviews },
    offers: { '@type': 'AggregateOffer', priceCurrency: 'IDR', lowPrice: minPrice(product), highPrice: Math.max(...product.variants.map((v) => v.price)), availability: 'https://schema.org/PreOrder' },
  };

  return (
    <>
      <div className="container-page pt-6 pb-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-muted">
          <Link href="/" className="hover:text-ink">Beranda</Link> / <Link href="/koleksi" className="hover:text-ink">Koleksi</Link> /{' '}
          <Link href={`/koleksi?kategori=${category.id}`} className="hover:text-ink">{category.label}</Link> / <span className="text-ink">{product.name}</span>
        </nav>
        <ProductDetail product={product} categoryLabel={category.label} />
      </div>
      <section className="border-t border-line">
        <div className="container-page py-16">
          <h2 className="section-title mb-8 text-center">Cocok Dipasangkan</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
