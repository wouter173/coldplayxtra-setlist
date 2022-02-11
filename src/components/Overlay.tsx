import React, { useContext, useEffect } from 'react';
import OverlayContext from '../context/OverlayContext';

export const OverlayRenderer = () => {
  const {
    active: [active],
    action: [action],
    className: [className],
  } = useContext(OverlayContext)!;
  if (active) return <div className={`${className} fixed top-0 left-0 bottom-0 z-10 w-screen`} onClick={action}></div>;
  else return null;
};

type OverlayProps = {
  className: string;
  action: () => void;
};

export default function Overlay(props: OverlayProps) {
  const {
    active: [, setActive],
    action: [, setAction],
    className: [, setClassName],
  } = useContext(OverlayContext)!;

  useEffect(() => {
    setClassName(props.className);
    setActive(true);
    setAction(() => () => {
      setActive(false);
      props.action();
    });
    return () => {
      setActive(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
