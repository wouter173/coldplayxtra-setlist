import React from 'react';
import { stageType } from '../context/State';
import { GenerateID } from './IdGenerator';

type argsType<T = {}> = T & {
  stages: stageType[];
  setStages: React.Dispatch<stageType[]>;
};

const getStage = (stages: stageType[], stageID: string): number => {
  return stages.findIndex((val) => val.id == stageID);
};

export const setSong = (args: argsType<{ songName: string; i: number; stage: stageType }>) => {
  console.log(args.songName);
  const newStages: stageType[] = [...args.stages];
  const stageIndex = getStage(args.stages, args.stage.id);
  newStages[stageIndex].songs[args.i].name = args.songName;
  args.setStages(newStages);
};

export const addSong = ({ setStages, stages, stage }: argsType<{ i: number; stage: stageType }>) => {
  const newStages: stageType[] = [...stages];
  const stageIndex = getStage(stages, stage.id);
  newStages[stageIndex].songs.push({ id: GenerateID(), name: '' });
  setStages(newStages);
};

export const addStage = ({ stages, setStages }: argsType) => {
  setStages([...stages, { id: GenerateID(), name: 'new stage', songs: [{ id: GenerateID(), name: '' }] }]);
};
