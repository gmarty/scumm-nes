import ResourceMetadata from './ResourceMetadata';
import RoomCanvasContainer from '../containers/RoomCanvasContainer';
import HoveredObjects from './HoveredObjects';

const Room = ({
  room,
  baseTiles,
  roomgfc,
  hoveredObject,
  setHoveredObject,
  selectedObjects,
  toggleObjectState,
}) => {
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
          width={room.header.width}
          height={room.header.height}
          objects={room.objects}
          hoveredObject={hoveredObject}
          setHoveredObject={setHoveredObject}
          toggleObjectState={toggleObjectState}
        />
      </div>
    </>
  );
};

export default Room;
