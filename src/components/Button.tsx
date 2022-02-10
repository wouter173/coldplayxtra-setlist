import React, { PropsWithChildren } from 'react';

type Props = {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Button(props: PropsWithChildren<Props>) {
  const color = props.disabled ? 'border-accent-disabled' : 'border-accent-main active:border-accent-active';
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${props.className} ${color} mx-auto my-4 block w-full border py-6 px-4 font-body text-xl font-extrabold uppercase text-accent-main transition-colors`}
    >
      {props.children}
    </button>
  );
}
