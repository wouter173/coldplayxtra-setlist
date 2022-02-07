import React, { PropsWithChildren } from 'react';
import Button from './Button';

export default function Modal(props: PropsWithChildren<{}>) {
  return (
    <div className="grid h-auto w-full rounded-xl bg-accent-disabled bg-opacity-40 p-4 font-bold text-white">
      {props.children}
      <div>
        <Button className="float-right mb-0 w-fit">Let{"'"}s go</Button>
      </div>
    </div>
  );
}
