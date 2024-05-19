import { Routes, Route } from 'react-router-dom';
import RoomsContainer from './RoomsContainer';
import GfxContainer from './GfxContainer';
import PrepositionsContainer from './PrepositionsContainer';
import RomMapContainer from './RomMapContainer';
import SettingsContainer from './SettingsContainer';
import ScriptContainer from './ScriptContainer';

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
            globdata={resources.globdata[0]}
          />
        }>
        <Route
          path=":roomId"
          element={
            <RoomsContainer
              rooms={resources.rooms}
              roomgfx={resources.roomgfx}
              globdata={resources.globdata[0]}
            />
          }
        />
      </Route>
      <Route
        path="/roomgfx"
        element={
          <GfxContainer
            roomgfx={resources.roomgfx}
            titlegfx={resources.titles}
          />
        }>
        <Route
          path=":gfcId"
          element={
            <GfxContainer
              roomgfx={resources.roomgfx}
              titlegfx={resources.titles}
            />
          }
        />
      </Route>
      <Route
        path="/titlegfx"
        element={
          <GfxContainer
            roomgfx={resources.roomgfx}
            titlegfx={resources.titles}
          />
        }>
        <Route
          path=":gfcId"
          element={
            <GfxContainer
              roomgfx={resources.roomgfx}
              titlegfx={resources.titles}
            />
          }
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
        path="/scripts"
        element={<ScriptContainer scripts={resources.scripts} />}>
        <Route
          path=":scriptId"
          element={<ScriptContainer scripts={resources.scripts} />}
        />
      </Route>
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
