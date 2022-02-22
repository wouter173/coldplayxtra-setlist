import React, { useContext, useState } from 'react';
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
import { blank } from '../data/blank';
import { template } from '../data/template';
import Footer from '../components/Footer';

export default function Editor() {
  const [notificationHidden, setNotificationHidden] = useState(false);
  const states = useContext(context);
  const [stages, setStages] = states.stages;
  const [choice] = states.choice;
  const router = useRouter();
  return (
    <div className="bg-main h-min min-h-screen w-screen sm:overflow-auto">
      <OverlayRenderer />
      <ModalRenderer />
      <div className="grid w-full" style={{ gridTemplateRows: 'min-content min-content max-content min-content' }}>
        <Header />
        <Nav>
          <Button
            onClick={() => {
              router.push('/');
            }}
          >
            back
          </Button>
          <Button
            onClick={() => {
              if (confirm('Are you sure you want to reset your setlist? All changes will be lost.'))
                setStages(choice == 'blank' ? blank() : template());
            }}
          >
            reset
          </Button>
          <Button
            className="ml-auto"
            onClick={() => {
              const allSongs: songType[] = stages.reduce(
                (acc: songType[], cur: stageType) => [...acc, ...cur.songs],
                []
              );
              const allSongNames = allSongs.map((s) => s.name.toUpperCase());
              const emptySongs = allSongs.filter((s) => s.name == '');

              if (allSongNames.length != new Set(allSongNames).size) {
                if (!confirm('There are duplicate songs in your list.')) return;
              }

              if (emptySongs.length > 0) {
                alert('There are empty items in your setlist, please remove or add a song in this spot.');
                document.getElementById(emptySongs[0].id)?.focus();
                return;
              }
              router.push('/finish');
            }}
          >
            finish
          </Button>
        </Nav>
        <div className="mx-auto h-full min-h-[60vh] w-full bg-white px-2 py-10 !pb-16 sm:w-2/3 sm:p-8 ">
          <Notification buttonText="Got it!" hidden={notificationHidden} onDismiss={() => setNotificationHidden(true)}>
            <span className="font-bold">HERE WE GO! ⚡️</span>
            <br />
            <span className="font-medium">
              To customize your setlist, use the three dotted menu to add special effects and delete items. Use the
              arrows to reorder songs. When you’re happy, hit the finish button to render and share your setlist!
            </span>
          </Notification>
          <ul>
            {stages.map((stage: stageType, stageIndex: number) => (
              <li key={stage.id}>
                <StageContext.Provider value={{ stages, setStages, stage }}>
                  <StageHeader />
                  <ul>
                    {(() => {
                      const songCount = stages.reduce((acc: number, cur: stageType) => (acc += cur.songs.length), 0);
                      const currentSongs =
                        (stageIndex == stages.length - 1 || stage.songs.length == 0) && songCount < 24
                          ? [
                              ...stage.songs,
                              {
                                name: '',
                                customInfo: { values: [], other: '', otherVisible: false },
                                id: GenerateID(),
                              } as songType,
                            ]
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
            {stages.length < 5 ? (
              <button
                className="m-2 text-sm font-bold uppercase text-[#9B51E0]"
                onClick={() => addStage({ stages, setStages })}
              >
                + ADD STAGE...
              </button>
            ) : null}
          </ul>
        </div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}
