import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import { context } from '../context/State';

const Home: NextPage = () => {
  const states = useContext(context);
  const router = useRouter();

  return (
    <div className="bg-main h-screen min-h-fit w-screen">
      <div className="grid h-full w-full" style={{ gridTemplateRows: 'min-content min-content max-content' }}>
        <Header />
        <div className="mx-auto mt-20 w-10/12 pt-12 pb-24">
          <h2 className="text-center text-sm font-bold text-white">Step 1. enter your name</h2>
          <Input
            className="mb-12 border-[#FFC0CB] text-3xl"
            placeholder="Name..."
            centered
            type="text"
            state={states.name}
          />
          <Button
            className="w-max border-[#FFC0CB] text-[#FFC0CB]"
            onClick={() => {
              router.push('/choose');
            }}
          >
            GET STARTED
          </Button>
        </div>
        <div className="row-span-4 mx-auto h-auto w-10/12 bg-secondary-purple"></div>
      </div>
    </div>
  );
};

export default Home;
