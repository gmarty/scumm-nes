import { useRef, useEffect } from 'react';
import { nesNTSCPalette as nesPalette } from '../lib/palettes';

const RoomCanvasContainer = ({
  room,
  baseTiles,
  roomgfc,
  selectedObjects,
  zoom = 1,
}) => {
  const canvasRef = useRef(null);
  const { width, height } = room.header;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    setTimeout(() => {
      draw(ctx, room, baseTiles, roomgfc, selectedObjects);
    });
  }, [room, baseTiles, roomgfc, selectedObjects]);

  return (
    <canvas
      ref={canvasRef}
      width={width * 8}
      height={height * 8}
      className="w-full rounded"
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
  for (let y = 0; y < 16; y++) {
    for (let x = 2; x < 62; x++) {
      let tile = nametableObjCopy[y][x];

      let gfc = baseTiles.gfx;
      if (tile >= baseTilesNum) {
        tile -= baseTilesNum;
        gfc = roomgfc.gfx;
      }

      const paletteId =
        (attributes[((y << 2) & 0x30) | ((x >> 2) & 0xf)] >>
          (((y & 2) << 1) | (x & 2))) &
        0x3;
      const pal = [
        palette[paletteId * 4],
        palette[paletteId * 4 + 1],
        palette[paletteId * 4 + 2],
        palette[paletteId * 4 + 3],
      ].map((p) => nesPalette[p]);

      for (let j = 0; j < 8; j++) {
        const n1 = gfc[tile * 2 * 8 + j];
        const n2 = gfc[(tile * 2 + 1) * 8 + j];
        for (let k = 0; k < 8; k++) {
          const mask = 1 << k;
          const val = (n1 & mask ? 1 : 0) | ((n2 & mask ? 1 : 0) << 1);

          ctx.fillStyle = pal[val];
          ctx.fillRect((x - 2) * 8 + 7 - k, y * 8 + j, 1, 1);
        }
      }
    }
  }
};

export default RoomCanvasContainer;
