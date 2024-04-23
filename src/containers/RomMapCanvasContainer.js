import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { getResourceColour } from '../lib/resourceUtils';

const WIDTH = 512;
const HEIGHT = 512;

const RomMapCanvasContainer = ({ rom, res, resourceList }) => {
  const canvasRef = useRef(null);
  const [isComputing, setIsComputing] = useState(true);

  useEffect(() => {
    setIsComputing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    setTimeout(() => {
      draw(ctx, rom, res, resourceList);
      setIsComputing(false);
    });
  }, [rom, res, resourceList]);

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      className={clsx(
        'aspect-[4/3] w-full rounded border border-slate-700',
        isComputing ? 'opacity-0' : 'opacity-100 transition-opacity',
      )}
      style={{ maxWidth: WIDTH }}
    />
  );
};

const draw = (ctx, rom, res, resourceList) => {
  // Background colour (for code).
  const codeColour = resourceList.indexOf('other');
  ctx.fillStyle = getResourceColour(codeColour, resourceList.length);
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Mark padding (4 or more consecutive bytes of 0xff).
  const view = new DataView(rom);
  const paddingColour = resourceList.indexOf('padding');
  ctx.fillStyle = getResourceColour(paddingColour, resourceList.length);
  for (let j = 0; j < rom.byteLength; j += 4) {
    if (
      view.getUint8(j) === 0xff &&
      view.getUint8(j + 1) === 0xff &&
      view.getUint8(j + 2) === 0xff &&
      view.getUint8(j + 3) === 0xff
    ) {
      ctx.fillRect(j % WIDTH, Math.floor(j / WIDTH), 1, 1);
      ctx.fillRect((j + 1) % WIDTH, Math.floor((j + 1) / WIDTH), 1, 1);
      ctx.fillRect((j + 2) % WIDTH, Math.floor((j + 2) / WIDTH), 1, 1);
      ctx.fillRect((j + 3) % WIDTH, Math.floor((j + 3) / WIDTH), 1, 1);
    }
  }

  resourceList
    // Remove pseudo resources like 'other' or 'padding'.
    .filter((resourceLabel) => res[resourceLabel])
    .forEach((resourceLabel, i) => {
      const resource = res[resourceLabel];

      ctx.fillStyle = getResourceColour(i, resourceList.length);
      for (let i = 0; i < resource.length; i++) {
        const [offset, length] = resource[i];
        for (let j = offset; j < offset + length; j++) {
          ctx.fillRect(j % WIDTH, Math.floor(j / WIDTH), 1, 1);
        }
      }
    });
};

export default RomMapCanvasContainer;
