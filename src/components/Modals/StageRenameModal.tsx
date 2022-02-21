import React, { Dispatch, useContext, useState } from 'react';
import { stageType } from '../../context/State';
import { context as State } from '../../context/State';
import { GenerateID } from '../../utils/IdGenerator';

type Props = {
  onSubmit: (out: string) => void;
  setModalOpen: Dispatch<boolean>;
  stage: stageType;
};

export default function StageRenameModal(props: Props) {
  const [name, setName] = useState(props.stage.name);
  const [otherValue, setOtherValue] = useState('');
  const [stages] = useContext(State).stages;
  const stageNames = new Set<string>(stages.map((s: stageType) => s.name));

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.setModalOpen(false);
          props.onSubmit(name);
        }}
      >
        <div className="my-6 flex flex-col">
          <ul>
            {Array.from<string>(stageNames).map((listName: string) => (
              <li key={GenerateID()}>
                <input type="radio" id={listName} checked={listName == name} onChange={() => setName(listName)} />
                <label className="ml-2 font-bold uppercase" htmlFor={listName}>
                  {listName}
                </label>
              </li>
            ))}

            <li>
              <input type="radio" id="other" checked={name == otherValue} onChange={() => setName(otherValue)} />
              <label htmlFor="other" className="ml-2 font-bold uppercase">
                other
              </label>
              {name == otherValue ? (
                <input
                  className="block w-full border-b-2 border-[#BB6BD9] bg-gray-100 p-2"
                  type="text"
                  placeholder="name"
                  value={otherValue}
                  onChange={(e) => {
                    setOtherValue(e.target.value);
                    setName(e.target.value);
                  }}
                  id="name"
                />
              ) : null}
            </li>
          </ul>
        </div>
        <input
          type="submit"
          value="save"
          className="w-full bg-[#BB6BD9] p-2 text-sm font-bold uppercase text-white hover:bg-opacity-80 active:bg-opacity-80"
          readOnly
        />
      </form>
    </>
  );
}
