import { useRouter } from 'next/router';
import React from 'react';
import Button from '../components/Button';
import Header from '../components/Header';

export default function Finish() {
  const router = useRouter();
  return (
    <div className="bg-main h-fit min-h-screen w-screen">
      <div className="h-fulll grid w-full" style={{ gridTemplateRows: 'min-content min-content max-content' }}>
        <Header />
        <nav className="g m-4 flex">
          <Button onClick={() => router.back()}>back</Button>
          <Button className="ml-auto">download</Button>
        </nav>
        <div>
          <canvas></canvas>
        </div>
      </div>
    </div>
  );
}
