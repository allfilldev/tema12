import { batches } from '@/content/site';
import { cn } from '@/lib/utils';
import { Countdown } from './Countdown';

export function BatchSchedule({ id, withCountdown = true }: { id?: string; withCountdown?: boolean }) {
  return (
    <div id={id} className="scroll-mt-40 bg-soft px-5 py-12 text-center sm:px-14 sm:py-14">
      <h2 className="section-title mb-2">Jadwal Pre-Order</h2>
      <p className="mb-8 text-muted">Pilih batch pengiriman. DP 50% saat pesan, pelunasan sebelum dikirim.</p>
      {withCountdown && <Countdown />}
      <div className="grid gap-4 text-left md:grid-cols-3">
        {batches.map((b) => {
          const open = b.status === 'Dibuka';
          const pct = Math.round((b.booked / b.quota) * 100);
          return (
            <div key={b.id} className={cn('border bg-white p-6', open ? 'border-brand' : 'border-line')}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-[0.08em] uppercase">{b.name}</h3>
                <span className={cn('px-2.5 py-1 text-xs tracking-[0.06em]', open ? 'bg-brand text-white' : 'bg-line text-ink-2')}>{b.status}</span>
              </div>
              <dl className="space-y-1 text-sm text-muted">
                <div className="flex gap-1"><dt>Pesan:</dt><dd className="font-medium text-ink">{b.orderStart} sampai {b.orderEnd}</dd></div>
                <div className="flex gap-1"><dt>Kirim:</dt><dd className="font-medium text-ink">{b.shipStart} sampai {b.shipEnd}</dd></div>
              </dl>
              <div className="mt-4 h-1.5 bg-line" role="progressbar" aria-valuenow={b.booked} aria-valuemin={0} aria-valuemax={b.quota} aria-label={`Kuota ${b.name}`}>
                <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-[13px] text-muted">{b.booked > 0 ? `${b.booked} dari ${b.quota} paket terisi` : `Kuota ${b.quota} paket`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
