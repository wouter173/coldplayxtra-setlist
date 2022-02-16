import { createContext } from 'react';
import { songType } from './State';

export type songContextDataType = {
  song: songType;
  i: number;
};

const context = createContext<songContextDataType | null>(null);
export default context;
