import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import Canvas from '../components/Canvas';
import Header from '../components/Header';

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
      <div className="h-fulll grid w-full" style={{ gridTemplateRows: 'min-content min-content max-content' }}>
        <Header />
        <nav className="g m-4 flex">
          <Button onClick={() => router.back()}>back</Button>
          <div className="flerx-col ml-auto flex">
            <Button className="ml-2" onClick={() => (canShare ? share() : download())}>
              Download
            </Button>
          </div>
        </nav>
        <div>
          <Canvas className="mx-auto w-full" getData={(data) => setData(data)} />
        </div>
      </div>
    </div>
  );
}
