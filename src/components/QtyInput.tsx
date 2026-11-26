'use client';

import { cn } from '@/lib/utils';
import { Icon } from './Icon';

export function QtyInput({ value, onChange, small, label }: { value: number; onChange: (v: number) => void; small?: boolean; label: string }) {
  const h = small ? 'h-10' : 'h-[52px]';
  return (
    <div className={cn('inline-flex items-center border border-line', h)}>
      <button type="button" aria-label={`Kurangi jumlah ${label}`} onClick={() => onChange(Math.max(1, value - 1))} className={cn('inline-flex items-center justify-center', small ? 'w-10' : 'w-12', h)}>
        <Icon name="minus" size={16} />
      </button>
      <span aria-live="polite" aria-label={`Jumlah ${value}`} className="min-w-8 text-center font-medium tabular-nums">{value}</span>
      <button type="button" aria-label={`Tambah jumlah ${label}`} onClick={() => onChange(value + 1)} className={cn('inline-flex items-center justify-center', small ? 'w-10' : 'w-12', h)}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
