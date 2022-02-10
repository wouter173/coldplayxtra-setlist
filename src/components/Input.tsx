import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  state: [string, Dispatch<SetStateAction<string>>];
  placeholder?: string;
  centered?: boolean;
  type?: string;
  className?: string;
};

export default function Input(props: Props) {
  const [state, setState] = props.state;

  return (
    <input
      onChange={(e) => setState(e.target.value)}
      value={state}
      type={props.type || 'text'}
      placeholder={props.placeholder}
      className={`${props.className} ${
        props.centered ? 'text-center placeholder:text-center' : ''
      } my-4 block w-full min-w-min rounded-none border-b-2 border-accent-main bg-transparent p-3 font-body text-3xl font-extrabold uppercase text-white placeholder:text-gray-300`}
    />
  );
}
