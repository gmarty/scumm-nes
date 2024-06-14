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

  // console.log('frame', frame);
  // console.log('id', id);
  // console.log('offset', offset);
  // console.log('spritesNum', spritesNum);
  // console.log('---');

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

  // console.log(left, right, top, bottom);
  // console.log(width, height);

  // Aspect ratio of 5:4 for all possible screen sizes.
  const ratio = 'aspect-[1/1]';
  //   width === 28
  //     ? 'aspect-[4.375/2.133333333333333]'
  //     : width === 60
  //       ? 'aspect-[9.375/2.133333333333333]'
  //       : 'aspect-[5/4]';

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
        // ratio,
        'w-full rounded',
        isComputing ? 'opacity-0' : 'opacity-100 transition-opacity',
      )}
      style={{ width: width * zoom }}
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
  // console.log('---');
  // console.log('dataOffset', dataOffset);
  // console.log('palette', palette);
  // console.log('gfx', gfx);

  // Clear the canvas.
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < spritesNum; i++) {
    const { x, y, tile, flip, paletteId } = sprdata[offset + i];
    // console.log(sprdata[i]);

    const pal = getPalette([
      palette[paletteId],
      palette[paletteId + 1],
      palette[paletteId + 2],
      palette[paletteId + 3],
    ]);

    // console.log('pal', pal);

    for (let j = 0; j < 8; j++) {
      const n1 = gfx[tile * 2 * 8 + j];
      const n2 = gfx[(tile * 2 + 1) * 8 + j];
      for (let k = 0; k < 8; k++) {
        const mask = 1 << k;
        const val = (n1 & mask ? 1 : 0) | ((n2 & mask ? 1 : 0) << 1);

        // console.log('val', val, pal[val]);

        // Skip the transparent palette colour.
        if (val === 0) {
          continue;
        }

        ctx.fillStyle = pal[val];
        if (flip) {
          ctx.fillRect(7 - k - x, j + y - top, 1, 1);
        } else {
          ctx.fillRect(k - x, j + y - top, 1, 1);
        }
      }
    }
  }
};

export default CostumeCanvasContainer;
