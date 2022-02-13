import { XIcon } from '@heroicons/react/outline';
import React, { PropsWithChildren, useContext, useEffect } from 'react';
import ModalContext from '../context/ModalContext';
import Overlay from './Overlay';

export function ModalRenderer() {
  const {
    children: [children],
    title: [title],
    active: [active],
    dismiss: [dismiss],
  } = useContext(ModalContext)!;
  if (active)
    return (
      <div className="pointer-events-none fixed z-20 h-full w-full">
        <Overlay className="bg-black bg-opacity-10" action={() => dismiss()} />
        <div className="pointer-events-auto absolute top-1/2 left-1/2 h-max w-max max-w-[100vw] -translate-x-1/2 -translate-y-1/2 transform bg-white p-8">
          <div className="flex">
            <h2 className="text-2xl font-bold uppercase">{title}</h2>
            <button className="mr-auto" onClick={() => dismiss()}>
              <XIcon className="ml-20 h-8 w-8 text-[#BB6BD9]" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  else return null;
}

const Modal = (props: PropsWithChildren<{ title: string; onDismiss: () => void }>) => {
  const {
    active: [, setActive],
    children: [, setChildren],
    title: [, setTitle],
    dismiss: [, setDismiss],
  } = useContext(ModalContext)!;

  useEffect(() => {
    setActive(true);
    setChildren(props.children);
    setTitle(props.title);
    setDismiss(() => props.onDismiss);

    return () => {
      setActive(false);
    };
  }, []);
  return <></>;
};

export default Modal;
