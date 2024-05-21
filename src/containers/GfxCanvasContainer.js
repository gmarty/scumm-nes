import { useRef, useState, useEffect } from 'react';
import { clsx } from 'clsx';

// See https://colorhunt.co/palette/293462f24c4cec9b3bf7d716
const ROOM_PALETTE = ['#293462', '#F24C4C', '#EC9B3B', '#F7D716'];
// See https://colorhunt.co/palette/e9efc0b4e19783bd754e944f
const OBJECT_PALETTE = ['#4E944F', '#83BD75', '#B4E197', '#E9EFC0'];
const UNUSED_PALETTE = [
  'hsl(0, 0%, 50%)',
  'hsl(0, 0%, 65%)',
  'hsl(0, 0%, 80%)',
  'hsl(0, 0%, 90%)',
];

const GfxCanvasContainer = ({
  gfx,
  nametable = null,
  objectImages = null,
  nametableStart = 0,
  rowLength = 16,
  zoom = 1,
  spacing = 1,
}) => {
  const canvasRef = useRef(null);
  const [isComputing, setIsComputing] = useState(true);

  const lineLength = Math.ceil(gfx.length / 8 / 2 / rowLength);
  const width = rowLength * 8 + spacing * (rowLength - 1);
  const height = lineLength * 8 + spacing * (lineLength - 1);

  useEffect(() => {
    setIsComputing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    setTimeout(() => {
      draw(
        ctx,
        rowLength,
        spacing,
        gfx,
        nametable,
        objectImages,
        nametableStart,
      );
      setIsComputing(false);
    });
  }, [gfx, nametable]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={clsx(
        'rounded',
        isComputing ? 'opacity-0' : 'opacity-100 transition-opacity',
      )}
      style={{ width: width * zoom, height: height * zoom }}
    />
  );
};

const draw = (
  ctx,
  rowLength,
  spacing,
  gfx,
  nametable = null,
  objectImages = null,
  nametableStart = 0,
) => {
  const tilesNum = gfx.length / 8 / 2;

  // Massage the different tilesets to speed up code later.
  const nametableTiles = nametable?.nametableObj?.flat();
  const objectImagesTiles = objectImages
    ?.map((objectImages) => objectImages.tiles)
    .filter(Boolean)
    .flat(2);

  for (let tile = 0; tile < tilesNum; tile++) {
    for (let j = 0; j < 8; j++) {
      const n1 = gfx[tile * 2 * 8 + j];
      const n2 = gfx[(tile * 2 + 1) * 8 + j];
      for (let k = 0; k < 8; k++) {
        const mask = 1 << k;
        const val = (n1 & mask ? 1 : 0) | ((n2 & mask ? 1 : 0) << 1);

        let pal;
        if (!nametableTiles || nametableTiles.includes(tile + nametableStart)) {
          pal = ROOM_PALETTE;
        } else if (objectImagesTiles.includes(tile + nametableStart)) {
          pal = OBJECT_PALETTE;
        } else {
          pal = UNUSED_PALETTE;
        }

        const sprX = tile % rowLength;
        const sprY = Math.floor(tile / rowLength);
        ctx.fillStyle = pal[val];
        ctx.fillRect(
          sprX * 8 + 7 - k + spacing * sprX,
          sprY * 8 + j + spacing * sprY,
          1,
          1,
        );
      }
    }
  }
};

export default GfxCanvasContainer;
