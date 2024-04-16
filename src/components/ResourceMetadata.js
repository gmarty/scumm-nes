import { formatBytes, formatPercentage, hex } from '../lib/utils.js';

const ResourceMetadata = ({ metadata }) => {
  const sizeInB = metadata.size > 1024 && formatBytes(metadata.size);
  const compressionRow = metadata.decompressedSize && (
    <>
      <div className="font-bold">unpacked size:</div>
      <div className="text-right font-mono">{metadata.decompressedSize}</div>
      <div className="font-mono opacity-50">
        ({formatPercentage(1 - metadata.size / metadata.decompressedSize)}{' '}
        <span className="font-sans"> compression</span>)
      </div>
    </>
  );

  return (
    <div className="mb-3 mt-2 grid w-max grid-cols-[auto_auto_auto] gap-x-2 gap-y-1 rounded-lg bg-slate-200 p-2 text-xs text-slate-600">
      <div className="font-bold">payload offset:</div>
      <div className="text-right font-mono">0x{hex(metadata.offset)}</div>
      <div className="font-mono opacity-50">({metadata.offset})</div>
      <div className="font-bold">payload size:</div>
      <div className="text-right font-mono">{metadata.size} B</div>
      <div className="font-mono opacity-50">{sizeInB}</div>
      {compressionRow}
    </div>
  );
};

export default ResourceMetadata;
