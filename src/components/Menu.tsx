import React from 'react';
import Overlay from './Overlay';

export type menuItemType = {
  Icon?: React.FC<{ className: string }>;
  name: string;
  action: () => void;
};

type Props = {
  items: menuItemType[];
  onBlur: () => void;
};

export default function Menu(props: Props) {
  return (
    <div className="absolute right-0 z-20 w-max bg-white shadow-xl">
      <Overlay className="bg-black bg-opacity-10" action={props.onBlur} />
      <ul className="p-4">
        {props.items.map((item, i) => {
          const last = i == props.items.length - 1;
          return (
            <li key={item.name} className={`${!last ? 'border-b text-gray-500' : 'text-red-500'} flex border-gray-200`}>
              <button
                className="flex h-full w-full items-center justify-end py-4 px-2 text-sm font-bold"
                onClick={item.action}
              >
                {item.name}
                {item.Icon ? item.Icon({ className: 'ml-4 h-6 w-6' }) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
