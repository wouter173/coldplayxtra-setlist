import { Dispatch, useState } from 'react';
import { customInfoType, songType } from '../../context/State';
import { tracks } from '../../data/tracks';

type Props = {
  song: songType;
  onSubmit: (input: customInfoType) => void;
  modalOpen: [boolean, Dispatch<boolean>];
};

const options = ['pyro', 'confetti', 'lasers', 'flames', 'streamers', 'acoustic', 'special guest', 'cover'];

const CustomInfoModal = (props: Props) => {
  const {
    song,
    onSubmit,
    modalOpen: [, setModalOpen],
  } = props;
  const temp = { values: [], other: '', otherVisible: false };
  const [values, setValues] = useState<string[]>((song.customInfo ?? temp).values);
  const [otherVisible, setOtherVisible] = useState((song.customInfo ?? temp).otherVisible);
  const [otherValue, setOtherValue] = useState((song.customInfo ?? temp).other);

  return (
    <>
      {tracks.filter((e) => e.name == song.name).length > 0 ? (
        <span className="block font-mono text-sm uppercase">{tracks.filter((e) => e.name == song.name)[0].album}</span>
      ) : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setModalOpen(false);
          onSubmit({ values, other: otherValue, otherVisible: otherVisible });
        }}
      >
        <ul className="my-6">
          {options.map((info) => (
            <li className="my-2 flex" key={info}>
              <input
                type="checkbox"
                defaultChecked={values.includes(info)}
                name={info}
                id={info}
                className="h-5 w-5 rounded-none accent-[#BB6BD9]"
                onChange={(e) =>
                  e.currentTarget.checked ? setValues([...values, info]) : setValues(values.filter((e) => e != info))
                }
              />
              <label htmlFor={info} className="ml-2 text-sm font-bold uppercase">
                {info}
              </label>
            </li>
          ))}
          <li>
            <div>
              <input
                type="checkbox"
                name="other"
                id="other"
                className="h-5 w-5 rounded-none accent-[#BB6BD9]"
                checked={otherVisible}
                onChange={(e) => setOtherVisible(e.currentTarget.checked)}
              />
              <label htmlFor="other" className="ml-2 text-sm font-bold uppercase">
                other
              </label>
            </div>
            {otherVisible ? (
              <input
                type="text"
                className="w-full border-b-2 border-[#BB6BD9] bg-gray-100 p-2"
                onChange={(e) => setOtherValue(e.target.value)}
                value={otherValue}
              />
            ) : null}
          </li>
        </ul>
        <div>
          <input
            type="submit"
            value="save"
            readOnly
            className="w-full cursor-pointer bg-[#BB6BD9] p-2 text-sm font-bold uppercase text-white hover:bg-opacity-80 active:bg-opacity-80"
          />
        </div>
      </form>
    </>
  );
};

export default CustomInfoModal;
