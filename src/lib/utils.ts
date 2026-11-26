import { site } from '@/content/site';

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

export const rupiah = (n: number) => 'Rp' + n.toLocaleString('id-ID');

/** Pesan WhatsApp standar All Fill Dev untuk semua tombol kontak. */
export const WA_MESSAGE = 'Halo All Fill Dev, saya sudah melihat katalog tema dan ingin konsultasi memilih tema yang cocok untuk usaha saya.';

/** Link kontak standar All Fill Dev. */
export const WA_CONTACT_URL = 'https://wa.me/62895326422692?text=Halo%20All%20Fill%20Dev%2C%20saya%20sudah%20melihat%20katalog%20tema%20dan%20ingin%20konsultasi%20memilih%20tema%20yang%20cocok%20untuk%20usaha%20saya.';

/** Untuk form yang menyusun pesan sendiri (checkout, permintaan penawaran). */
export const waLink = (text: string) => `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
