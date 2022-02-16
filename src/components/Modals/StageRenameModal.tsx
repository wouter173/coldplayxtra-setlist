import React, { Dispatch, useState } from 'react';
import { stageType } from '../../context/State';

type Props = {
  onSubmit: (out: string) => void;
  setModalOpen: Dispatch<boolean>;
  stage: stageType;
};

export default function StageRenameModal(props: Props) {
  const [name, setName] = useState(props.stage.name);

  return (
    <>
      <span className="font-mono text-sm uppercase">rename stage</span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.setModalOpen(false);
          props.onSubmit(name);
        }}
      >
        <div className="my-6 flex flex-col">
          <label htmlFor="name" className="text-sm font-bold uppercase">
            Name
          </label>
          <input
            className="border-b-2 border-[#BB6BD9] bg-gray-100 p-2"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
          />
        </div>
        <input
          type="submit"
          value="save"
          className="w-full bg-[#BB6BD9] p-2 text-sm font-bold uppercase text-white hover:bg-opacity-80 active:bg-opacity-80"
        />
      </form>
    </>
  );
}
