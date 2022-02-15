import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react';
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
  const [name, setName] = useState('');
  const [stages, setStages] = useState<stageType[]>([]);

  useEffect(() => {
    const stagesData = localStorage.getItem('stages');
    const nameData = localStorage.getItem('name');

    if (stagesData != null) setStages(JSON.parse(stagesData));
    if (nameData != null) setName(JSON.parse(nameData));
  }, []);

  useEffect(() => {
    localStorage.setItem('name', JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    localStorage.setItem('stages', JSON.stringify(stages));
  }, [stages]);

  return (
    <context.Provider value={{ name: [name, setName], stages: [stages, setStages] }}>{props.children}</context.Provider>
  );
};

export { Provider, context };
