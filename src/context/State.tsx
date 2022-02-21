import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react';

type contextType<T> = { [key: string]: [T, Dispatch<SetStateAction<T>>] };
export type customInfoType = {
  values: string[];
  otherVisible: boolean;
  other: string;
};

export type songType = {
  id: string;
  name: string;
  customInfo?: customInfoType;
};
export type stageType = { id: string; name: string; songs: songType[] };

const context = createContext<contextType<any>>({});

const Provider = (props: PropsWithChildren<{}>) => {
  const [name, setName] = useState('');
  const [choice, setChoice] = useState('');
  const [stages, setStages] = useState<stageType[]>([]);
  const VERSION = 1;

  const resetData = () => {
    localStorage.clear();
    localStorage.setItem('version', JSON.stringify(VERSION));
  };

  useEffect(() => {
    const versionData = localStorage.getItem('version');
    if (versionData == null) {
      resetData();
    } else {
      const version = JSON.parse(versionData);
      if (version != VERSION) {
        resetData();
      }
    }

    const stagesData = localStorage.getItem('stages');
    const nameData = localStorage.getItem('name');
    const choiceData = localStorage.getItem('name');

    if (stagesData != null) setStages(JSON.parse(stagesData));
    if (nameData != null) setName(JSON.parse(nameData));
    if (choiceData != null) setChoice(JSON.parse(choiceData));
  }, []);

  useEffect(() => {
    localStorage.setItem('name', JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    localStorage.setItem('stages', JSON.stringify(stages));
  }, [stages]);

  useEffect(() => {
    localStorage.setItem('choice', JSON.stringify(choice));
  }, [choice]);

  return (
    <context.Provider value={{ name: [name, setName], stages: [stages, setStages], choice: [choice, setChoice] }}>
      {props.children}
    </context.Provider>
  );
};

export { Provider, context };
