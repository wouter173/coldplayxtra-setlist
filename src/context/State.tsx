import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

type contextType<T> = { [key: string]: [T, Dispatch<SetStateAction<T>>] };

const context = createContext<contextType<any>>({});

const Provider = (props: PropsWithChildren<{}>) => {
  const name = useState('');
  return <context.Provider value={{ name }}>{props.children}</context.Provider>;
};

export { Provider, context };
