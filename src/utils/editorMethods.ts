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

export const setSong = (args: argsType<{ songName?: string; i: number; stage: stageType; customInfo?: string[] }>) => {
  const newStages = [...args.stages];
  const stageIndex = getStage(args.stages, args.stage.id);
  if (args.songName != undefined) newStages[stageIndex].songs[args.i].name = args.songName;
  if (args.customInfo != undefined) newStages[stageIndex].songs[args.i].customInfo = args.customInfo;
  args.setStages(newStages);
};

export const addSong = ({ setStages, stages, stage, i }: argsType<{ i: number; stage: stageType }>) => {
  const newStages = [...stages];
  const stageIndex = getStage(stages, stage.id);
  newStages[stageIndex].songs.splice(i, 0, { id: GenerateID(), name: '', customInfo: [] });
  setStages(newStages);
};

export const removeSong = ({ setStages, stages, stage, i }: argsType<{ i: number; stage: stageType }>) => {
  const newStages = [...stages];
  const stageIndex = getStage(stages, stage.id);
  newStages[stageIndex].songs.splice(i, 1);
  setStages(newStages);
};

export const moveSong = (args: argsType<{ i: number; to: number; stage: stageType }>) => {
  const newStages = [...args.stages];
  const stageIndex = getStage(args.stages, args.stage.id);
  newStages[stageIndex].songs.splice(args.to, 0, newStages[stageIndex].songs.splice(args.i, 1)[0]);
  args.setStages(newStages);
};

export const addStage = ({ stages, setStages }: argsType) => {
  setStages([
    ...stages,
    { id: GenerateID(), name: 'new stage', songs: [{ id: GenerateID(), name: '', customInfo: [] }] },
  ]);
};

export const removeStage = ({ stages, setStages, stage }: argsType<{ stage: stageType }>) => {
  setStages(stages.filter((el) => el.id != stage.id));
};

export const renameStage = (args: argsType<{ stage: stageType; name: string }>) => {
  const newStages = [...args.stages];
  const newStageIndex = getStage(args.stages, args.stage.id);
  newStages[newStageIndex].name = args.name;
  args.setStages(newStages);
};
