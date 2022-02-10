import React, { useContext } from 'react';
import SongContext, { songContextDataType } from '../context/SongContext';
import { tracks } from '../data/tracks';
import { setSong } from '../utils/editorMethods';

export default function AutoComplete() {
  const { stage, song, i, stages, setStages } = useContext(SongContext) as songContextDataType;

  return (
    <ul className="absolute z-20 mt-1 w-[80vw] bg-white shadow-xl">
      {tracks
        .filter((track) => track.toUpperCase().includes(song.name.toUpperCase()))
        .slice(0, 10)
        .map((trackName) => (
          <li key={trackName} className="w-full">
            <button
              onMouseDown={() => {
                setSong({ stage, setStages, stages, i, songName: trackName });
              }}
              className="w-full border-b border-gray-200 py-2 px-3 text-left text-sm font-bold uppercase hover:bg-secondary-blue"
            >
              {trackName}
            </button>
          </li>
        ))}
    </ul>
  );
}
