import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PropsWithChildren, useContext } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import { context } from '../context/State';

const HomeCard = ({ title, className, children }: PropsWithChildren<{ title?: string; className?: string }>) => (
  <div className={`${className} mx-auto w-11/12 bg-white bg-opacity-5 p-6 text-white`}>
    {title ? <h3 className="font-mono text-2xl font-bold uppercase">{title}</h3> : null}
    <p className="font-mono">{children}</p>
  </div>
);

const Home: NextPage = () => {
  const states = useContext(context);
  const router = useRouter();
  const [stages] = states.stages;

  return (
    <div className="bg-main min-h-fit w-screen">
      <div className="min-h-full min-w-full pb-24">
        <Header />
        <div className="mx-auto w-10/12 pt-12 pb-24">
          <h2 className="my-10 text-center text-lg text-white">
            Please enter your first name, or your @name, whichever you prefer!
          </h2>
          <Input
            className="mb-12 border-b-4 border-[#FFC0CB] text-3xl placeholder:opacity-30"
            placeholder="Name..."
            centered
            type="text"
            state={states.name}
          />
          <Button
            className="mx-auto w-max border-[#FFC0CB] p-6 text-[#FFC0CB]"
            disabled={states.name[0].length == 0}
            onClick={() => {
              if (stages.length > 0) router.push('/editor');
              else router.push('/choose');
            }}
          >
            GET STARTED
          </Button>
        </div>
        <div>
          <HomeCard title="Welcome 👋">
            In anticipation of Coldplay’s upcomming Music of the Spheres World Tour, we thought it would be fun to think
            about what the setlist might look like before big first show in Costa Rica on March 18
          </HomeCard>
          <img src="/coldplay_bg.jpg" alt="coldplay playing music" className="w-full" />
          <HomeCard>
            We had so much fun thinking about what the shows might look like, we wanted to make something that all fans
            could enjoy. Presenting to you... the ColdplayXtra Setlist Maker!
          </HomeCard>
          <HomeCard title="About the tool ℹ️" className="mt-10">
            The ColdplayXtra Setlist Maker makes it easy for you to make your dream Coldplay setlist
            <br />
            <br />
            1. Get started by adding your name, or your @name, whatever you prefer! This will show up on your completed
            setlist
            <br />
            <br />
            2. Select either a template to work with, or a blank canvas to start from scratch
          </HomeCard>
          <img src="/preview_1.png" alt="preview of the tool" className="w-full" />
          <HomeCard>
            3. Select songs from the band’s discography and reorder them with ease. Customize songs with special
            effects, such as pyro, lasers and of course, confetti.
            <br />
            <br />
            4. You can add sections that note where the song will be played, such as the Main-stage, B-Stage and
            C-Stages of the venue
          </HomeCard>
          <img src="/preview_2.png" alt="preview of the tool" className="w-full" />
          <HomeCard className="mb-10">
            5. When happy with the order and contents of your setlist, you can render a beautiful image that looks quite
            similar to the setlists seen on-stage
            <br />
            <br />
            6. Share your setlist with friends on Social Media
          </HomeCard>
          <img src="/preview_3.png" alt="preview of the tool" className="w-full" />
          <HomeCard title="your setlist 📱️">
            The images can then be shared on any social media wesbite or with friends to compare
            <br />
            <br />
            We would like to thank Dutch duo @wouter and @sting for bringing the tool to life
          </HomeCard>
        </div>
      </div>
    </div>
  );
};

export default Home;
