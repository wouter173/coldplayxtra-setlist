import React, { ChangeEvent, useContext, useState } from 'react';
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  DotsVerticalIcon,
  GlobeAltIcon,
  PlusCircleIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from '@heroicons/react/outline';
import AutoComplete from './AutoComplete';
import SongContext, { songContextDataType } from '../context/SongContext';
import { setSong, addSong } from '../utils/editorMethods';
import Menu, { menuItemType } from './Menu';

interface Props {
  last?: boolean;
}

export default function Selector(props: Props) {
  const { stage, stages, setStages, i, song } = useContext(SongContext) as songContextDataType;
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const menuItems: menuItemType[] = [
    {
      Icon: PlusCircleIcon,
      name: 'ADD CUSTOM INFO',
      action: () => {
        console.log('custom info');
      },
    },
    {
      Icon: SortAscendingIcon,
      name: 'ADD SONG ABOVE',
      action: () => {
        addSong({ stages, setStages, i, stage });
        setMenuOpen(false);
      },
    },
    {
      Icon: SortDescendingIcon,
      name: 'ADD SONG BELOW',
      action: () => {
        addSong({ stages, setStages, i: i + 1, stage });
        setMenuOpen(false);
      },
    },
    {
      Icon: GlobeAltIcon,
      name: 'CHANGE STAGE',
      action: () => {
        console.log('change stage');
      },
    },
    {
      name: 'REMOVE',
      action: () => {
        console.log('remove');
      },
    },
  ];

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
            setInputFocus(false);
          }}
          onFocus={() => {
            setInputFocus(true);
            if (props.last) addSong({ stages, setStages, i: i + 1, stage });
          }}
        />
        {inputFocus ? <AutoComplete /> : <></>}
      </div>
      <ArrowSmUpIcon className="h-6 w-6 flex-shrink-0 text-gray-600" />
      <ArrowSmDownIcon className="h-6 w-6 flex-shrink-0 text-gray-600" />
      <div className="relative h-6 w-6 flex-shrink-0">
        <DotsVerticalIcon className="h-6 w-6 text-gray-400" onClick={() => setMenuOpen(true)} />
        {menuOpen ? <Menu items={menuItems} onBlur={() => setMenuOpen(false)} /> : null}
      </div>
    </li>
  );
}
