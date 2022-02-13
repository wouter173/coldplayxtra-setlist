import { createContext, Dispatch, PropsWithChildren, ReactNode, useState } from 'react';

const context = createContext<{
  children: [ReactNode, Dispatch<ReactNode>];
  active: [boolean, Dispatch<boolean>];
  title: [string, Dispatch<string>];
  dismiss: [() => void, Dispatch<() => void>];
} | null>(null);

export const Provider = (props: PropsWithChildren<{}>) => {
  const children = useState<ReactNode>(null);
  const active = useState(false);
  const title = useState('');
  const dismiss = useState<() => void>(() => {});

  return <context.Provider value={{ title, children, active, dismiss }}>{props.children}</context.Provider>;
};

export default context;
