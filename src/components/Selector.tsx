import React, { useState } from 'react';
import { ArrowSmDownIcon, ArrowSmUpIcon, DotsVerticalIcon } from '@heroicons/react/solid';

interface Props {
  index: number;
  value: string;
  setSong: (songName: string) => void;
  last?: boolean;
  onFocus?: () => void;
}

export default function Selector(props: Props) {
  const [focussed, setFocus] = useState<boolean>(false);

  return (
    <li className={`${props.last ? 'opacity-40' : 'opacity-100'} flex select-none flex-row items-center gap-2 py-1`}>
      <div className="relative w-full" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
        <input
          className="my-0 w-full rounded-none border border-b border-gray-300 bg-transparent py-2 px-3 font-bold uppercase text-black placeholder:text-gray-600"
          placeholder={props.last ? '+ADD SONG...' : 'SONG NAME...'}
          value={props.value}
          onChange={(e) => props.setSong(e.target.value)}
          onFocus={() => {
            if (props.last && props.onFocus) props.onFocus!();
          }}
        />
        {focussed ? (
          <ul className="absolute z-20 mt-1 w-full bg-white shadow-md">
            {Array(5)
              .fill('aadb')
              .map((songName) => (
                <li key={songName} className="w-full">
                  <button
                    onMouseDown={() => {
                      props.setSong(songName);
                    }}
                    className="w-full border-b border-gray-200 py-2 px-3 text-left font-bold uppercase hover:bg-secondary-blue"
                  >
                    {songName}
                  </button>
                </li>
              ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
      <ArrowSmUpIcon className="h-6 w-6 flex-shrink-0 text-gray-600" />
      <ArrowSmDownIcon className="h-6 w-6 flex-shrink-0 text-gray-600" />
      <DotsVerticalIcon className="h-6 w-6 flex-shrink-0 text-gray-400" />
    </li>
  );
}
