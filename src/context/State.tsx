import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { GenerateID } from '../utils/IdGenerator';

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
  const stages = useState<stageType[]>([
    {
      id: GenerateID(),
      name: 'A-Stage',
      songs: [
        { id: GenerateID(), name: 'Music Of The Spheres', customInfo: [] },
        { id: GenerateID(), name: 'Higher Power', customInfo: [] },
        { id: GenerateID(), name: 'Clocks', customInfo: [] },
        { id: GenerateID(), name: 'Viva la Vida', customInfo: [] },
        { id: GenerateID(), name: 'Adventure of a Lifetime', customInfo: [] },
        { id: GenerateID(), name: 'The Scientist', customInfo: [] },
        { id: GenerateID(), name: 'Paradise', customInfo: [] },
      ],
    },
    {
      id: GenerateID(),
      name: 'B-Stage',
      songs: [
        { id: GenerateID(), name: 'Human Heart', customInfo: ['special guest'] },
        { id: GenerateID(), name: 'People of the Pride', customInfo: [] },
        { id: GenerateID(), name: "Everything's Not Lost", customInfo: [] },
      ],
    },
    {
      id: GenerateID(),
      name: 'A-Stage',
      songs: [
        { id: GenerateID(), name: 'Magic', customInfo: ['acoustic'] },
        { id: GenerateID(), name: 'Yellow', customInfo: ['acoustic'] },
        { id: GenerateID(), name: 'Nothingman', customInfo: ['cover'] },
        { id: GenerateID(), name: 'My Universe', customInfo: [] },
        { id: GenerateID(), name: 'A Sky Full of Stars', customInfo: [] },
        { id: GenerateID(), name: 'Coloratura', customInfo: [] },
        { id: GenerateID(), name: '', customInfo: [] },
      ],
    },
  ]);
  return <context.Provider value={{ name, stages }}>{props.children}</context.Provider>;
};

export { Provider, context };
