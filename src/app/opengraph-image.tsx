import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const alt = `${site.name}, ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1f3a2e', color: '#fff' }}>
        <div style={{ display: 'flex', fontSize: 96, letterSpacing: 30, paddingLeft: 30 }}>BINGKIS</div>
        <div style={{ display: 'flex', marginTop: 20, fontSize: 30, letterSpacing: 8, color: '#c9d6cf' }}>{`HAMPERS LEBARAN 2027 · PRE-ORDER DIBUKA`}</div>
      </div>
    ),
    size,
  );
}
