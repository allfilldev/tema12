import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/** Logo All Fill Dev. `light` = versi putih untuk latar gelap. Atur tinggi lewat className (contoh: h-11). */
export function Logo({ light, priority, className }: { light?: boolean; priority?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn('inline-flex shrink-0', className)}>
      <Image
        src={light ? '/brand/allfilldev-logo-white.png' : '/brand/allfilldev-logo.png'}
        alt="All Fill Dev"
        width={480}
        height={335}
        priority={priority}
        className="h-full w-auto"
      />
    </Link>
  );
}
