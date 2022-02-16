import React, { Dispatch } from 'react';
import { stageType } from '../../context/State';

type Props = {
  onSubmit: () => void;
  setModalOpen: Dispatch<boolean>;
  stage: stageType;
};

export default function StageRemoveModal(props: Props) {
  return (
    <>
      <span className="mt-4 block pt-2 font-bold">All songs listed within this stage will be removed!</span>
      <div className="mt-10 flex flex-row gap-2">
        <input
          onClick={props.onSubmit}
          value="remove"
          className="w-full bg-red-500 p-2 text-sm font-bold uppercase text-white hover:bg-opacity-80 active:bg-opacity-80"
          readOnly
        />
        <input
          onClick={() => props.setModalOpen(false)}
          value="cancel"
          className="w-full bg-gray-500 p-2 text-sm font-bold uppercase text-white hover:bg-opacity-80 active:bg-opacity-80"
          readOnly
        />
      </div>
    </>
  );
}
