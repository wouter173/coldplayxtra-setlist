import { DotsVerticalIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { stageType } from '../context/State';
import Menu from './Menu';

type Props = {
  stage: stageType;
};

export default function StageHeader(props: Props) {
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <div className="my-2 flex items-center">
      <h2 className="ml-2 text-sm font-bold uppercase underline">{props.stage.name}</h2>
      <DotsVerticalIcon className="ml-auto h-6 w-6 text-gray-400" onClick={() => setFocus(true)} />
      {focus ? <Menu></Menu> : null}
    </div>
  );
}
