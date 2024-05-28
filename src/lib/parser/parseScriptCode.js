/* eslint-disable no-fallthrough */
import { opCodes, varNames } from '../opcodes.js';
import { hex } from '../utils.js';

const getVariable = (parser) => {
  const i = parser.getUint8();

  if (i & 0x2000) {
    // Not implemented
    console.error('Not implemented');
  }

  if (i < varNames.length && varNames[i]) {
    return varNames[i];
  } else if (i & 0x8000) {
    return `Var[${(i & 0x0fff) >> 4} Bit ${i & 0x000f}]`;
  } else {
    const varIndex = i & 0xfff;
    const s = varIndex >= 0x320 ? '??Var??' : 'Var';
    return `${s}[${varIndex}]`;
  }
};

const getVariableOrByte = (parser, condition) => {
  if (condition) {
    return getVariable(parser);
  } else {
    return parser.getUint8();
  }
};

const getVariableOrWord = (parser, condition) => {
  if (condition) {
    return getVariable(parser);
  } else {
    return parser.getUint16();
  }
};

const getOffset = (parser, startAddress) => {
  const offset = parser.getUint16();
  const currentRow = parser.pointer - startAddress;
  return hex((currentRow + offset) % 0x10000, 4);
};

const parseScriptCode = (parser, startAddress, parentOffset = 0) => {
  const script = [];
  let stop = false;

  do {
    const scriptRow = [];
    const rowAddress = parser.pointer - startAddress;

    const opCode = parser.getUint8();

    scriptRow.push(opCode);
    scriptRow.push(`${opCodes[opCode].name ?? opCode}`);

    switch (opCode) {
      // stopObjectCode
      case 0x00:
      case 0xa0:
        stop = true;
        break;

      // putActor
      case 0x01:
      case 0x21:
      case 0x41:
      case 0x61:
      case 0x81:
      case 0xa1:
      case 0xc1:
      case 0xe1:
        // Actor Id
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        // X
        scriptRow.push(getVariableOrByte(parser, opCode & 0x40));
        // Y
        scriptRow.push(getVariableOrByte(parser, opCode & 0x20));

        break;

      // startMusic
      case 0x02:
      case 0x82:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        break;

      // getActorRoom
      case 0x03:
      case 0x83:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        break;

      // drawObject
      case 0x05:
      case 0x25:
      case 0x45:
      case 0x65:
      case 0x85:
      case 0xa5:
      case 0xc5:
      case 0xe5:
        // ObjectId
        scriptRow.push(getVariableOrWord(parser, opCode & 0x80));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x40));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x20));

        break;

      // faceActor
      case 0x09:
      case 0x49:
      case 0x89:
      case 0xc9:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x40));

        break;

      // setObjPreposition
      case 0x0b:
      case 0x4b:
      case 0x8b:
      case 0xcb:
        // ObjectId
        scriptRow.push(getVariableOrWord(parser, opCode & 0x80));

        // Preposition Id
        scriptRow.push(parser.getUint8());

        break;

      // resourceRoutines
      case 0x0c:
      case 0x8c: {
        const resTypes = [
          0, // Invalid
          0, // Invalid
          'Costume',
          'Room',
          '0', // Invalid
          'Script',
          'Sound',
        ];

        const resId = getVariableOrByte(parser, opCode & 0x80);
        const subOp = parser.getUint8();

        let routine;
        if ((subOp & 0x0f) === 0 || (subOp & 0x0f) === 1) {
          if (subOp & 1) {
            routine = 'load';
          } else {
            routine = 'nuke';
          }
        } else {
          if (subOp & 1) {
            routine = 'lock';
          } else {
            routine = 'unlock';
          }
        }

        const type = resTypes[subOp >> 4];
        if (type === 0) {
          console.error(`Resource Routines: Invalid type ${type}`);
        }

        scriptRow.push(`${routine}${type}`);
        scriptRow.push(resId);

        break;
      }

      // putActorAtObject
      case 0x0e:
      case 0x4e:
      case 0x8e:
      case 0xce:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        scriptRow.push(getVariableOrWord(parser, opCode & 0x40));

        break;

      // walkActorToActor
      case 0x0d:
      case 0x4d:
      case 0x8d:
      case 0xcd:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x40));

        scriptRow.push(parser.getUint8());

        break;

      // getObjectOwner
      case 0x10:
      case 0x90:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrWord(parser, opCode & 0x80));

        break;

      // animateActor
      case 0x11:
      case 0x51:
      case 0x91:
      case 0xd1:
        // Actor Id
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        // Animation
        scriptRow.push(getVariableOrByte(parser, opCode & 0x40));
        break;

      // panCameraTo
      case 0x12:
      case 0x92:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        break;

      // actorOps
      case 0x13:
      case 0x53:
      case 0x93:
      case 0xd3:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        const subOpArg = getVariableOrByte(parser, opCode & 0x40);

        const subOp = parser.getUint8();
        switch (subOp) {
          case 0x01:
            scriptRow.push(`Sound(${subOpArg})`);
            break;
          case 0x02:
            const value = parser.getUint8();
            scriptRow.push(`Color(${value}, ${subOpArg})`);
            break;
          case 0x03:
            const name = parser.getString();
            scriptRow.push(`Name("${name}")`);
            break;
          case 0x04:
            scriptRow.push(`Costume(${subOpArg})`);
            break;
          case 0x05:
            scriptRow.push(`TalkColor(${subOpArg})`);
            break;
          default:
            scriptRow.push(`// Unknown subop: 0x${hex(subOp, 2)}`);
        }
        break;

      // print
      case 0x14:
      case 0x94:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        scriptRow.push(`"${parser.getString()}"`);
        break;

      // actorFromPos
      case 0x15:
      case 0x55:
      case 0x95:
      case 0xd5:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x40));

        break;

      // getRandomNr
      case 0x16:
      case 0x96:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        break;

      // goto
      case 0x18:
        {
          const offset = parser.getUint16();
          const currentRow = parser.pointer - startAddress;
          scriptRow.push(hex((currentRow + offset) % 0x10000, 4));
        }

        break;

      // doSentence
      case 0x19:
      case 0x39:
      case 0x59:
      case 0x79:
      case 0x99:
      case 0xb9:
      case 0xd9:
      case 0xf9:
        const tmpValue = parser.peekUint8();
        if (!(opCode & 0x80) && tmpValue === 0xfc) {
          scriptRow.push('STOP');
          parser.getUint8();
        } else if (!(opCode & 0x80) && tmpValue === 0xfb) {
          scriptRow.push('RESET');
          parser.getUint8();
        } else {
          scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

          scriptRow.push(getVariableOrWord(parser, opCode & 0x40));

          scriptRow.push(getVariableOrWord(parser, opCode & 0x20));

          scriptRow.push(parser.getUint8());
        }
        break;

      // setBitVar
      case 0x1b:
      case 0x5b:
      case 0x9b:
      case 0xdb:
        scriptRow.push(parser.getUint16());

        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x40));

        break;

      // startSound
      case 0x1c:
      case 0x9c:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        break;

      // walkActorTo
      case 0x1e:
      case 0x3e:
      case 0x5e:
      case 0x7e:
      case 0x9e:
      case 0xbe:
      case 0xde:
      case 0xfe:
        // Actor id
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        // x
        scriptRow.push(getVariableOrByte(parser, opCode & 0x40));

        // y
        scriptRow.push(getVariableOrByte(parser, opCode & 0x20));

        break;

      // stopMusic
      case 0x20:
        // No arguments
        break;

      // saveLoadGame
      case 0x22:
      case 0xa2:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x20));

        break;

      // loadRoomWithEgo
      case 0x24:
      case 0x64:
      case 0xa4:
      case 0xe4:
        // Object Id
        scriptRow.push(getVariableOrWord(parser, opCode & 0x80));

        // Room Id
        scriptRow.push(getVariableOrByte(parser, opCode & 0x40));

        // x
        scriptRow.push(parser.getUint8());

        // y
        scriptRow.push(parser.getUint8());

        break;

      // setVarRange
      case 0x26:
      case 0xa6:
        scriptRow.push(getVariable(parser));

        let length = parser.getUint8();
        scriptRow.push(length);

        const values = [];
        while (length > 0) {
          if (opCode & 0x80) {
            values.push(parser.getUint16());
          } else {
            values.push(parser.getUint8());
          }
          length--;
        }
        scriptRow.push(`[${values}]`);

        break;

      // setOwnerOf
      case 0x29:
      case 0x69:
      case 0xa9:
      case 0xe9:
        scriptRow.push(getVariableOrWord(parser, opCode & 0x80));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x40));

        break;

      // addIndirect
      case 0x2a:
      case 0xaa:
      // subtract
      case 0x3a:
      case 0xba:
      // subIndirect
      case 0x6a:
      case 0xea:
      // assignVarWordIndirect
      case 0x0a:
      case 0x8a:
      // move
      case 0x1a:
      case 0x9a:
      // add
      case 0xda:
      case 0x5a:
      // increment/decrement
      case 0x46:
      case 0xc6:
        if (
          (opCode & 0x7f) === 0x0a ||
          (opCode & 0x7f) === 0x2a ||
          (opCode & 0x7f) === 0x6a
        ) {
          // Assign to a variable defined by the value of another variable
          const i = parser.getUint8();
          scriptRow.push(`Var[Var[${i}]]`);
        } else {
          // Assign to a variable
          scriptRow.push(getVariable(parser));
        }

        if ((opCode & 0x7f) === 0x2c) {
          scriptRow.push(parser.getUint8());
        } else if ((opCode & 0x7f) !== 0x46) {
          scriptRow.push(getVariableOrWord(parser, opCode & 0x80));
        }
        break;

      // delayVariable
      case 0x2b:
        scriptRow.push(getVariable(parser));
        break;

      // delay
      case 0x2e:
        let d = parser.getUint8();
        d |= parser.getUint8() << 8;
        d |= parser.getUint8() << 16;
        d = 0xffffff - d;

        scriptRow.push(d);

        break;

      // putActorInRoom
      case 0x2d:
      case 0x6d:
      case 0xad:
      case 0xed:
        // Actor Id
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        // Room
        scriptRow.push(getVariableOrByte(parser, opCode & 0x40));
        break;

      // setBoxFlags
      case 0x30:
      case 0xb0:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        scriptRow.push(parser.getUint8());

        break;

      // getBitVar
      case 0x31:
      case 0xb1:
        scriptRow.push(getVariable(parser));

        scriptRow.push(parser.getUint16());

        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        break;

      // setCameraAt
      case 0x32:
      case 0xb2:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        break;

      // roomOps
      case 0x33:
      case 0x73:
      case 0xb3:
      case 0xf3: {
        const valueA = getVariableOrByte(parser, opCode & 0x80);
        const valueB = getVariableOrByte(parser, opCode & 0x40);

        const subOp = parser.getUint8();

        console.log(
          `Room Ops: ${(subOp & 0x1f).toString(16, 2)}, ${valueA} ${valueB}`,
        );

        switch (subOp & 0x1f) {
          case 0x01:
            scriptRow.push(`RoomScroll`);
            scriptRow.push(valueA);
            scriptRow.push(valueB);
            break;
          case 0x02:
            // Not used on NES
            console.error(`RoomOps invalid Op ${subOp & 0x1f}`);
            break;
          case 0x03:
            scriptRow.push(`SetScreen`);
            scriptRow.push(valueA);
            scriptRow.push(valueB);
            break;
          case 0x04:
            scriptRow.push(`SetPalColor`);
            scriptRow.push(valueA);
            scriptRow.push(valueB);
            break;
          case 0x05:
            scriptRow.push(`ShakeOn`);
            break;
          case 0x06:
            scriptRow.push(`ShakeOff`);
            break;
          default:
            scriptRow.push(
              `[[unknown subop ${(subOp & 0x1f).toString(16, 2)}]]`,
            );
            console.error(
              `Room Ops: unknown subop ${(subOp & 0x1f).toString(16, 2)}`,
            );
        }
        break;
      }

      // getDist
      case 0x34:
      case 0x74:
      case 0xb4:
      case 0xf4:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrWord(parser, opCode & 0x80));

        scriptRow.push(getVariableOrWord(parser, opCode & 0x40));
        break;

      // findObject
      case 0x35:
      case 0x75:
      case 0xb5:
      case 0xf5:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x40));

        break;

      // walkActorToObject
      case 0x36:
      case 0x76:
      case 0xb6:
      case 0xf6:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        scriptRow.push(getVariableOrWord(parser, opCode & 0x40));
        break;

      // setState01 to value
      case 0x37:
      case 0xb7:
      // setState02 to value
      case 0x57:
      case 0xd7:
      // setState04 to value
      case 0x27:
      case 0xa7:
      // setState08 to value
      case 0x07:
      case 0x87:
        scriptRow.push(getVariableOrWord(parser, opCode & 0x80));
        break;

      // waitForActor
      case 0x3b:
      case 0xbb:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        break;

      // stopSound
      case 0x3c:
      case 0xbc:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        break;

      // setActorElevation
      case 0x3d:
      case 0x7d:
      case 0xbd:
      case 0xfd:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        scriptRow.push(getVariableOrByte(parser, opCode & 0x40));
        break;

      // ifNotState01
      case 0x3f:
      case 0xbf:
      // ifNotState02
      case 0x5f:
      case 0xdf:
      // ifNotState04
      case 0x2f:
      case 0xaf:
      // ifNotState08
      case 0x0f:
      case 0x8f:
      // ifState01
      case 0x7f:
      case 0xff:
      // ifState02
      case 0x1f:
      case 0x9f:
      // ifState04
      case 0x6f:
      case 0xef:
      // ifState08
      case 0x4f:
      case 0xcf:
        // Object Id
        scriptRow.push(getVariableOrWord(parser, opCode & 0x80));

        scriptRow.push(getOffset(parser, startAddress));

        break;

      // cutscene
      case 0x40:
        // No arguments
        break;

      // startScript
      case 0x42:
      case 0xc2:
      // stopScript
      case 0x62:
      case 0xe2:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        break;

      // getActorX
      case 0x43:
      case 0xc3:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        break;

      // getActorY
      case 0x23:
      case 0xa3:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        break;

      // chainScript
      case 0x4a:
      case 0xca:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        break;

      // waitForSentence
      case 0x4c:
        // No arguments
        break;

      // isEqual
      case 0x48:
      case 0xc8:
      // isGreater
      case 0x78:
      case 0xf8:
      // isGreaterEqual
      case 0x04:
      case 0x84:
      // isLess
      case 0x44:
      case 0xc4:
      // isNotEqual
      case 0x08:
      case 0x88:
      // lessOrEqual
      case 0x38:
      case 0xb8:
      // equalZero
      case 0x28:
      // notEqualZero
      case 0xa8:
        // Variable to compare
        scriptRow.push(getVariable(parser));

        // For opCode different than equalZero and notEqualZero
        if (opCode !== 0x28 && opCode !== 0xa8) {
          scriptRow.push(getVariableOrWord(parser, opCode & 0x80));
        }

        scriptRow.push(getOffset(parser, startAddress));

        break;

      // pickupObject
      case 0x50:
      case 0xd0:
        // Object Id
        scriptRow.push(getVariableOrWord(parser, opCode & 0x80));
        break;

      // actorFollowCamera
      case 0x52:
      case 0xd2:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        break;

      // setObjectName
      case 0x54:
      case 0xd4:
        scriptRow.push(getVariableOrWord(parser, opCode & 0x80));

        const name = parser.getString();
        scriptRow.push(`"${name}"`);

        break;

      // getActorMoving
      case 0x56:
      case 0xd6:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        break;

      // beginOverride
      case 0x58:
        // No arguments
        break;

      case 0x5c: // dummy
      case 0x6b: // dummy
      case 0x6e: // dummy
      case 0xab: // dummy
      case 0xdc: // dummy
      case 0xeb: // dummy
      case 0xee: // dummy
        break;

      // cursorCommand
      case 0x60:
      case 0xe0:
        if (opCode & 0x80) {
          const variable = getVariable(parser);
          scriptRow.push(`Hi(${variable})`);
          scriptRow.push(`Lo(${variable})`);
        } else {
          const value = parser.getUint16();
          scriptRow.push((value >> 8) & 0xff);
          scriptRow.push(value & 0xff);
        }
        break;

      // getClosestObjActor
      case 0x66:
      case 0xe6:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrWord(parser, opCode & 0x80));
        break;

      // isScriptRunning
      case 0x68:
      case 0xe8:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        break;

      // getObjPreposition
      case 0x6c:
      case 0xec:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrWord(parser, opCode & 0x80));
        break;

      // lights
      case 0x70:
      case 0xf0:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

        scriptRow.push(parser.getUint8());
        scriptRow.push(parser.getUint8());

        break;

      // loadRoom
      case 0x72:
      case 0xf2:
        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        break;

      // clearState01
      case 0x77:
      case 0xf7:
      // clearState02
      case 0x17:
      case 0x97:
      // clearState04
      case 0x67:
      case 0xe7:
      // clearState08
      case 0x47:
      case 0xc7:
        scriptRow.push(getVariableOrWord(parser, opCode & 0x80));
        break;

      // verbOps
      case 0x7a:
      case 0xfa: {
        const subOp = parser.getUint8();

        switch (subOp) {
          case 0:
            scriptRow.push(`Delete`);
            scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
            break;
          case 0xff:
            // Not implemented for NES
            break;
          default:
            scriptRow.push(`New-${subOp}`);

            scriptRow.push(parser.getUint8());
            scriptRow.push(parser.getUint8());
            scriptRow.push(getVariableOrByte(parser, opCode & 0x80));

            scriptRow.push(parser.getUint8());

            scriptRow.push(`"${parser.getString()}"`);
        }
        break;
      }

      // isSoundRunning
      case 0x7c:
      case 0xfc:
        scriptRow.push(getVariable(parser));

        scriptRow.push(getVariableOrByte(parser, opCode & 0x80));
        break;

      // breakHere
      case 0x80:
        // No arguments
        break;

      // restart
      case 0x98:
        // No arguments
        break;

      // drawSentence
      case 0xac:
        // No arguments
        break;

      // waitForMessage
      case 0xae:
        // No arguments
        break;

      // endCutscene
      case 0xc0:
        // No arguments
        break;

      case 0xd8: // printEgo
        const str = parser.getString();
        scriptRow.push(`"${str}"`);

        break;

      default:
        scriptRow.push(
          `NOT IMPLEMENTED (${hex(opCode)}) ${opCodes[opCode].name ?? opCode}`,
        );
        console.error(
          `NOT IMPLEMENTED (${hex(opCode)}) ${opCodes[opCode].name ?? opCode}`,
        );

        stop = true;

        break;
    }

    script.push([rowAddress, scriptRow]);
  } while (!stop);

  return script;
};

export default parseScriptCode;
