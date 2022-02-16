import { DotsVerticalIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import React, { useContext, useState } from 'react';
import StageContext from '../context/StageContext';
import { removeStage, renameStage } from '../utils/editorMethods';
import Menu, { menuItemType } from './Menu';
import Modal from './Modal';
import StageRenameModal from './Modals/StageRenameModal';

export default function StageHeader() {
  const { stages, setStages, stage } = useContext(StageContext)!;
  const [menuOpen, setMenuOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);

  const menuItems: menuItemType[] = [
    {
      action: () => {
        setRenameModalOpen(true);
      },
      name: 'RENAME',
      Icon: PencilAltIcon,
    },
    {
      action: () => {
        if (confirm('This will remove all the songs in the stage.')) removeStage({ stages, setStages, stage });
      },
      name: 'REMOVE',
      Icon: TrashIcon,
    },
  ];

  return (
    <div className="my-2 flex items-center">
      {renameModalOpen ? (
        <Modal
          title="Rename Stage"
          onDismiss={() => {
            setRenameModalOpen(false);
          }}
          component={
            <StageRenameModal
              setModalOpen={setRenameModalOpen}
              onSubmit={(out) => {
                renameStage({ setStages, stages, stage, name: out });
              }}
              stage={stage}
            />
          }
        />
      ) : null}
      <h2 className="ml-2 text-sm font-bold uppercase underline">{stage.name}</h2>
      <div className="relative ml-auto">
        <DotsVerticalIcon className=" h-6 w-6 cursor-pointer text-gray-400" onClick={() => setMenuOpen(true)} />
        {menuOpen ? <Menu items={menuItems} onDismiss={() => setMenuOpen(false)}></Menu> : null}
      </div>
    </div>
  );
}
