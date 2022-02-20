import { GenerateID } from '../utils/IdGenerator';

export const blank = () => [
  {
    id: GenerateID(),
    name: 'Main Stage',
    songs: [],
  },
];
