import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PrimaryColumn from '../components/PrimaryColumn';
import SecondaryColumn from '../components/SecondaryColumn';
import ColumnListHeader from '../components/ColumnListHeader';
import Main from '../components/Main';
import RoomsList from '../components/RoomsList';
import RoomsObjectList from '../components/RoomsObjectList';
import Room from '../components/Room';

const RoomsContainer = ({ rooms, roomgfx }) => {
  const { roomId } = useParams();
  const [hoveredObject, setHoveredObject] = useState(null);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [room, setRoom] = useState(null);

  const currentRoomId =
    typeof roomId === 'undefined' ? null : parseInt(roomId, 10);
  const baseTiles = roomgfx?.find(({ metadata }) => metadata.id === 0);
  let roomgfc = roomgfx?.find(
    ({ metadata }) => metadata.id === room?.nametable?.tileset,
  );

  useEffect(() => {
    const room =
      rooms.find(({ metadata }) => metadata.id === currentRoomId) || null;
    setRoom(room);

    // Clear the selected objects when the room changes.
    const selectedObjects = Array(room?.header?.objectsNum || 0).fill(false);
    setSelectedObjects(selectedObjects);
  }, [roomId]);

  const setSelectedObjectState = (id, state) => {
    const newSelectedObjects = [...selectedObjects];
    newSelectedObjects[id] = state;
    setSelectedObjects(newSelectedObjects);
  };

  return (
    <>
      <PrimaryColumn>
        <ColumnListHeader>Rooms</ColumnListHeader>
        <RoomsList
          rooms={rooms}
          currentRoomId={currentRoomId}
        />
      </PrimaryColumn>
      {room && room.objectImages.length > 0 && (
        <SecondaryColumn>
          <ColumnListHeader>Objects</ColumnListHeader>
          <RoomsObjectList
            objects={room.objects}
            objectImages={room.objectImages}
            setHoveredObject={setHoveredObject}
            selectedObjects={selectedObjects}
            setSelectedObjectState={setSelectedObjectState}
          />
        </SecondaryColumn>
      )}
      <Main>
        {!room ? (
          <h1>Rooms</h1>
        ) : (
          <Room
            room={room}
            baseTiles={baseTiles}
            roomgfc={roomgfc}
            hoveredObject={hoveredObject}
            selectedObjects={selectedObjects}
          />
        )}
      </Main>
    </>
  );
};

export default RoomsContainer;
