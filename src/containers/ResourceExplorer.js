import { Routes, Route } from 'react-router-dom';
import { useRom } from '../contexts/RomContext';
import RoomsContainer from './RoomsContainer';
import GfxContainer from './GfxContainer';
import PrepositionsContainer from './PrepositionsContainer';
import RomMapContainer from './RomMapContainer';
import TitlesContainer from './TitlesContainer';
import SettingsContainer from './SettingsContainer';
import ScriptContainer from './ScriptContainer';

const ResourceExplorer = () => {
  const { prg, res, resources } = useRom();

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
            titles={resources.titles}
            roomgfx={resources.roomgfx}
            globdata={resources.globdata[0]}
          />
        }>
        <Route
          path=":id"
          element={
            <RoomsContainer
              rooms={resources.rooms}
              titles={resources.titles}
              roomgfx={resources.roomgfx}
              globdata={resources.globdata[0]}
            />
          }
        />
      </Route>
      <Route
        path="/titles"
        element={
          <TitlesContainer
            rooms={resources.rooms}
            titles={resources.titles}
          />
        }>
        <Route
          path=":id"
          element={
            <TitlesContainer
              rooms={resources.rooms}
              titles={resources.titles}
            />
          }
        />
      </Route>
      <Route
        path="/titlegfx"
        element={
          <GfxContainer
            titlegfx={resources.titles}
            costumegfx={resources.costumegfx}
            roomgfx={resources.roomgfx}
          />
        }>
        <Route
          path=":gfcId"
          element={
            <GfxContainer
              titlegfx={resources.titles}
              costumegfx={resources.costumegfx}
              roomgfx={resources.roomgfx}
            />
          }
        />
      </Route>
      <Route
        path="/costumegfx"
        element={
          <GfxContainer
            titlegfx={resources.titles}
            costumegfx={resources.costumegfx}
            roomgfx={resources.roomgfx}
          />
        }>
        <Route
          path=":gfcId"
          element={
            <GfxContainer
              titlegfx={resources.titles}
              costumegfx={resources.costumegfx}
              roomgfx={resources.roomgfx}
            />
          }
        />
      </Route>
      <Route
        path="/roomgfx"
        element={
          <GfxContainer
            titlegfx={resources.titles}
            costumegfx={resources.costumegfx}
            roomgfx={resources.roomgfx}
          />
        }>
        <Route
          path=":gfcId"
          element={
            <GfxContainer
              titlegfx={resources.titles}
              costumegfx={resources.costumegfx}
              roomgfx={resources.roomgfx}
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
            rom={prg}
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
