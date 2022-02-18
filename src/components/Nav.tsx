import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useWindowScroll } from 'react-use';
import NavSizeContext from '../context/NavSizeContext';

export default function Nav(props: PropsWithChildren<{}>) {
  const [stuck, setStuck] = useState(false);
  const [defaultOffset, setDefaultOffset] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const { y } = useWindowScroll();

  useEffect(() => {
    if (y > defaultOffset) setStuck(true);
    else setStuck(false);
  }, [y, defaultOffset]);

  useEffect(() => {
    setDefaultOffset(navRef.current!.offsetTop - 60);
  }, []);

  return (
    <nav className={`${stuck ? 'bg-[#161117]' : 'bg-transparent'} sticky -top-1 z-20`} ref={navRef}>
      <div className={`flex gap-3 p-4 transition-all`}>
        <NavSizeContext.Provider value={stuck}>{props.children}</NavSizeContext.Provider>
      </div>
    </nav>
  );
}
