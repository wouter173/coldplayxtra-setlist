import React, { PropsWithChildren } from 'react';

type Props = {
  hidden?: boolean;
  onDismiss?: () => void;
};

export default function Modal(props: PropsWithChildren<Props>) {
  return (
    <div
      className={`${
        props.hidden ? 'hidden' : ''
      } mb-10 grid h-auto w-full rounded-xl bg-secondary-blue p-6 text-sm font-bold text-[#4F4F4F]`}
    >
      {props.children}
      <div>
        <span onClick={props.onDismiss} className="float-left mb-0 mt-4 w-fit cursor-pointer text-[#9B51E0]">
          OKAY
        </span>
      </div>
    </div>
  );
}
