import React, { Dispatch, useContext, useState } from 'react';
import Header from '../components/Header';
import Notification from '../components/Notification';
import Selector from '../components/Selector';
import { context, songType, stageType } from '../context/State';
import { addStage } from '../utils/editorMethods';
import SongContext from '../context/SongContext';
import StageHeader from '../components/StageHeader';
import { OverlayRenderer } from '../components/Overlay';
import { ModalRenderer } from '../components/Modal';
import StageContext from '../context/StageContext';
import Button from '../components/Button';
import { useRouter } from 'next/router';

export default function Editor() {
  const [notificationHidden, setNotificationHidden] = useState(false);
  const [stages, setStages] = useContext(context).stages as [stageType[], Dispatch<stageType[]>];
  const router = useRouter();
  return (
    <div className="bg-main h-fit min-h-min w-screen">
      <OverlayRenderer />
      <ModalRenderer />
      <div className="grid h-full w-full" style={{ gridTemplateRows: 'min-content min-content max-content' }}>
        <Header />
        <nav className="m-4 flex gap-3">
          <Button disabled>reset</Button>
          <Button disabled>help</Button>
          <Button className="ml-auto" onClick={() => router.push('/finish')}>
            finish
          </Button>
        </nav>
        <div className="row-span-4 mx-auto h-auto w-full bg-white px-2 py-10 pb-52">
          <Notification hidden={notificationHidden} onDismiss={() => setNotificationHidden(true)}>
            Reorder, add, edit, delete add special effecs Lorem ipsum instructions for how you can do your setlist here,
            press save when you`re done.
          </Notification>
          <ul>
            {stages.map((stage: stageType, stageIndex: number) => (
              <li key={stage.id}>
                <StageContext.Provider value={{ stages, setStages, stage }}>
                  <StageHeader />
                  <ul>
                    {stage.songs.map((song: songType, songIndex: number) => (
                      <SongContext.Provider value={{ i: songIndex, song, setStages, stages, stage }} key={song.id}>
                        <Selector last={songIndex == stage.songs.length - 1 && stageIndex == stages.length - 1} />
                      </SongContext.Provider>
                    ))}
                  </ul>
                </StageContext.Provider>
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
