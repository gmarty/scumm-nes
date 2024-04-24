import { Routes, Route } from 'react-router-dom';
import RoomsContainer from './RoomsContainer';
import RoomGfxContainer from './RoomGfxContainer';
import PrepositionsContainer from './PrepositionsContainer';
import RomMapContainer from './RomMapContainer';
import SettingsContainer from './SettingsContainer';

const ResourceExplorer = ({ rom, res, resources }) => {
  if (!resources) {
    return null;
  }

  return (
    <Routes>
      <Route
        path="/rooms"
        element={
          <RoomsContainer
            rooms={resources.rooms}
            roomgfx={resources.roomgfx}
          />
        }>
        <Route
          path=":roomId"
          element={
            <RoomsContainer
              rooms={resources.rooms}
              roomgfx={resources.roomgfx}
            />
          }
        />
      </Route>
      <Route
        path="/roomgfx"
        element={<RoomGfxContainer roomgfx={resources.roomgfx} />}>
        <Route
          path=":gfcId"
          element={<RoomGfxContainer roomgfx={resources.roomgfx} />}
        />
      </Route>
      <Route
        path="/preps"
        element={
          <PrepositionsContainer
            preps={resources.preps[0]}
            lang={res.lang}
          />
        }
      />
      <Route
        path="/rom-map"
        element={
          <RomMapContainer
            rom={rom}
            res={res}
          />
        }
      />
      <Route
        path="/settings"
        element={<SettingsContainer />}
      />
    </Routes>
  );
};

export default ResourceExplorer;
