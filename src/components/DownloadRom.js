import { useRef, useState } from 'react';
import { useRom } from '../contexts/RomContext';
import { generateRomHackFile } from '../lib/romUtils';

const type = 'application/x-nes-rom';
const fileName = 'mm-hack.nes';

const DownloadRom = ({ children }) => {
  const { prg, resources } = useRom();
  const [aHref, setAHref] = useState(null);
  const aRef = useRef(null);

  if (prg === null) {
    return (
      <button
        className="text-slate-500 opacity-50"
        disabled>
        {children}
      </button>
    );
  }

  return (
    <>
      <button
        className="text-slate-500 transition hover:text-slate-800 hover:dark:text-slate-200"
        onClick={() => {
          const rom = generateRomHackFile(prg, resources);
          setAHref(window.URL.createObjectURL(new Blob([rom], { type })));

          // Needs to render first.
          setTimeout(() => {
            // Trigger the download by simulating a click.
            aRef.current.click();
            window.URL.revokeObjectURL(aHref);
          });
        }}>
        {children}
      </button>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a
        className="hidden"
        href={aHref}
        download={fileName}
        ref={aRef}
      />
    </>
  );
};

export default DownloadRom;
