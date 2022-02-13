import { DotsVerticalIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { stageType } from '../context/State';
import Menu, { menuItemType } from './Menu';

type Props = {
  stage: stageType;
};

const menuItems: menuItemType[] = [];

export default function StageHeader(props: Props) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className="my-2 flex items-center">
      <h2 className="ml-2 text-sm font-bold uppercase underline">{props.stage.name}</h2>
      <div className="relative ml-auto">
        <DotsVerticalIcon className=" h-6 w-6 text-gray-400" onClick={() => setMenuOpen(true)} />
        {menuOpen ? <Menu items={menuItems} onDismiss={() => setMenuOpen(false)}></Menu> : null}
      </div>
    </div>
  );
}
