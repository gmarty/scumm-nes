import ResourceMetadata from './ResourceMetadata';
import RoomCanvasContainer from '../containers/RoomCanvasContainer';
import HoveredObjects from './HoveredObjects';

const Room = ({ room, baseTiles, roomgfc, hoveredObject, selectedObjects }) => {
  const zoom = 2;

  return (
    <>
      <h1>Room {room.metadata.id}</h1>
      <ResourceMetadata metadata={room.metadata} />
      <div className="relative overflow-hidden">
        <RoomCanvasContainer
          room={room}
          baseTiles={baseTiles}
          roomgfc={roomgfc}
          selectedObjects={selectedObjects}
          zoom={zoom}
        />
        <HoveredObjects
          objects={room.objects}
          hoveredObject={hoveredObject}
          zoom={zoom}
        />
      </div>
    </>
  );
};

export default Room;
