import { useState, useEffect } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import PrimaryColumn from '../components/PrimaryColumn';
import SecondaryColumn from '../components/SecondaryColumn';
import Main from '../components/Main';
import RoomsList from '../components/RoomsList';
import TitlesList from '../components/TitlesList';
import RoomsObjectList from '../components/RoomsObjectList';
import RoomsBoxList from '../components/RoomsBoxList';
import Room from '../components/Room';
import RoomTabs from '../components/RoomTabs';
import Palettes from '../components/Palettes';
import RoomGfx from '../components/RoomGfx';
import RoomScripts from '../components/RoomScripts';

const RoomsContainer = ({ rooms, titles, roomgfx, globdata }) => {
  const isRoom = !!useMatch('/rooms/:id');
  const { id } = useParams();
  const [hoveredObject, setHoveredObject] = useState(null);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [hoveredBox, setHoveredBox] = useState(null);
  const [currentTab, setCurrentTab] = useState('Palettes');
  const [room, setRoom] = useState(null);

  const currentId = typeof id === 'undefined' ? null : parseInt(id, 10);
  const baseTiles = roomgfx?.find(({ metadata }) => metadata.id === 0);
  let roomgfc = roomgfx?.find(
    ({ metadata }) => metadata.id === room?.nametable?.tileset,
  );

  useEffect(() => {
    const room =
      rooms.find(({ metadata }) => metadata.id === currentId) || null;
    setRoom(room);

    // Clear the selected objects when the room changes.
    const selectedObjects = Array(room?.header?.objectsNum || 0);
    for (let i = 0; i < selectedObjects.length; i++) {
      const objNum = room.objects[i].num;
      const initialState = globdata.globdata[objNum];
      selectedObjects[i] = !!(initialState & 0b10000000);
    }
    setSelectedObjects(selectedObjects);
  }, [currentId, globdata, rooms]);

  const setSelectedObjectState = (id, state) => {
    const newSelectedObjects = [...selectedObjects];
    newSelectedObjects[id] = state;
    setSelectedObjects(newSelectedObjects);
  };

  const toggleObjectState = (id) => {
    const newSelectedObjects = [...selectedObjects];
    newSelectedObjects[id] = !newSelectedObjects[id];
    setSelectedObjects(newSelectedObjects);
  };

  const updatePalette = (i, colourId) => {
    const newRoom = structuredClone(room);
    if (i % 4 === 0) {
      // Keep the first colours in sync.
      for (let i = 0; i < 16; i += 4) {
        newRoom.nametable.palette[i] = colourId;
      }
    } else {
      newRoom.nametable.palette[i] = colourId;
    }
    setRoom(newRoom);
  };

  if (room && !room.header) {
    return null;
  }

  return (
    <>
      <PrimaryColumn>
        <RoomsList
          items={rooms}
          currentId={isRoom ? currentId : null}
        />
        <TitlesList
          items={titles}
          currentId={isRoom ? null : currentId}
        />
      </PrimaryColumn>
      {(room?.objectImages?.length || room?.boxes?.length) && (
        <SecondaryColumn>
          {room?.objectImages?.length > 0 && (
            <RoomsObjectList
              objects={room.objects}
              objectImages={room.objectImages}
              hoveredObject={hoveredObject}
              setHoveredObject={setHoveredObject}
              selectedObjects={selectedObjects}
              setSelectedObjectState={setSelectedObjectState}
            />
          )}
          {room?.boxes?.length > 0 && (
            <RoomsBoxList
              boxes={room.boxes}
              setHoveredBox={setHoveredBox}
            />
          )}
        </SecondaryColumn>
      )}
      <Main>
        {!room ? (
          <h1>Rooms</h1>
        ) : (
          <>
            <Room
              room={room}
              baseTiles={baseTiles}
              roomgfc={roomgfc}
              hoveredObject={hoveredObject}
              setHoveredObject={setHoveredObject}
              selectedObjects={selectedObjects}
              toggleObjectState={toggleObjectState}
              hoveredBox={hoveredBox}
            />
            <RoomTabs
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            {currentTab === 'Palettes' && (
              <Palettes
                palette={room.nametable.palette}
                onUpdate={updatePalette}
              />
            )}
            {currentTab === 'Tilesets' && (
              <RoomGfx
                baseTiles={baseTiles}
                nametable={room.nametable}
                objectImages={room.objectImages}
                roomgfc={roomgfc}
              />
            )}
            {currentTab === 'Scripts' && (
              <RoomScripts
                excdScript={room.excdScript}
                encdScript={room.encdScript}
              />
            )}
          </>
        )}
      </Main>
    </>
  );
};

export default RoomsContainer;
