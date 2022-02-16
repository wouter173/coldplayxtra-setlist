import React, { PropsWithChildren } from 'react';

type Props = {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Button(props: PropsWithChildren<Props>) {
  const color = props.disabled ? 'opacity-60 cursor-default' : 'active:border-accent-active cursor-pointer';
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${props.className} ${color} block border border-secondary-pink p-4 font-body text-lg font-bold uppercase text-secondary-pink transition-colors`}
    >
      {props.children}
    </button>
  );
}
