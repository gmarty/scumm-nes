import { zeroPad } from './utils';

const costumeNames = [
  [
    'Unused',
    'Syd',
    'Razor',
    'Dave',
    'Michael',
    'Bernard',
    'Wendy',
    'Jeff',
    'Radioactive suit',
    'Fred Edison',
    'Nurse Edna',
    'Weird Ed',
    'Cousin Ted',
    'Purple tentacle',
    'Green tentacle',
    'Meteor police',
    'Meteor',
    'Mark Eteer',
    'Wink Smiley',
    'Man eating plant',
    'Bubble',
    'Unused',
    'Unused',
    'Sandy',
    'Suit w/ meteor',
  ],
  ['Flying Edsel', 'Meteor intro', 'Cursor arrow', 'Sprite0'],
];

const getCostumeLabel = (costumeSetId = 0, id = 0, long = false) => {
  switch (localStorage.getItem('screen-name')) {
    default:
    case 'mm':
      const costumeName = costumeNames[costumeSetId][id];
      if (!costumeName) {
        throw new Error(
          `Unknown costume id ${id} in costume set id ${costumeSetId}`,
        );
      }

      if (long) {
        return `Costume ${zeroPad(id)} - ${costumeName}`;
      }
      return `${id} ${costumeName}`;

    case 'numbers':
      if (long) {
        return `Costume ${zeroPad(id)}`;
      }
      return `Costume ${id}`;
  }
};

export default getCostumeLabel;
