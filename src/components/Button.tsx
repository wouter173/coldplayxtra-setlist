import React, { PropsWithChildren } from 'react';

type Props = {
  outline?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Button(props: PropsWithChildren<Props>) {
  let color = '';
  if (props.outline) {
    color += 'border border-2 ';
    color += props.disabled ? 'border-accent-disabled' : 'border-accent-main active:border-accent-active';
  } else {
    color = props.disabled ? 'bg-accent-disabled' : 'bg-accent-main active:bg-accent-active';
  }

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${props.className} ${color} my-4 block w-full min-w-min rounded-xl py-3 px-5 font-body font-extrabold text-white transition-colors`}
    >
      {props.children}
    </button>
  );
}
