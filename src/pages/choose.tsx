import { useRouter } from 'next/router';
import React, { ReactNode, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { AddListIcon, NumberedListIcon } from '../components/Icons';
import { context } from '../context/State';
import { blank } from '../data/blank';
import { template } from '../data/template';

const ChooseButton = (props: { onClick: () => void; img?: string; Icon?: ReactNode; text: string }) => {
  const { onClick, img, Icon, text } = props;
  return (
    <button className="mb-6 w-full" onClick={() => onClick()}>
      {img ? (
        <div className="relative h-auto w-full" style={{ boxShadow: '0px 0px 20px rgba(255, 192, 203, 0.4)' }}>
          <img
            src={img}
            alt="preview image"
            className="w-full border-x border-t border-secondary-pink object-cover after:absolute after:block after:h-full  after:w-full after:bg-opacity-10 sm:h-52"
          />
          <div className="absolute top-0 left-0 h-full w-full bg-[#FEC0FF] bg-opacity-20"></div>
        </div>
      ) : null}
      <div className="flex w-full items-center justify-center border border-secondary-pink p-6 text-lg font-bold uppercase text-secondary-pink">
        {Icon}
        <span>{text}</span>
      </div>
    </button>
  );
};

export default function Editor() {
  const router = useRouter();
  const states = useContext(context);
  const [, setChoice] = states.choice;
  const [, setStages] = states.stages;
  const [name] = states.name;

  return (
    <div className="bg-main h-fit min-h-screen w-screen">
      <div className="grid h-full w-full" style={{ gridTemplateRows: 'min-content max-content min-content' }}>
        <Header />
        <div className="mx-auto w-10/12 text-center text-white">
          <h2 className="mt-4 mb-2 text-3xl font-bold uppercase">Hey, {name} 👋</h2>
          <span className="mb-8 block">how would you like to build your setlist?</span>
        </div>
        <div className="mx-auto mb-32 w-11/12 sm:mt-10 sm:grid sm:w-4/5 sm:grid-cols-2 sm:gap-4">
          <ChooseButton
            onClick={() => {
              setChoice('template');
              setStages(template());
              router.push('/editor');
            }}
            img="/template_preview.png"
            Icon={<NumberedListIcon className="mr-4 h-6 w-6" />}
            text="Use a template"
          />

          <ChooseButton
            onClick={() => {
              setChoice('blank');
              setStages(blank());
              router.push('/editor');
            }}
            img="/blank_preview.png"
            Icon={<AddListIcon className="mr-4 h-6 w-6" />}
            text="Blank canvas"
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
