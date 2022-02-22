import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import Canvas from '../components/Canvas';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const ClickButton = ({ name, href }: { name: string; href: string }) => (
  <li className="w-full border border-secondary-pink text-center">
    <a href={href} className="block h-full w-full py-4 text-lg font-bold uppercase text-secondary-pink">
      {name}
    </a>
  </li>
);

export default function Finish() {
  const router = useRouter();
  const [data, setData] = useState('');
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    console.log(window.navigator.share);
    setCanShare(window.navigator.canShare != undefined);
  }, []);

  const share = async () => {
    const blob = await (await fetch(data)).blob();
    navigator
      .share({
        files: [new File([blob], 'setlist.png', { type: blob.type, lastModified: new Date().getTime() })],
      })
      .catch(() => {
        console.log('share cancelled');
      });
  };

  const download = async () => {
    const el = document.createElement('a');
    const blob = await (await fetch(data)).blob();
    el.href = URL.createObjectURL(blob);
    el.download = 'setlist';
    el.click();
  };

  return (
    <div className="bg-main h-fit min-h-screen w-screen">
      <div
        className="h-fulll grid w-full"
        style={{ gridTemplateRows: 'min-content min-content max-content min-content min-content' }}
      >
        <Header />
        <Nav>
          <Button onClick={() => router.back()}>back</Button>
          <div className="ml-auto">
            <Button className="ml-2" onClick={() => (canShare ? share() : download())}>
              Download
            </Button>
          </div>
        </Nav>
        <div className="mx-auto h-[calc(100vw/1200*1500)] w-full bg-purple-900 bg-opacity-10 sm:h-[calc(66vw/1200*1500)] sm:w-2/3">
          {data == '' ? <p className="mt-16 text-center text-white opacity-70">rendering...</p> : null}
          <Canvas className="w-full" getData={(data) => setData(data)} />
        </div>
        <ul className="mx-auto mt-6 mb-16 flex w-10/12 flex-col gap-4 sm:w-1/4">
          <ClickButton name="Buy MOTS tickets ⚡️" href="" />
          <ClickButton name="Buy us a coffee ☕️" href="" />
          <ClickButton name="Follow us on social Media" href="" />
        </ul>
        <Footer />
      </div>
    </div>
  );
}
