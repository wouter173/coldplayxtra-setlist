import React, { ChangeEvent, useContext, useState } from 'react';
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  DotsVerticalIcon,
  GlobeAltIcon,
  PlusCircleIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  SparklesIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import AutoComplete from './AutoComplete';
import SongContext, { songContextDataType } from '../context/SongContext';
import { setSong, addSong, removeSong, moveSong } from '../utils/editorMethods';
import Menu, { menuItemType } from './Menu';
import Modal from './Modal';
import CustomInfoModal from './Modals/CustomInfoModal';
import ChangeStageModal from './Modals/ChangeStageModal';
import StageContext, { stageContextDataType } from '../context/StageContext';

interface Props {
  adder?: boolean;
  songCountReached: boolean;
}

export default function Selector(props: Props) {
  const { i, song } = useContext(SongContext) as songContextDataType;
  const { stage, stages, setStages } = useContext(StageContext) as stageContextDataType;
  const [inputFocus, setInputFocus] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [customInfoModalOpen, setCustomInfoModalOpen] = useState(false);
  const [changeStageModalOpen, setChangeStageModalOpen] = useState(false);
  const [moved, setMoved] = useState(false);
  const [value, setValue] = useState<string>('');

  const menuItems: menuItemType[] = [
    {
      Icon: PlusCircleIcon,
      name: 'ADD CUSTOM INFO',
      action: () => {
        setCustomInfoModalOpen(true);
      },
    },
    {
      Icon: SortAscendingIcon,
      name: 'ADD SONG ABOVE',
      action: () => {
        addSong({ stages, setStages, i, stage });
      },
    },
    {
      Icon: SortDescendingIcon,
      name: 'ADD SONG BELOW',
      action: () => {
        addSong({ stages, setStages, i: i + 1, stage });
      },
    },
    {
      Icon: GlobeAltIcon,
      name: 'CHANGE STAGE',
      action: () => {
        setChangeStageModalOpen(true);
      },
    },
    {
      Icon: TrashIcon,
      name: 'REMOVE',
      action: () => {
        removeSong({ stages, setStages, i, stage });
      },
    },
  ];

  if (props.songCountReached) {
    menuItems.splice(1, 2);
  }

  return (
    <li
      className={`
      ${props.adder ? 'opacity-40' : 'opacity-100'} 
      ${moved ? 'bg-secondary-blue' : ''} 
      flex select-none flex-row items-center py-1 transition-colors`}
    >
      {changeStageModalOpen ? (
        <Modal
          title="Change stage"
          onDismiss={() => setChangeStageModalOpen(false)}
          component={
            <ChangeStageModal
              stages={stages}
              modalOpen={[changeStageModalOpen, setChangeStageModalOpen]}
              onSubmit={(out) => {
                const newStage = stages.filter((s) => s.id == out.id)[0];
                const last = stages.indexOf(newStage) == stages.length - 1;
                addSong({ setStages, stage: newStage, i: newStage.songs.length - (last ? 1 : 0), stages });
                setSong({
                  stages,
                  setStages,
                  stage: newStage,
                  i: newStage.songs.length - (last ? 2 : 1),
                  customInfo: song.customInfo,
                  songName: song.name,
                });
                removeSong({ stages, setStages, stage, i });
              }}
              song={song}
            />
          }
        />
      ) : null}
      {customInfoModalOpen ? (
        <Modal
          title={song.name}
          onDismiss={() => setCustomInfoModalOpen(false)}
          component={
            <CustomInfoModal
              song={song}
              modalOpen={[customInfoModalOpen, setCustomInfoModalOpen]}
              onSubmit={(out) => {
                setSong({ stages, setStages, stage, i, customInfo: out });
              }}
            />
          }
        />
      ) : null}
      <div className="relative w-full">
        <input
          className="my-0 w-full rounded-none border border-b border-gray-300 bg-transparent py-1 px-1 font-bold uppercase text-black placeholder:text-gray-400"
          placeholder={props.adder ? '+ ADD SONG...' : 'SONG NAME...'}
          value={song.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSong({ stages, setStages, songName: e.target.value, i, stage });
            setValue(e.target.value);
          }}
          onBlur={() => {
            setInputFocus(false);
          }}
          onFocus={() => {
            setInputFocus(true);
            if (props.adder) addSong({ stages, setStages, i: i + 1, stage, id: song.id });
          }}
        />
        {inputFocus && value.length != 0 ? <AutoComplete /> : <></>}
      </div>
      <div className={`${props.adder ? 'pointer-events-none' : 'pointer-events-auto'} flex`}>
        <ArrowSmUpIcon
          className={`${
            props.adder || (stages.indexOf(stage) == 0 && stage.songs.indexOf(song) == 0)
              ? 'pointer-events-none text-gray-400'
              : 'cursor-pointer text-gray-600'
          } h-8 w-8 flex-shrink-0 rounded-sm p-1 sm:hover:bg-secondary-blue`}
          onClick={() => {
            moveSong({ stages, setStages, stage, i, to: i - 1 });
            setMoved(true);
            setTimeout(() => setMoved(false), 300);
          }}
        />
        <ArrowSmDownIcon
          className={`${
            props.adder ||
            (stages.indexOf(stage) == stages.length - 1 && stage.songs.indexOf(song) == stage.songs.length - 1)
              ? 'pointer-events-none text-gray-400'
              : 'cursor-pointer text-gray-600'
          } h-8 w-8 flex-shrink-0 rounded-sm p-1 sm:hover:bg-secondary-blue`}
          onClick={() => {
            moveSong({ stages, setStages, stage, i, to: i + 1 });
            setMoved(true);
            setTimeout(() => setMoved(false), 300);
          }}
        />
        <div className="h-8 w-8 flex-shrink-0">
          {song.customInfo.length > 0 ? (
            <SparklesIcon
              className="h-8 w-8 cursor-pointer rounded-sm p-1 text-gray-400 sm:hover:bg-secondary-blue"
              onClick={() => setCustomInfoModalOpen(true)}
            />
          ) : null}
        </div>
        <div className="relative h-6 w-6 flex-shrink-0 cursor-pointer py-1">
          <DotsVerticalIcon className="h-6 w-6 text-gray-400" onClick={() => setMenuOpen(true)} />
          {menuOpen ? <Menu items={menuItems} onDismiss={() => setMenuOpen(false)} /> : null}
        </div>
      </div>
    </li>
  );
}
