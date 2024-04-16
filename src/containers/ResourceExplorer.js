import { Routes, Route } from 'react-router-dom';
import RoomsContainer from './RoomsContainer';
import RoomGfxContainer from './RoomGfxContainer';
import PrepositionsContainer from './PrepositionsContainer';
import RomMapContainer from './RomMapContainer';

const ResourceExplorer = ({ rom, res, resources }) => {
  if (!resources?.rooms?.length) {
    return null;
  }

  return (
    resources?.rooms?.length && (
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
            path=":roomId"
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
          path="/rom"
          element={
            <RomMapContainer
              rom={rom}
              res={res}
              rooms={resources.rooms}
            />
          }>
          <Route
            path="rooms"
            element={
              <RomMapContainer
                rom={rom}
                rooms={resources.rooms}
              />
            }>
            <Route
              path=":roomId"
              element={
                <RomMapContainer
                  rom={rom}
                  rooms={resources.rooms}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    )
  );
};

export default ResourceExplorer;
