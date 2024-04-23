import React from 'react';
import { Link } from 'react-router-dom';
import { hex } from '../lib/utils.js';

const prettifyScriptCommand = function (row) {
  const opCode = row[0];

  const operation = (
    <span className="text-indigo-600 dark:text-indigo-300">
      ({hex(opCode, 2)}) {row[1]}
    </span>
  );

  let args = row.slice(2);
  switch (opCode) {
    case 0x18: // goTo
      args = [
        <Link
          className="underline"
          to={`#L${args[0]}`}>
          0x{args[0]}
        </Link>,
      ];
      break;
    case 0x24: // loadRoomWithEgo
      args = [
        args[0],
        <Link
          className="underline"
          to={`/rooms/${args[1]}`}>
          {args[1]}
        </Link>,
        args[2],
        args[3],
      ];
      break;
    case 0x72:
      args = [
        <Link
          className="underline"
          to={`/rooms/${args[0]}`}>
          {args[0]}
        </Link>,
      ];
      break;
    case 0x2d: // putActorInRoom
      args = [
        args[0],
        <Link
          className="underline"
          to={`/rooms/${args[1]}`}>
          {args[1]}
        </Link>,
      ];
      break;
    case 0x42: // startScript
    case 0x62: // stopScript
    case 0x4a: // chainScript
      args = [
        <Link
          className="underline"
          to={`/scripts/${args[0]}`}>
          {args[0]}
        </Link>,
      ];
      break;
    case 0x48: // isEqual
    case 0xc8: // isEqual
    case 0x78: // isGreater
    case 0xf8: // isGreater
    case 0x04: // isGreaterEqual
    case 0x84: // isGreaterEqual
    case 0x44: // isLess
    case 0xc4: // isLess
    case 0x08: // isNotEqual
    case 0x88: // isNotEqual
    case 0x38: // lessOrEqual
    case 0xb8: // lessOrEqual
      args = [
        args[0],
        args[1],
        <Link
          className="underline"
          to={`#L${args[2]}`}>
          0x{args[2]}
        </Link>,
      ];
      break;
    case 0x28: // equalZero
    case 0xa8: // notEqualZero
      args = [
        args[0],
        <Link
          className="underline"
          to={`#L${args[1]}`}>
          0x{args[1]}
        </Link>,
      ];
      break;
    case 0x28: // equalZero
    case 0xa8: // notEqualZero
      args = [
        args[0],
        <Link
          className="underline"
          to={`#L${args[1]}`}>
          0x{args[1]}
        </Link>,
      ];
      break;
    case 0x3f: // ifNotState01
    case 0x5f: // ifNotState02
    case 0x2f: // ifNotState04
    case 0x0f: // ifNotState08
    case 0x7f: // ifState01
    case 0x1f: // ifState02
    case 0x6f: // ifState04
    case 0x4f: // ifState08
      args = [
        args[0],
        <Link
          className="underline"
          to={`#L${args[1]}`}>
          0x{args[1]}
        </Link>,
      ];
      break;
  }

  return (
    <>
      {operation}{' '}
      {args.map((arg, i) => (
        <>
          {arg}
          {i < args.length - 1 ? <span className={'opacity-50'}>, </span> : ''}
        </>
      ))}
    </>
  );
};

const ScriptRows = ({ scriptRows }) => {
  if (!scriptRows) {
    return null;
  }

  return (
    <div className="text-xs">
      {scriptRows.map((row) => (
        <>
          <div
            id={`L${row[0]}`}
            className="flex gap-4 px-2 font-monocode">
            <Link
              className="font-thin opacity-50"
              to={`#L${row[0]}`}>
              0x{row[0]}
            </Link>
            <span>{prettifyScriptCommand(row[1])}</span>
          </div>
        </>
      ))}
    </div>
  );
};

export default ScriptRows;
