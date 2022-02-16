import { createContext, Dispatch } from 'react';
import { stageType } from './State';

export type stageContextDataType = {
  stage: stageType;
  stages: stageType[];
  setStages: Dispatch<stageType[]>;
};

const context = createContext<stageContextDataType | null>(null);
export default context;
