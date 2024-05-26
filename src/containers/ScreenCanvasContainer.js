import { useRef, useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { getPalette } from '../lib/paletteUtils';

// Display a screen on a canvas. Used by rooms and title screens.

const ScreenCanvasContainer = ({
  screen,
  baseTiles,
  gfc,
  selectedObjects,
  hoveredBox,
  crop = true,
  zoom = 1,
}) => {
  const canvasRef = useRef(null);
  const [isComputing, setIsComputing] = useState(true);
  const { width, height } = screen.header;
  // Aspect ratio of 5:4 for all possible screen sizes.
  const ratio =
    width === 28
      ? 'aspect-[4.375/2.133333333333333]'
      : width === 60
        ? 'aspect-[9.375/2.133333333333333]'
        : 'aspect-[5/4]';

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    setTimeout(() => {
      draw(ctx, screen, baseTiles, gfc, selectedObjects, crop);
      drawBoxes(ctx, screen.boxes, hoveredBox);
      setIsComputing(false);
    });
  }, [screen, selectedObjects, hoveredBox, crop, baseTiles, gfc]);

  return (
    <canvas
      ref={canvasRef}
      width={width * 8}
      height={height * 8}
      className={clsx(
        ratio,
        'w-full rounded',
        isComputing ? 'opacity-0' : 'opacity-100 transition-opacity',
      )}
      style={{ maxWidth: width * 8 * zoom }}
    />
  );
};

const draw = (
  ctx,
  room,
  baseTiles = { gfx: [] },
  roomgfc,
  selectedObjects = [],
  crop,
) => {
  const { width, height } = room.header;
  const { palette } = room;
  const baseTilesNum = baseTiles?.gfx?.length / 8 / 2;
  const nametable = structuredClone(room.nametable);
  const attributes = structuredClone(room.attributes);

  // Overwrite tiles and palette with selected object.
  // Start with highest id as it is the way it is implemented with overlapping object images.
  for (let i = selectedObjects.length - 1; i >= 0; i--) {
    const object = room?.objects[i];
    const objectImage = room?.objectImages[i];
    const x = object?.x; // Can be 0?
    const y = object?.y; // Can be 0?
    const width = object?.width;
    const height = object?.height;

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
        nametable[y + j][x + i + 2] = objectImage.tiles[j][i];
      }
    }

    // Port of https://github.com/scummvm/scummvm/blob/master/engines/scumm/gfx.cpp#L3103-L3134
    let j = height >> 1;
    let ay = y;
    let ptr = 0;
    while (j) {
      let ax = x + 2;
      let i = 0;
      let adata = 0;
      while (i < width >> 1) {
        if (!(i & 3)) {
          adata = objectImage.attributes[ptr++];
        }

        let aand = 3;
        let aor = adata & 3;
        if (ay & 0x02) {
          aand <<= 4;
          aor <<= 4;
        }
        if (ax & 0x02) {
          aand <<= 2;
          aor <<= 2;
        }
        const attr = attributes[((ay << 2) & 0x30) | ((ax >> 2) & 0xf)];
        attributes[((ay << 2) & 0x30) | ((ax >> 2) & 0xf)] =
          (~aand & attr) | aor;

        adata >>= 2;
        ax += 2;
        i++;
      }
      ay += 2;
      j--;
    }
  }

  // Now generate the image of the room.
  for (let sprY = 0; sprY < height; sprY++) {
    for (let sprX = 0; sprX < 62; sprX++) {
      let tile = nametable[sprY][sprX];

      let gfx = baseTiles?.gfx;
      if (tile >= baseTilesNum) {
        tile -= baseTilesNum;
        gfx = roomgfc.gfx;
      }

      let paletteId;

      if (width === 32) {
        // Title screen.
        paletteId =
          (attributes[((sprY & 0xfffc) << 1) + (sprX >> 2)] >>
            (((sprY & 2) << 1) | (sprX & 2))) &
          0x3;
      } else {
        // SCUMM room.
        paletteId =
          (attributes[((sprY << 2) & 0x30) | ((sprX >> 2) & 0xf)] >>
            (((sprY & 2) << 1) | (sprX & 2))) &
          0x3;
      }
      const pal = getPalette([
        palette[paletteId * 4],
        palette[paletteId * 4 + 1],
        palette[paletteId * 4 + 2],
        palette[paletteId * 4 + 3],
      ]);

      for (let j = 0; j < 8; j++) {
        const n1 = gfx[tile * 2 * 8 + j];
        const n2 = gfx[(tile * 2 + 1) * 8 + j];
        for (let k = 0; k < 8; k++) {
          const mask = 1 << k;
          const val = (n1 & mask ? 1 : 0) | ((n2 & mask ? 1 : 0) << 1);

          ctx.fillStyle = pal[val];
          if (crop) {
            ctx.fillRect((sprX - 2) * 8 + 7 - k, sprY * 8 + j, 1, 1);
          } else {
            ctx.fillRect(sprX * 8 + 7 - k, sprY * 8 + j, 1, 1);
          }
        }
      }
    }
  }
};

const drawBoxes = (ctx, boxes = null, hoveredBox) => {
  if (boxes === null || hoveredBox === null) {
    return;
  }

  // Draw the outlines of all the other boxes.
  ctx.strokeStyle = 'rgb(2,132,199,.8)'; // bg-primary-600/80
  boxes
    .filter((box, i) => i !== hoveredBox)
    .forEach((box) => {
      drawBox(ctx, box);
      ctx.stroke();
    });

  // Fill in the currently hovered box.
  ctx.fillStyle = 'rgb(2,132,199,.5)'; // bg-primary-600/50
  drawBox(ctx, boxes[hoveredBox]);
  ctx.fill();
};

const drawBox = (ctx, { uy, ly, ulx, urx, llx, lrx }) => {
  ctx.beginPath();
  ctx.moveTo((ulx - 1) * 8, (uy - 1) * 2);
  ctx.lineTo((urx + 1) * 8, (uy - 1) * 2);
  ctx.lineTo((lrx + 1) * 8, (ly + 1) * 2);
  ctx.lineTo((llx - 1) * 8, (ly + 1) * 2);
  ctx.lineTo((ulx - 1) * 8, (uy - 1) * 2);
};

export default ScreenCanvasContainer;
