import type { Metadata } from 'next';
import { Checkout } from './Checkout';

export const metadata: Metadata = {
  title: 'Keranjang & Checkout',
  robots: { index: false },
};

export default function KeranjangPage() {
  return (
    <section className="container-page py-12 sm:py-16">
      <h1 className="section-title mb-10 text-center sm:text-[28px]">Keranjang & Checkout</h1>
      <Checkout />
    </section>
  );
}
