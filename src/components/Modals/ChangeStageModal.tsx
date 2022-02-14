import React, { Dispatch, useState } from 'react';
import { songType, stageType } from '../../context/State';

type Props = {
  onSubmit: (out: stageType) => void;
  modalOpen: [boolean, Dispatch<boolean>];
  stages: stageType[];
  song: songType;
};

export default function ChangeStageModal(props: Props) {
  const [active, setActive] = useState(
    props.stages.filter((s) => s.songs.map((song) => song.id).includes(props.song.id))[0].id
  );
  const [, setModalOpen] = props.modalOpen;

  return (
    <>
      <span className="font-mono text-sm uppercase">select stage</span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setModalOpen(false);
          props.onSubmit(props.stages.filter((s) => s.id == active)[0]);
        }}
      >
        <ul className="my-6">
          {props.stages.map((stage) => (
            <li key={stage.id}>
              <input
                type="radio"
                value={stage.name}
                readOnly
                id={stage.id}
                checked={active == stage.id}
                className="mr-2 accent-[#BB6BD9]"
                onClick={() => setActive(stage.id)}
              />
              <label htmlFor={stage.id}>{stage.name}</label>
            </li>
          ))}
        </ul>
        <input
          type="submit"
          value="save"
          className="w-full bg-[#BB6BD9] p-2 text-sm font-bold uppercase text-white hover:bg-opacity-80 active:bg-opacity-80"
        />
      </form>
    </>
  );
}
