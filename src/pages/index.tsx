import type { NextPage } from 'next';
import Button from '../components/button';

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen bg-background-main">
      <div className="mx-auto w-10/12 py-12">
        <Button>test button</Button>
        <Button outline>test button</Button>
        <Button disabled>test button</Button>
        <Button outline disabled>
          test button
        </Button>
      </div>
    </div>
  );
};

export default Home;
