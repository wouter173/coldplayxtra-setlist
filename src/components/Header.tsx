import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <div className="mx-auto h-40 w-10/12 pt-12 text-center sm:h-60">
      <Link href="/" passHref>
        <img className="mx-auto h-16 sm:h-28" src="/xtralogo_transparent.png" alt="coldplayxtra logo" />
      </Link>
      <h1 className="font-mono text-xl text-secondary-pink sm:text-2xl">SETLIST MAKER</h1>
    </div>
  );
}
