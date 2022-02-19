import { useRouter } from 'next/router';
import React from 'react';

export default function Header() {
  const router = useRouter();
  return (
    <div className="mx-auto h-40 w-10/12 pt-12 text-center">
      <img
        onClick={() => {
          router.push('/');
        }}
        className="mx-auto h-16 sm:h-28"
        src="/xtralogo_transparent.png"
        alt="xtralogo_transparent"
      />
      <h1 className="font-mono text-xl text-secondary-pink sm:text-2xl">SETLIST MAKER</h1>
    </div>
  );
}
