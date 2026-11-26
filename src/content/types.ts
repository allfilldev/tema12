export type CategoryId = 'kue-kering' | 'ibadah' | 'self-care' | 'keluarga' | 'corporate';
export type RecipientId = 'orang-tua' | 'atasan' | 'sahabat';
export type BatchId = 'batch-1' | 'batch-2' | 'batch-3';

export type Variant = { id: string; label: string; price: number; compareAt?: number };

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  recipients: RecipientId[];
  summary: string;
  description: string;
  contents: string[];
  variants: Variant[];
  /** Batch yang kuotanya sudah penuh untuk produk ini. */
  soldOutBatches?: BatchId[];
  badge?: 'Terlaris' | 'Baru' | 'Early bird' | 'Stok terbatas';
  stockLeft?: number;
  /** Kuota produk ini di batch yang sedang dibuka. */
  quota: { booked: number; total: number };
  rating: number;
  reviews: number;
  images: string[];
  featured?: boolean;
  isNew?: boolean;
};

export type Batch = {
  id: BatchId;
  name: string;
  orderStart: string;
  orderEnd: string;
  shipStart: string;
  shipEnd: string;
  quota: number;
  booked: number;
  status: 'Dibuka' | 'Segera' | 'Ditutup';
};
