import { zeroPad } from './utils';

const titleNames = ['Main title', 'Logo title'];
const roomNames = [
  'Crash',
  'Front yard',
  'Bottom of pool',
  'Living room',
  'Dungeon',
  'Library',
  'Swimming pool',
  'Kitchen',
  'Basement',
  'Attic 1 (safe room)',
  'Main entry way',
  'Hallway 1 (entry way)',
  'Entryway 2 (to darkroom)',
  '2nd floor hallway',
  'Painting room',
  'Attic 2 (wires)',
  'Garage',
  'Music room',
  'Arcade',
  "Edna's room",
  "Tentacle's room",
  "Fred's room",
  "Fred's office",
  'Darkroom',
  "Ted's bathroom",
  "Ted's room",
  "Weird Ed's room",
  'Den',
  'Observatory',
  'Under house',
  'Ready room',
  'Laboratory',
  '911 cutscene',
  'Intro cutscene',
  "Safe's password",
  'Telescope alien cutscene',
  'Pantry',
  'Dining room',
  'Top hallway',
  'Arcade high score',
  'Inside television',
  'Television network room',
  'Talk show',
  'Phone numbers',
  'Driveway',
  'Character selection',
  'Car fly cutscene',
  'Bad ending cutscene',
  'Car in space ending cutscene',
  'Title screen',
  'Pause menu',
  'Meteor room',
  'Garage destroyed',
  'Beta character selection',
  'Telescope cutscene outside',
  'Grey',
  'Crash',
];

const getScreenLabel = (screenType = 'room', id, long = false) => {
  switch (localStorage.getItem('screen-name')) {
    default:
    case 'mm':
      if (screenType === 'title') {
        if (long) {
          return `Title screen ${id} - ${titleNames[id]}`;
        }
        return `${id} ${titleNames[id]}`;
      }

      if (screenType === 'room') {
        if (long) {
          return `Room ${zeroPad(id)} - ${roomNames[id]}`;
        }
        return `${id} ${roomNames[id]}`;
      }

      throw new Error(`Unknown screen type ${screenType}`);

    case 'numbers':
      if (screenType === 'title') {
        return `Title screen ${id}`;
      }

      if (screenType === 'room') {
        if (long) {
          return `Room ${zeroPad(id)}`;
        }
        return `Room ${id}`;
      }

      throw new Error(`Unknown screen type ${screenType}`);
  }
};

export default getScreenLabel;
