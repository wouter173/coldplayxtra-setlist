import React, { useContext, useState } from 'react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Selector from '../components/Selector';
import { context, songType, stageType } from '../context/State';
import { addSong, addStage, setSong } from '../utils/editorMethods';

export default function Editor() {
  const [modalHidden, setModalHidden] = useState(false);
  const [stages, setStages] = useContext(context).stages;

  return (
    <div className="bg-main h-fit min-h-min w-screen">
      <div className="grid h-full w-full" style={{ gridTemplateRows: 'min-content max-content' }}>
        <Header />
        <div className="row-span-4 mx-auto h-auto w-full bg-white px-4 py-10">
          <Modal hidden={modalHidden} onDismiss={() => setModalHidden(true)}>
            Reorder, add, edit, delete add special effecs Lorem ipsum instructions for how you can do your setlist here,
            press save when you’re done.
          </Modal>
          <ul>
            {stages.map((stage: stageType) => (
              <li key={stage.name}>
                <div className="my-2 flex items-center">
                  <h2 className="ml-2 text-sm font-bold uppercase underline">{stage.name}</h2>
                  <DotsVerticalIcon className="ml-auto h-6 w-6 text-gray-400" />
                </div>
                <ul>
                  {stage.songs.map((song: songType, i: number) => (
                    <Selector
                      key={i}
                      value={song.name}
                      index={i}
                      setSong={(songName) => setSong({ stages, setStages, songName, i, stage })}
                      last={i == stage.songs.length - 1}
                      onFocus={() => {
                        addSong({ stages, setStages, i, stage });
                      }}
                    ></Selector>
                  ))}
                </ul>
              </li>
            ))}
            <button
              className="m-2 text-sm font-bold uppercase text-[#9B51E0]"
              onClick={() => addStage({ stages, setStages })}
            >
              +ADD STAGE...
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
