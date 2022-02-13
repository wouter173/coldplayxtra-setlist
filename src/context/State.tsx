import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { GenerateID } from '../utils/IdGenerator';

type contextType<T> = { [key: string]: [T, Dispatch<SetStateAction<T>>] };
export type songType = { id: string; name: string; customInfo: string[] };
export type stageType = { id: string; name: string; songs: songType[] };

const context = createContext<contextType<any>>({});

const Provider = (props: PropsWithChildren<{}>) => {
  const name = useState('');
  const stages = useState<stageType[]>([
    {
      id: GenerateID(),
      name: 'stageA',
      songs: [
        { id: GenerateID(), name: 'Hymn for the weekend', customInfo: [] },
        { id: GenerateID(), name: 'Higher Power', customInfo: [] },
        { id: GenerateID(), name: '', customInfo: [] },
      ],
    },
  ]);
  return <context.Provider value={{ name, stages }}>{props.children}</context.Provider>;
};

export { Provider, context };
