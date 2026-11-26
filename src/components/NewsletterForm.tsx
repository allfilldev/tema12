'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  if (done) return <p className="text-sm text-white">Terima kasih, info batch berikutnya akan kami kirim ke email Anda.</p>;
  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="nl-email" className="sr-only">Alamat email</label>
      <input id="nl-email" type="email" required placeholder="Alamat email" className="h-12 min-w-0 flex-1 border border-brand-line bg-transparent px-3.5 text-sm text-white placeholder:text-brand-muted focus:border-white focus:outline-none" />
      <button type="submit" className="h-12 bg-white px-5 text-[13px] font-medium tracking-[0.1em] text-brand uppercase hover:bg-soft">Daftar</button>
    </form>
  );
}
