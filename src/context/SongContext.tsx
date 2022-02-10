import { createContext, Dispatch } from 'react';
import { songType, stageType } from './State';

export type songContextDataType = {
  song: songType;
  stage: stageType;
  stages: stageType[];
  setStages: Dispatch<stageType[]>;
  i: number;
};

const context = createContext<songContextDataType | null>(null);
export default context;
