import React, { ChangeEvent, useContext, useState } from 'react';
import { ArrowSmDownIcon, ArrowSmUpIcon, DotsVerticalIcon } from '@heroicons/react/solid';
import AutoComplete from './AutoComplete';
import SongContext, { songContextDataType } from '../context/SongContext';
import { setSong, addSong } from '../utils/editorMethods';

interface Props {
  last?: boolean;
}

export default function Selector(props: Props) {
  const { stage, stages, setStages, i, song } = useContext(SongContext) as songContextDataType;
  const [focussed, setFocus] = useState<boolean>(false);

  return (
    <li className={`${props.last ? 'opacity-40' : 'opacity-100'} flex select-none flex-row items-center gap-2 py-1`}>
      <div className="relative w-full">
        <input
          className="my-0 w-full rounded-none border border-b border-gray-300 bg-transparent py-2 px-3 font-bold uppercase text-black placeholder:text-gray-400"
          placeholder={props.last ? '+ADD SONG...' : 'SONG NAME...'}
          value={song.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setSong({ stages, setStages, songName: e.target.value, i, stage });
          }}
          onBlur={() => {
            console.log('aa');
            setFocus(false);
          }}
          onFocus={() => {
            setFocus(true);
            if (props.last) addSong({ stages, setStages, i, stage });
          }}
        />
        {focussed ? <AutoComplete /> : <></>}
      </div>
      <ArrowSmUpIcon className="h-6 w-6 flex-shrink-0 text-gray-600" />
      <ArrowSmDownIcon className="h-6 w-6 flex-shrink-0 text-gray-600" />
      <DotsVerticalIcon className="h-6 w-6 flex-shrink-0 text-gray-400" />
    </li>
  );
}
