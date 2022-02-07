import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Button from '../components/Button';
import Header from '../components/header';
import Input from '../components/Input';
import { context } from '../context/State';

const Home: NextPage = () => {
  const states = useContext(context);
  const router = useRouter();

  return (
    <div className="h-screen min-h-fit w-screen bg-background-main">
      <div className="grid h-full w-full" style={{ gridTemplateRows: 'min-content min-content max-content' }}>
        <Header />
        <div className="mx-auto w-10/12 py-12">
          <h2 className="text-center text-2xl font-bold text-white">STEP 1</h2>
          <Input placeholder="Enter your name..." type="text" centered state={states.name} />
          <Button
            outline
            onClick={() => {
              router.push('/choose');
            }}
          >
            Get started
          </Button>
        </div>
        <div className="row-span-4 mx-auto h-auto w-10/12 rounded-t-xl bg-white bg-opacity-10"></div>
      </div>
    </div>
  );
};

export default Home;
