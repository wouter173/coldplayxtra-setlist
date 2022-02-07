import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Button from '../components/Button';
import Header from '../components/header';
import { context } from '../context/State';

export default function Editor() {
  const router = useRouter();
  const states = useContext(context);
  const [name] = states.name;

  return (
    <div className="h-screen min-h-fit w-screen bg-background-main">
      <div className="grid h-full w-full" style={{ gridTemplateRows: 'min-content max-content' }}>
        <Header />
        <div className="row-span-4 mx-auto h-auto w-11/12 rounded-t-xl bg-gray-300 p-8">
          <div className="mx-auto text-center">
            <h2 className="mb-12 text-2xl font-bold">Hey, {name}</h2>
            <h3 className="text-2xl font-bold">STEP 2</h3>
            <span className="mb-8 block">Create your list:</span>
            <Button>Use a template</Button>
            <span className="text-sm">or</span>
            <Button onClick={() => router.push('/editor')}>Start from scratch</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
