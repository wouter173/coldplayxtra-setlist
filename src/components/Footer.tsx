import Link from 'next/link';
import React from 'react';

const ClickIcon = ({ name, href }: { name: string; href: string }) => (
  <li>
    <a href={href} className="block h-8 w-8">
      <img src={`/icons/icons8-${name}-100.png`} alt={`${name} logo`} />
    </a>
  </li>
);

export default function Footer() {
  return (
    <footer className="mx-auto w-11/12 pb-8 sm:w-1/4">
      <ul className="mb-7 flex flex-row justify-center gap-6">
        <ClickIcon name="twitter" href="https://twitter.com/coldplayxtra" />
        <ClickIcon name="instagram" href="https://instagram.com/coldplayxtra" />
        <ClickIcon name="facebook" href="https://facebook.com/coldplayxtra" />
        <ClickIcon name="youtube" href="https://youtube.com/coldplayxtra" />
        <ClickIcon name="twitch" href="https://twitch.tv/coldplayxtra" />
      </ul>
      <hr className="opacity-30" />
      <Link href="/" passHref>
        <img src="/xtralogo_transparent.png" alt="coldplayxtra logo" className="mx-auto mt-4 block h-14" />
      </Link>
    </footer>
  );
}
