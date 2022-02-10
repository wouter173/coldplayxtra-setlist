import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { GenerateID } from '../utils/IdGenerator';

type contextType<T> = { [key: string]: [T, Dispatch<SetStateAction<T>>] };
export type songType = { name: string; customInfo?: string };
export type stageType = { id: string; name: string; songs: songType[] };

const context = createContext<contextType<any>>({});

const Provider = (props: PropsWithChildren<{}>) => {
  const name = useState('');
  const stages = useState<stageType[]>([
    {
      id: GenerateID(),
      name: 'stageA',
      songs: [{ name: 'Hymn for the weekend' }, { name: 'Higher Power' }, { name: 'Clocks' }],
    },
  ]);
  return <context.Provider value={{ name, stages }}>{props.children}</context.Provider>;
};

export { Provider, context };
