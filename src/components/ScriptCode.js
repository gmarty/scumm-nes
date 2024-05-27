import React from 'react';
import { Link } from 'react-router-dom';
import ScriptCodeInstruction from './ScriptCodeInstruction.js';
import { hex } from '../lib/utils.js';

const ScriptCode = ({ code }) => {
  if (!code) {
    return null;
  }

  return (
    <div className="text-xs">
      {code.map(({ 0: address, 1: command }) => (
        <div
          key={hex(address, 4)}
          id={`L${hex(address, 4)}`}
          className="flex gap-4 px-2 font-monocode">
          <Link
            className="font-thin opacity-50"
            to={`#L${hex(address, 4)}`}>
            0x{hex(address, 4)}
          </Link>
          <ScriptCodeInstruction command={command} />
        </div>
      ))}
    </div>
  );
};

export default ScriptCode;
