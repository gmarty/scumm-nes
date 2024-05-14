import { clsx } from 'clsx';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const DropZone = ({ children, isDragActive, isDragReject, errorCode }) => {
  let label = 'Drag a PRG or a ROM file here.';
  let className =
    'text-slate-600 bg-slate-300 dark:text-slate-400 dark:bg-slate-700 outline-slate-400 outline-offset-[-.75rem]';
  if (isDragActive) {
    label = 'Drop it here!';
    className =
      'text-blue-600 bg-blue-200 dark:text-blue-400 dark:bg-blue-800 outline-blue-400 outline-offset-[-1.5rem]';
  }
  if (isDragReject) {
    label = 'Only one file please!';
    className =
      'text-rose-600 bg-rose-200 dark:text-red-400 dark:bg-red-800 outline-rose-400 outline-offset-[-1.5rem]';
  }

  let errorMsg = null;
  switch (errorCode) {
    case 'too-many-files':
      errorMsg = 'Multiple files are not allowed.';
      break;
    case 'wrong-extension':
      errorMsg = 'Only PRG and NES files are accepted.';
      break;
    case 'japanese-rom-unsupported':
      errorMsg = 'The Japanese Famicom version is not supported.';
      break;
    case 'invalid-rom-file':
      errorMsg = 'The ROM was not recognised as one of Maniac Mansion on NES.';
      break;
    case 'reading-file-failed':
      errorMsg = 'File reading has failed. Please try again.';
      break;
  }

  return (
    <div
      className={clsx(
        'relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl p-10 outline-dashed outline-4 transition-all',
        className,
      )}>
      <ArrowDownTrayIcon className="absolute z-0 size-1/2 opacity-10" />
      <div className="mx-6 text-balance text-center text-3xl">{label}</div>
      <div className="mx-6 text-balance text-center text-sm opacity-75">
        A PRG file is a NES ROM file without the headers.
      </div>
      {errorMsg && (
        <div className="z-10 mt-6 rounded-xl bg-rose-200 p-4 text-xl text-rose-700">
          {errorMsg}
        </div>
      )}
      {children}
    </div>
  );
};

export default DropZone;
