import { createContext, Dispatch, PropsWithChildren, useState } from 'react';

type OverlayContextType = {
  active: [boolean, Dispatch<boolean>];
  action: [() => void, Dispatch<() => void>];
  className: [string, Dispatch<string>];
};

const context = createContext<OverlayContextType | null>(null);
export default context;

export const Provider = (props: PropsWithChildren<{}>) => {
  const active = useState(false);
  const action = useState<() => void>(() => () => console.log('Overlay with no action!'));
  const className = useState('');
  return <context.Provider value={{ active, action, className }}>{props.children}</context.Provider>;
};
