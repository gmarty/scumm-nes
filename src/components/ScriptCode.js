import React from 'react';
import { Link } from 'react-router-dom';
import ScriptCodeInstruction from './ScriptCodeInstruction.js';

const ScriptCode = ({ code }) => {
  if (!code) {
    return null;
  }

  return (
    <div className="text-xs">
      {code.map(({ 0: address, 1: command }) => (
        <div
          key={address}
          id={`L${address}`}
          className="flex gap-4 px-2 font-monocode">
          <Link
            className="font-thin opacity-50"
            to={`#L${address}`}>
            0x{address}
          </Link>
          <ScriptCodeInstruction
            address={address}
            command={command}
          />
        </div>
      ))}
    </div>
  );
};

export default ScriptCode;
