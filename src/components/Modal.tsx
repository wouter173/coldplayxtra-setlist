import React, { PropsWithChildren } from 'react';
import Button from './Button';

type Props = {
  hidden?: boolean;
  onDismiss?: () => void;
};

export default function Modal(props: PropsWithChildren<Props>) {
  return (
    <div
      className={`${
        props.hidden ? 'hidden' : ''
      } grid h-auto w-full rounded-xl bg-accent-disabled bg-opacity-40 p-4 font-bold text-white`}
    >
      {props.children}
      <div>
        <Button onClick={props.onDismiss} className="float-right mb-0 w-fit">
          Let{"'"}s go
        </Button>
      </div>
    </div>
  );
}
