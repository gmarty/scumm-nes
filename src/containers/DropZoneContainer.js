import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Main from '../components/Main';
import DropZone from '../components/DropZone';
import BaseRomDialog from '../components/BaseRomDialog';

const DropZoneContainer = ({ onFile }) => {
  const validator = (file) => {
    setErrorCode(null);
    setRom(null);
    setRes(null);

    if (!file.name) {
      return null;
    }

    // Verify the file extension.
    if (!file.name.endsWith('.prg') && !file.name.endsWith('.nes')) {
      return {
        code: 'wrong-extension',
        message: `Only PRG and NES files are accepted.`,
      };
    }

    // Check that it is one of the supported rom files.
    const reader = new FileReader();
    reader.onerror = () => {
      setErrorCode('reading-file-failed');
    };
    reader.onload = async () => {
      const { hasNesHeader } = await import('../lib/utils');
      const { default: crc32 } = await import('../lib/crc32');
      const { isJapaneseVersion, getResFromCrc32 } = await import(
        '../lib/getResFromCrc32'
      );

      let arrayBuffer = reader.result;

      if (file.name.endsWith('.nes') || hasNesHeader(arrayBuffer)) {
        arrayBuffer = arrayBuffer.slice(16);
      }

      const dataView = new DataView(arrayBuffer);
      const c = crc32(dataView);

      if (isJapaneseVersion(c)) {
        setErrorCode('japanese-rom-unsupported');
        return;
      }

      const res = getResFromCrc32(c);

      setRom(arrayBuffer);

      if (!res) {
        setBaseRomDialogOpened(true);
        return;
      }

      setRes(res);
    };
    reader.readAsArrayBuffer(file);

    return null;
  };

  const [errorCode, setErrorCode] = useState(null);
  const [baseRomDialogOpened, setBaseRomDialogOpened] = useState(false);
  const [baseRom, setBaseRom] = useState(null);
  const [rom, setRom] = useState(null);
  const [res, setRes] = useState(null);
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
    isDragActive,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    multiple: false,
    validator,
  });

  if (baseRom) {
    (async () => {
      const { getResFromBaseRom } = await import('../lib/getResFromCrc32');
      const { default: parseRom } = await import('../lib/parser/parseRom');
      const res = getResFromBaseRom(baseRom);

      try {
        parseRom(rom, res);
        setRes(res);
      } catch (err) {
        setErrorCode('invalid-rom-file');
      }
    })();
  }

  if (fileRejections[0] && fileRejections[0]?.errors[0]?.code && !errorCode) {
    setErrorCode(fileRejections[0].errors[0].code);
  }

  useEffect(() => {
    if (acceptedFiles.length === 1 && rom && res) {
      onFile(rom, res);
    }
  }, [acceptedFiles, rom, res]);

  return (
    <Main>
      <BaseRomDialog
        open={baseRomDialogOpened}
        setOpen={setBaseRomDialogOpened}
        setBaseRom={setBaseRom}
      />
      <div
        className="h-full w-full p-4"
        {...getRootProps()}>
        <DropZone
          isDragActive={isDragActive}
          isDragReject={isDragReject}
          errorCode={errorCode}></DropZone>
        <input {...getInputProps()} />
      </div>
    </Main>
  );
};

export default DropZoneContainer;
