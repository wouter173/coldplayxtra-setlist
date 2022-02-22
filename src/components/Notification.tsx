import React, { PropsWithChildren } from 'react';

type Props = {
  hidden?: boolean;
  onDismiss?: () => void;
  buttonText: string;
};

export default function Notification(props: PropsWithChildren<Props>) {
  return (
    <div
      className={`${
        props.hidden ? 'hidden' : ''
      } mb-10 grid h-auto w-full rounded-xl bg-secondary-blue p-6 text-sm font-bold text-[#4F4F4F]`}
    >
      {props.children}
      <div>
        <span onClick={props.onDismiss} className="float-left mb-0 mt-4 w-fit cursor-pointer font-bold text-[#9B51E0]">
          {props.buttonText}
        </span>
      </div>
    </div>
  );
}
