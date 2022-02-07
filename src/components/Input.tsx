import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  state: [string, Dispatch<SetStateAction<string>>];
  placeholder?: string;
  centered?: boolean;
  type?: string;
};

export default function Input(props: Props) {
  const [state, setState] = props.state;

  return (
    <input
      onChange={(e) => setState(e.target.value)}
      value={state}
      type={props.type || 'text'}
      placeholder={props.placeholder}
      className={`${
        props.centered ? 'text-center placeholder:text-center' : ''
      } my-4 block w-full min-w-min rounded-xl bg-accent-main p-3 font-body font-extrabold text-white placeholder:text-gray-300 active:bg-accent-active`}
    />
  );
}
