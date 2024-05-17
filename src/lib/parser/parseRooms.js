import Parser from './parser.js';
import parseRoomHeader from './room/parseRoomHeader.js';
import parseRoomNametable from './room/parseRoomNametable.js';
import parseRoomAttributes from './room/parseRoomAttributes.js';
import parseRoomBoxes from './room/parseRoomBoxes.js';
import parseRoomMatrix from './room/parseRoomMatrix.js';

const assert = console.assert;

const parseRooms = (arrayBuffer, i = 0, offset = 0, characters = {}) => {
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
  };
  const map = [];

  if (arrayBuffer.byteLength === 0) {
    return { metadata, map };
  }

  const { headerMap, header } = parseRoomHeader(arrayBuffer.slice(0, 0x1c));

  assert(
    header.chunkSize === arrayBuffer.byteLength,
    'Room res size flag does not match chunk size.',
  );

  map.push(headerMap);

  const {
    chunkSize,
    width,
    nametableOffs,
    attrOffs,
    maskOffs,
    objectsNum,
    boxOffs,
    excdOffs,
    encdOffs,
  } = header;

  const objectImages = [];
  const objects = [];

  // These 2 are optional.
  if (excdOffs > 0) {
    map.push({
      type: 'excdOffs',
      from: excdOffs,
      to: encdOffs, // Hack
    });
  }
  if (encdOffs > 0) {
    map.push({
      type: 'encdOffs',
      from: encdOffs,
      to: chunkSize, // Hack
    });
  }

  // Parse gfx nametable.
  const { nametable, nametableMap } = parseRoomNametable(
    arrayBuffer.slice(nametableOffs, attrOffs),
    nametableOffs,
    width,
  );

  map.push(nametableMap);

  assert(
    nametableMap.to === attrOffs,
    'Gfx nametable overlaps on attributes table.',
  );

  // Parse gfx attrtable.
  const { attributes, attributesMap } = parseRoomAttributes(
    arrayBuffer.slice(attrOffs, maskOffs),
    attrOffs,
    width,
  );

  map.push(attributesMap);

  assert(
    attributesMap.to === maskOffs,
    'Gfx attributes table overlaps on gfx mask table.',
  );

  // Parse gfx masktable.
  const masktableParser = new Parser(arrayBuffer.slice(maskOffs));

  const hasMask = masktableParser.getUint8();

  assert(hasMask === 0 || hasMask === 1, 'hasMask is neither 0 nor 1.');

  const masktable = {
    hasMask: !!hasMask,
  };

  if (hasMask === 1) {
    let masktableObj = Array(16).fill([]);
    let mwidth = masktableParser.getUint8();
    for (i = 0; i < 16; i++) {
      masktableObj[i] = Array(8).fill(0);
      let n = 0;
      while (n < mwidth) {
        const loop = masktableParser.getUint8();
        if (loop & 0x80) {
          for (let j = 0; j < (loop & 0x7f); j++) {
            masktableObj[i][n++] = masktableParser.getUint8();
          }
        } else {
          const data = masktableParser.getUint8();
          for (let j = 0; j < (loop & 0x7f); j++) {
            masktableObj[i][n++] = data;
          }
        }
      }
    }

    masktable.masktableObj = masktableObj;

    map.push({
      type: 'masktable',
      from: maskOffs,
      to: maskOffs + masktableParser.pointer,
    });
  } else {
    map.push({
      type: 'masktable',
      from: maskOffs,
      to: maskOffs,
    });
  }

  // @todo Add a check to verify that the mask table doesn't overlap on object images.

  // @todo Check what happens when objectsNum is 0.
  if (objectsNum > 0) {
    map.push(
      {
        type: 'objectImagesOffs',
        from: 0x1c,
        to: 0x1c + objectsNum * 2,
      },
      {
        type: 'objectsOffs',
        from: 0x1c + objectsNum * 2,
        to: 0x1c + objectsNum * 4,
      },
    );
  }

  const objectImagesOffs = [];
  const objectsOffs = [];

  // @todo Set the end of the ArrayBuffer slice.
  const objectImageOffsParser = new Parser(arrayBuffer.slice(0x1c));
  const objectOffsParser = new Parser(arrayBuffer.slice(0x1c + objectsNum * 2));

  for (let j = 0; j < objectsNum; j++) {
    objectImagesOffs.push(objectImageOffsParser.getUint16());
    objectsOffs.push(objectOffsParser.getUint16());
  }

  // Calculate the earliest object offset. Used to discard empty object images.
  const objectImagesStart = Math.min(...objectImagesOffs);
  const objectsStart = Math.min(...objectsOffs);

  // End range values will be set later.
  const objectImageMap = {
    type: 'objectImages',
    from: objectImagesStart,
    to: 0,
  };
  const objectCodeMap = {
    type: 'objects',
    from: objectsStart,
    to: 0,
  };

  for (let j = 0; j < objectsNum; j++) {
    const objectImageOffs = objectImagesOffs[j];
    const objectOffs = objectsOffs[j];

    // @todo Set the end of the ArrayBuffer slice.
    const objectsParser = new Parser(arrayBuffer.slice(objectOffs));
    // @todo Set the end of the ArrayBuffer slice.
    const objectImagesParser = new Parser(arrayBuffer.slice(objectImageOffs));

    // Object content
    const objectSize = objectsParser.getUint16();
    const objUnk1 = objectsParser.getUint8();
    const objUnk2 = objectsParser.getUint8();

    assert(objUnk1 === 0, 'Unknown 1 is not 0.');
    assert(objUnk2 === 0, 'Unknown 2 is not 0.');

    const id = objectsParser.getUint16();
    const objUnk3 = objectsParser.getUint8();

    assert(objUnk3 === 0, 'Unknown 3 is not 0.');

    const objX = objectsParser.getUint8();
    const byte1 = objectsParser.getUint8();
    const objY = byte1 & 0x7f;

    // assert(objX < width, 'Object is outside of room width.');
    // assert(objY < height, 'Object is outside of room height.');

    const objParentState = (byte1 & 0x80 ? 1 : 0) * 8;
    const objWidth = objectsParser.getUint8();
    const objParent = objectsParser.getUint8();
    const objWalkToX = objectsParser.getUint8();
    const objWalkToY = objectsParser.getUint8() & 0x1f;
    const byte2 = objectsParser.getUint8();
    const objActorDir = byte2 & 0x07;
    const objHeight = (byte2 & 0xf8) / 8;

    const objNameOffs = objectsParser.getUint8();

    assert(!(objNameOffs % 2), 'Object name offset is an odd number.');
    assert(objNameOffs >= 16, 'Object name offset is less than 16.');
    assert(objNameOffs < 255, 'Object name offset is more than 255.');

    // Parse object name.
    const objectNameParser = new Parser(
      arrayBuffer.slice(objectOffs + objNameOffs, objectOffs + objectSize),
      characters,
    );

    let objName = '';
    let char = '';

    for (let i = 0; i < objectNameParser.length; i++) {
      char = objectNameParser.getChar();
      if (char === 0x00) {
        break;
      }
      objName += char;
    }

    // Parse object script offsets.
    const objectScriptOffsParser = new Parser(
      arrayBuffer.slice(objectOffs + 0x0f, objectOffs + objectSize),
    );
    const objScripts = [];
    while (objectScriptOffsParser.pointer < objectSize) {
      const verbId = objectScriptOffsParser.getUint8();
      if (verbId === 0) {
        // End of objects scripts (usually beginning of name offset).
        break;
      }
      objScripts.push([verbId, objectScriptOffsParser.getUint8()]);
    }

    // Parse object images.
    let tiles;
    if (objectImageOffs === objectsStart) {
      tiles = null;
    } else {
      tiles = new Array(objHeight);
      for (let i = 0; i < objHeight; i++) {
        tiles[i] = [];
        let n = 0;
        while (n < objWidth) {
          const loop = objectImagesParser.getUint8();
          if (loop & 0x80) {
            for (let j = 0; j < (loop & 0x7f); j++) {
              tiles[i][n++] = objectImagesParser.getUint8();
            }
          } else {
            const data = objectImagesParser.getUint8();
            for (let j = 0; j < (loop & 0x7f); j++) {
              tiles[i][n++] = data;
            }
          }
        }
      }
    }

    // @todo Implement attribute changes and mask tables for object images.

    objectImages.push({ tiles });

    // @fixme This does not account for object scripts.
    if (objectCodeMap.to < objectOffs + objectImagesParser.pointer) {
      objectCodeMap.to = objectOffs + objectImagesParser.pointer;
    }

    // Calculate the number of object script given the value of object name offset.
    const calculatedObjScriptNum = (objNameOffs - 16) / 2;
    assert(
      calculatedObjScriptNum === objScripts.length,
      'Unknown data before object name offset.',
    );

    objects.push({
      size: objectSize,
      objUnk1,
      objUnk2,
      num: id,
      objUnk3,
      x: objX,
      y: objY,
      parent: objParent,
      parentState: objParentState,
      width: objWidth,
      height: objHeight,
      walkToX: objWalkToX,
      walkToY: objWalkToY,
      actorDir: objActorDir,
      nameOffs: objNameOffs,
      name: objName,
      objScripts,
    });
  }

  assert(
    objectImages.length === objects.length,
    'Length of object images and objects do not match.',
  );

  // This is a hack.
  objectImageMap.to = objectCodeMap.from - 1;

  if (objectsNum > 0) {
    map.push(objectCodeMap, objectImageMap);
  }

  // Parse boxes.
  const { boxes, boxesMap } = parseRoomBoxes(
    // @todo Set the end of the ArrayBuffer slice.
    arrayBuffer.slice(boxOffs),
    boxOffs,
  );

  map.push(boxesMap);

  // Parse matrix.
  const { matrixUnks, matrix, matrixMap } = parseRoomMatrix(
    arrayBuffer.slice(
      boxesMap.to,
      boxesMap.to + boxes.length * (boxes.length + 1),
    ),
    boxesMap.to,
    boxes.length,
  );

  map.push(matrixMap);

  // Order ROM map by starting offset.
  map.sort((a, b) => a.from - b.from);

  return {
    metadata,
    header,
    objectImagesOffs,
    objectsOffs,
    boxes,
    matrixUnks,
    matrix,
    nametable,
    attributes,
    masktable,
    objectImages,
    objects,
    hasMask,
    map,
  };
};

export default parseRooms;
