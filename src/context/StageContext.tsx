import { createContext, Dispatch } from 'react';
import { stageType } from './State';

type stageContextData = {
  stage: stageType;
  stages: stageType[];
  setStages: Dispatch<stageType[]>;
};

const context = createContext<stageContextData | null>(null);
export default context;
