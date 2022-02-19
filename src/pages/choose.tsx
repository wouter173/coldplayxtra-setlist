import { DocumentAddIcon, ViewListIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { ReactNode, useContext } from 'react';
import Header from '../components/Header';
import { context } from '../context/State';
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
            className="w-full border-x border-t border-secondary-pink after:absolute after:block after:h-full after:w-full  after:bg-opacity-10"
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
  const [, setStages] = states.stages;
  const [name] = states.name;

  return (
    <div className="bg-main h-fit min-h-screen w-screen">
      <div className="grid h-full w-full" style={{ gridTemplateRows: 'min-content max-content' }}>
        <Header />
        <div className="mx-auto w-10/12 text-center text-white sm:mt-10">
          <h2 className="mt-4 text-3xl font-bold uppercase">Hey, {name} 👋</h2>
          <span className="mb-8 block">how would you like to build your setlist?</span>
        </div>
        <div className="mx-auto w-11/12 sm:mt-10 sm:w-2/5">
          <ChooseButton
            onClick={() => {
              setStages(template());
              router.push('/editor');
            }}
            img="/template_preview.png"
            Icon={<ViewListIcon className="mr-1 h-6 w-6" />}
            text="Use a template"
          />

          <ChooseButton
            onClick={() => {
              setStages([]);
              router.push('/editor');
            }}
            img="/blank_preview.png"
            Icon={<DocumentAddIcon className="mr-1 h-6 w-6" />}
            text="Blank canvas"
          />
        </div>
      </div>
    </div>
  );
}
