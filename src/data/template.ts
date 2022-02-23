import { stageType } from '../context/State';
import { GenerateID } from '../utils/IdGenerator';

export const template = (): stageType[] => [
  {
    id: GenerateID(),
    name: 'Main Stage',
    songs: [
      { id: GenerateID(), name: 'Music Of The Spheres' },
      { id: GenerateID(), name: 'Higher Power' },
      { id: GenerateID(), name: 'Clocks' },
      { id: GenerateID(), name: 'Viva la Vida' },
      { id: GenerateID(), name: 'Adventure of a Lifetime' },
      { id: GenerateID(), name: 'The Scientist' },
      { id: GenerateID(), name: 'Paradise' },
    ],
  },
  {
    id: GenerateID(),
    name: 'B Stage',
    songs: [
      {
        id: GenerateID(),
        name: 'Human Heart',
        customInfo: { values: ['special guest'], other: '', otherVisible: false },
      },
      { id: GenerateID(), name: 'People of the Pride' },
      { id: GenerateID(), name: "Everything's Not Lost" },
    ],
  },
  {
    id: GenerateID(),
    name: 'Main Stage',
    songs: [
      { id: GenerateID(), name: 'Magic' },
      { id: GenerateID(), name: 'Yellow', customInfo: { values: ['acoustic'], other: '', otherVisible: false } },
      { id: GenerateID(), name: 'My Universe' },
      { id: GenerateID(), name: 'A Sky Full of Stars' },
      { id: GenerateID(), name: 'Coloratura' },
    ],
  },
];
