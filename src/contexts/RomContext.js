import { useContext, useReducer } from 'react';
import { createContext } from 'react';

const RomContext = createContext({ prg: null, res: null, resources: null });
const RomDispatchContext = createContext(null);

const romReducer = (rom, action) => {
  switch (action.type) {
    case 'initialised': {
      return action.rom;
    }

    case 'changed-palette': {
      const newRom = structuredClone(rom);
      if (action.screenType === 'room') {
        newRom.resources.rooms[action.id].palette = action.palette;
      } else if (action.screenType === 'title') {
        newRom.resources.titles[action.id].palette = action.palette;
      } else {
        throw Error('Unknown screen type: ' + action.screenType);
      }
      return newRom;
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

const RomProvider = ({ children }) => {
  const [rom, dispatch] = useReducer(romReducer, {
    prg: null,
    res: null,
    resources: null,
  });

  return (
    <RomContext.Provider value={rom}>
      <RomDispatchContext.Provider value={dispatch}>
        {children}
      </RomDispatchContext.Provider>
    </RomContext.Provider>
  );
};

const useRom = () => useContext(RomContext);
const useRomDispatch = () => useContext(RomDispatchContext);

export { RomProvider, useRom, useRomDispatch };
