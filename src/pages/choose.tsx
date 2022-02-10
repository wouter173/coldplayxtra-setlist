import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import { context } from '../context/State';

export default function Editor() {
  const router = useRouter();
  const states = useContext(context);
  const [name] = states.name;

  return (
    <div className="bg-main h-screen min-h-fit w-screen">
      <div className="grid h-full w-full" style={{ gridTemplateRows: 'min-content max-content' }}>
        <Header />
        <div className="row-span-4 mx-auto h-auto w-11/12 bg-secondary-purple p-8">
          <div className="mx-auto text-center">
            <h2 className="my-8 text-3xl font-bold">Hey, {name}!</h2>
            <span className="mb-8 block">Step 2. How would you like to create your setlist?</span>
            <Button>Use a template</Button>
            <Button onClick={() => router.push('/editor')}>Start from scratch</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
