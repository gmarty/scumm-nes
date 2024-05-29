import ScreenCanvasContainer from '../containers/ScreenCanvasContainer';
import HoveredObjects from './HoveredObjects';

const Room = ({
  room,
  baseTiles,
  roomgfc,
  hoveredObject,
  setHoveredObject,
  selectedObjects,
  toggleObjectState,
  hoveredBox,
}) => {
  const { width } = room.header;
  const zoom = 2;

  return (
    <>
      <div
        className="relative overflow-hidden"
        style={{ maxWidth: width * 8 * zoom }}>
        <ScreenCanvasContainer
          screen={room}
          baseTiles={baseTiles}
          gfc={roomgfc}
          selectedObjects={selectedObjects}
          hoveredBox={hoveredBox}
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
