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
import { GenerateID } from '../utils/IdGenerator';
import Nav from '../components/Nav';

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
        <Nav>
          <Button disabled>undo</Button>
          <Button disabled>reset</Button>
          <Button className="ml-auto" onClick={() => router.push('/finish')}>
            finish
          </Button>
        </Nav>
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
                    {(() => {
                      const songCount = stages.reduce((acc, cur) => (acc += cur.songs.length), 0);
                      const currentSongs =
                        (stageIndex == stages.length - 1 || stage.songs.length == 0) && songCount < 24
                          ? [...stage.songs, { name: '', customInfo: [], id: GenerateID() } as songType]
                          : stage.songs;
                      return currentSongs.map((song: songType, songIndex: number) => (
                        <SongContext.Provider value={{ i: songIndex, song }} key={song.id}>
                          <Selector
                            adder={
                              (songIndex == stage.songs.length && stageIndex == stages.length - 1) ||
                              (stage.songs.length == 0 && stageIndex != stages.length - 1)
                            }
                            songCountReached={songCount >= 24}
                          />
                        </SongContext.Provider>
                      ));
                    })()}
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
