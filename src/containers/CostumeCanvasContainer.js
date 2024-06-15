import { useRef, useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { getPalette } from '../lib/paletteUtils';

// Display a costume on a canvas.

// prettier-ignore
const darkpalette = [
  0x2d, 0x1d, 0x2d, 0x3d,
  0x2d, 0x1d, 0x2d, 0x3d,
  0x2d, 0x1d, 0x2d, 0x3d,
  0x2d, 0x1d, 0x2d, 0x3d,
];

const CostumeCanvasContainer = ({
  id,
  frame,
  gfx,
  sprdesc,
  sproffs,
  sprlens,
  sprdata,
  sprpals,
  zoom = 1,
}) => {
  const canvasRef = useRef(null);
  const [isComputing, setIsComputing] = useState(true);

  const desc = sprdesc[id];
  // this was 3 bytes per sprite in the data but has been parsed down to 1 byte
  const offset = sproffs[desc + frame] / 3;
  const spritesNum = sprlens[desc + frame];
  const palette = sprpals.palette;

  // Compute the bounding box.
  let left = 239;
  let right = 0;
  let top = 239;
  let bottom = 0;
  for (let i = 0; i < spritesNum; i++) {
    const { x, y } = sprdata[offset + i];

    left = Math.min(left, x);
    right = Math.max(right, x + 8);
    top = Math.min(top, y);
    bottom = Math.max(bottom, y + 8);
  }

  const width = right - left;
  const height = bottom - top;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    setTimeout(() => {
      draw(
        ctx,
        gfx.gfx,
        sprdata,
        offset,
        spritesNum,
        palette,
        left,
        top,
        width,
        height,
      );
      setIsComputing(false);
    });
  }, [
    frame,
    gfx,
    sprdata,
    offset,
    spritesNum,
    palette,
    left,
    top,
    width,
    height,
  ]);

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
  gfx,
  sprdata,
  offset,
  spritesNum,
  palette,
  left,
  top,
  width,
  height,
) => {
  // Clear the canvas.
  ctx.fillStyle = 'lightgrey';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < spritesNum; i++) {
    const { x, y, tile, flip, paletteId } = sprdata[offset + i];

    const pal = getPalette([
      palette[paletteId],
      palette[paletteId + 1],
      palette[paletteId + 2],
      palette[paletteId + 3],
    ]);

    for (let j = 0; j < 8; j++) {
      const n1 = gfx[tile * 2 * 8 + j];
      const n2 = gfx[(tile * 2 + 1) * 8 + j];
      for (let k = 0; k < 8; k++) {
        const mask = 1 << k;
        const val = (n1 & mask ? 1 : 0) | ((n2 & mask ? 1 : 0) << 1);

        // Skip the transparent palette colour.
        if (val === 0) {
          continue;
        }

        ctx.fillStyle = pal[val];
        if (flip) {
          ctx.fillRect(k + x - left, j + y - top, 1, 1);
        } else {
          ctx.fillRect(7 - k + x - left, j + y - top, 1, 1);
        }
      }
    }
  }
};

export default CostumeCanvasContainer;
