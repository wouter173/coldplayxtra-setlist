import React, { useContext } from 'react';
import SongContext, { songContextDataType } from '../context/SongContext';
import StageContext, { stageContextDataType } from '../context/StageContext';
import { tracks } from '../data/tracks';
import { setSong } from '../utils/editorMethods';

export default function AutoComplete() {
  const { stage, stages, setStages } = useContext(StageContext) as stageContextDataType;
  const { song, i } = useContext(SongContext) as songContextDataType;

  return (
    <div className="absolute z-20 mt-1 h-[calc(80px*4)] w-[80vw] sm:w-full">
      <ul className="w-full bg-white shadow-xl">
        {tracks
          .filter((track) => track.name.toUpperCase().includes(song.name.toUpperCase()))
          .slice(0, 4)
          .map((track) => {
            let artwork;
            if (track.artwork) {
              artwork = <img className="h-14 w-14" alt={track.album + ' album cover'} src={track.artwork} />;
            }

            return (
              <li key={track.name} className="min-h-20 w-full">
                <button
                  onMouseDown={() => {
                    setSong({ stage, setStages, stages, i, songName: track.name });
                  }}
                  className="w-full border-b border-gray-200 py-2 px-3 hover:bg-secondary-blue"
                >
                  <div className="flex items-center">
                    {artwork}
                    <div className="px-3 py-2 text-left">
                      <span className="text-base font-bold uppercase text-black">{track.name}</span>
                      <span className="block text-sm uppercase text-gray-500">{track.album}</span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
