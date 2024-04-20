import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { nesNTSCPalette as nesPalette } from '../lib/palettes';

const RoomCanvasContainer = ({
  room,
  baseTiles,
  roomgfc,
  selectedObjects,
  zoom = 1,
}) => {
  const canvasRef = useRef(null);
  const [isComputing, setIsComputing] = useState(true);
  const { width, height } = room.header;

  useEffect(() => {
    setIsComputing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    setTimeout(() => {
      draw(ctx, room, baseTiles, roomgfc, selectedObjects);
      setIsComputing(false);
    });
  }, [room, baseTiles, roomgfc, selectedObjects]);

  return (
    <canvas
      ref={canvasRef}
      width={width * 8}
      height={height * 8}
      className={clsx(
        'w-full rounded',
        isComputing ? 'opacity-0' : 'opacity-100 transition-opacity',
      )}
      style={{ maxWidth: width * 8 * zoom }}
    />
  );
};

const draw = (ctx, room, baseTiles, roomgfc, selectedObjects) => {
  const { nametableObj, palette } = room.nametable;
  const attributes = room.attributes;
  const baseTilesNum = baseTiles.gfx.length / 8 / 2;
  const nametableObjCopy = nametableObj.map((arr) => arr.slice());

  // Overwrite tiles with selected object.
  // Start with highest id as it is the way it is implemented with overlapping object images.
  for (let i = selectedObjects.length - 1; i >= 0; i--) {
    const objectImage = room?.objectImages[i];
    const x = room?.objects[i]?.x; // Can be 0?
    const y = room?.objects[i]?.y; // Can be 0?

    if (
      !selectedObjects[i] ||
      !objectImage ||
      !objectImage?.tiles ||
      !x ||
      !y
    ) {
      continue;
    }

    for (let j = 0; j < objectImage.tiles.length; j++) {
      for (let i = 0; i < objectImage.tiles[j].length; i++) {
        nametableObjCopy[y + j][x + i + 2] = objectImage.tiles[j][i];
      }
    }
  }

  // Now generate the image of the room.
  for (let sprY = 0; sprY < 16; sprY++) {
    for (let sprX = 2; sprX < 62; sprX++) {
      let tile = nametableObjCopy[sprY][sprX];

      let gfx = baseTiles.gfx;
      if (tile >= baseTilesNum) {
        tile -= baseTilesNum;
        gfx = roomgfc.gfx;
      }

      const paletteId =
        (attributes[((sprY << 2) & 0x30) | ((sprX >> 2) & 0xf)] >>
          (((sprY & 2) << 1) | (sprX & 2))) &
        0x3;
      const pal = [
        palette[paletteId * 4],
        palette[paletteId * 4 + 1],
        palette[paletteId * 4 + 2],
        palette[paletteId * 4 + 3],
      ].map((p) => nesPalette[p]);

      for (let j = 0; j < 8; j++) {
        const n1 = gfx[tile * 2 * 8 + j];
        const n2 = gfx[(tile * 2 + 1) * 8 + j];
        for (let k = 0; k < 8; k++) {
          const mask = 1 << k;
          const val = (n1 & mask ? 1 : 0) | ((n2 & mask ? 1 : 0) << 1);

          ctx.fillStyle = pal[val];
          ctx.fillRect((sprX - 2) * 8 + 7 - k, sprY * 8 + j, 1, 1);
        }
      }
    }
  }
};

export default RoomCanvasContainer;
