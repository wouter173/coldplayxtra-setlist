import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { template } from '../data/template';

type contextType<T> = { [key: string]: [T, Dispatch<SetStateAction<T>>] };
export type songType = {
  id: string;
  name: string;
  customInfo: string[];
};
export type stageType = { id: string; name: string; songs: songType[] };

const context = createContext<contextType<any>>({});

const Provider = (props: PropsWithChildren<{}>) => {
  const name = useState('');
  const stages = useState<stageType[]>(template());
  return <context.Provider value={{ name, stages }}>{props.children}</context.Provider>;
};

export { Provider, context };
