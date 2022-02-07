import type { NextPage } from 'next';
import { useContext } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { context } from '../context/State';

const Home: NextPage = () => {
  const states = useContext(context);

  return (
    <div className="h-screen w-screen bg-background-main">
      <div className="mx-auto w-10/12 py-12">
        <Button>test button</Button>
        <Button outline>test button</Button>
        <Button disabled>test button</Button>
        <Button outline disabled>
          test button
        </Button>
        <Input placeholder="Enter your name..." type="text" centered state={states.name} />
      </div>
    </div>
  );
};

export default Home;
