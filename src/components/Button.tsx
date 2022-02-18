import React, { PropsWithChildren, useContext } from 'react';
import NavSizeContext from '../context/NavSizeContext';

type Props = {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Button(props: PropsWithChildren<Props>) {
  const sm = useContext(NavSizeContext);
  const color = props.disabled ? 'opacity-60 cursor-default' : 'active:border-accent-active cursor-pointer';
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${props.className} ${color} ${sm ? 'h-min p-3 text-base' : 'h-auto p-4 text-lg'}
      block border border-secondary-pink font-body font-bold uppercase text-secondary-pink transition-all`}
    >
      {props.children}
    </button>
  );
}
