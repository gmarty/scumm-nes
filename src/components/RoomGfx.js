import { Link } from 'react-router-dom';
import GfxCanvasContainer from '../containers/GfxCanvasContainer';

const RoomGfx = ({
  baseTiles,
  nametable,
  objectImages,
  roomgfc,
  type = 'room',
}) => {
  return (
    <div className="flex gap-4 md:gap-5 xl:gap-6">
      {baseTiles.gfx.length ? (
        <Link
          className="text-center text-sm"
          to="/roomgfx/0">
          Base tileset ({baseTiles.gfx.length / 8 / 2} tiles)
          <GfxCanvasContainer
            gfx={baseTiles.gfx}
            nametable={nametable}
            objectImages={objectImages}
            nametableStart={0}
            rowLength={8}
            zoom={2}
          />
        </Link>
      ) : null}
      <Link
        className="text-center text-sm"
        to={
          type === 'room'
            ? `/roomgfx/${nametable.tileset}`
            : `/titlegfx/${nametable.tileset}`
        }>
        Tileset {nametable.tileset} ({roomgfc.gfx.length / 8 / 2} tiles)
        <GfxCanvasContainer
          gfx={roomgfc.gfx}
          nametable={nametable}
          objectImages={objectImages}
          nametableStart={baseTiles.gfx.length / 8 / 2}
          rowLength={8}
          zoom={2}
        />
      </Link>
    </div>
  );
};

export default RoomGfx;
