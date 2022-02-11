import React, { Dispatch, useContext, useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Selector from '../components/Selector';
import { context, songType, stageType } from '../context/State';
import { addStage } from '../utils/editorMethods';
import SongContext from '../context/SongContext';
import StageHeader from '../components/StageHeader';
import { OverlayRenderer } from '../components/Overlay';

export default function Editor() {
  const [modalHidden, setModalHidden] = useState(false);
  const [stages, setStages] = useContext(context).stages as [stageType[], Dispatch<stageType[]>];

  return (
    <div className="bg-main h-fit min-h-min w-screen">
      <OverlayRenderer />
      <div className="grid h-full w-full" style={{ gridTemplateRows: 'min-content max-content' }}>
        <Header />
        <div className="row-span-4 mx-auto h-auto w-full bg-white px-2 py-10">
          <Modal hidden={modalHidden} onDismiss={() => setModalHidden(true)}>
            Reorder, add, edit, delete add special effecs Lorem ipsum instructions for how you can do your setlist here,
            press save when you’re done.
          </Modal>
          <ul>
            {stages.map((stage: stageType, stageIndex: number) => (
              <li key={stage.id}>
                <StageHeader stage={stage} />
                <ul>
                  {stage.songs.map((song: songType, songIndex: number) => (
                    <SongContext.Provider value={{ i: songIndex, song, setStages, stages, stage }} key={song.id}>
                      <Selector last={songIndex == stage.songs.length - 1 && stageIndex == stages.length - 1} />
                    </SongContext.Provider>
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
