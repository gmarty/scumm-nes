import { Link } from 'react-router-dom';
import GfxContainer from '../containers/GfxContainer';

const RoomGfx = ({ baseTiles, nametable, objectImages, roomgfc }) => {
  return (
    <div className="flex gap-4 md:gap-5 xl:gap-6">
      <Link
        className="text-center text-sm"
        to="/roomgfx/0">
        Base tileset ({baseTiles.gfx.length / 8 / 2} tiles)
        <GfxContainer
          gfx={baseTiles.gfx}
          nametable={nametable}
          objectImages={objectImages}
          nametableStart={0}
          zoom={2}
        />
      </Link>
      <Link
        className="text-center text-sm"
        to={`/roomgfx/${nametable.tileset}`}>
        Tileset {nametable.tileset} ({roomgfc.gfx.length / 8 / 2} tiles)
        <GfxContainer
          gfx={roomgfc.gfx}
          nametable={nametable}
          objectImages={objectImages}
          nametableStart={baseTiles.gfx.length / 8 / 2}
          zoom={2}
        />
      </Link>
    </div>
  );
};

export default RoomGfx;
