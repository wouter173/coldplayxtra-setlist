import { XIcon } from '@heroicons/react/outline';
import React, { useContext, useEffect } from 'react';
import ModalContext from '../context/ModalContext';
import Overlay from './Overlay';

export function ModalRenderer() {
  const {
    children: [Children],
    title: [title],
    active: [active],
    dismiss: [dismiss],
  } = useContext(ModalContext)!;
  //TODO weird bottom padding
  if (active)
    return (
      <div className="pointer-events-none fixed z-30 h-full w-full">
        <Overlay className="!z-30 bg-black bg-opacity-10" action={() => dismiss()} />
        <div className="pointer-events-auto absolute top-1/2 left-1/2 h-min w-max max-w-[100vw] -translate-x-1/2 -translate-y-1/2 transform bg-white p-8">
          <div className="flex w-full">
            <h2 className="mr-20 text-2xl font-bold uppercase">{title}</h2>
            <button className="ml-auto w-8" onClick={() => dismiss()}>
              <XIcon className="h-8 text-gray-500" />
            </button>
          </div>
          {Children}
        </div>
      </div>
    );
  else return null;
}

const Modal = (props: { title: string; onDismiss: () => void; component: JSX.Element }) => {
  const {
    active: [, setActive],
    children: [, setChildren],
    title: [, setTitle],
    dismiss: [, setDismiss],
  } = useContext(ModalContext)!;

  useEffect(() => {
    setActive(true);
    setChildren(props.component);
    setTitle(props.title);
    setDismiss(() => props.onDismiss);

    return () => {
      setActive(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default Modal;
