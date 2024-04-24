import { formatBytes, formatPercentage, hex } from '../lib/utils.js';

const ResourceMetadata = ({ metadata }) => {
  const sizeInB = metadata.size > 1024 && formatBytes(metadata.size);
  const compressionRow = metadata.decompressedSize && (
    <>
      <div className="font-bold">unpacked size:</div>
      <div className="font-mono text-right">{metadata.decompressedSize}</div>
      <div className="font-mono opacity-50">
        ({formatPercentage(1 - metadata.size / metadata.decompressedSize)}{' '}
        <span className="font-sans"> compr.</span>)
      </div>
    </>
  );

  return (
    <div className="grid w-max grid-cols-[auto_auto_auto] gap-x-2 gap-y-1 whitespace-nowrap rounded bg-slate-200 p-2 font-monocode text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
      <div className="font-bold">payload offset:</div>
      <div className="font-mono text-right">0x{hex(metadata.offset)}</div>
      <div className="font-mono opacity-50">({metadata.offset})</div>
      <div className="font-bold">payload size:</div>
      <div className="font-mono text-right">{metadata.size} B</div>
      <div className="font-mono opacity-50">{sizeInB}</div>
      {compressionRow}
    </div>
  );
};

export default ResourceMetadata;
