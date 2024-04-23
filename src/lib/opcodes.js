const opCodes = {
  0x00: { name: 'stopObjectCode' },
  0x01: { name: 'putActor' },
  0x02: { name: 'startMusic' },
  0x03: { name: 'getActorRoom' },
  /* 04 */
  0x04: { name: 'isGreaterEqual' },
  0x05: { name: 'drawObject' },
  0x06: { name: 'getActorElevation' },
  0x07: { name: 'setState08' },
  /* 08 */
  0x08: { name: 'isNotEqual' },
  0x09: { name: 'faceActor' },
  0x0a: { name: 'assignVarWordIndirect' },
  0x0b: { name: 'setObjPreposition' },
  /* 0C */
  0x0c: { name: 'resourceRoutines' },
  0x0d: { name: 'walkActorToActor' },
  0x0e: { name: 'putActorAtObject' },
  0x0f: { name: 'ifNotState08' },
  /* 10 */
  0x10: { name: 'getObjectOwner' },
  0x11: { name: 'animateActor' },
  0x12: { name: 'panCameraTo' },
  0x13: { name: 'actorOps' },
  /* 14 */
  0x14: { name: 'print' },
  0x15: { name: 'actorFromPos' },
  0x16: { name: 'getRandomNr' },
  0x17: { name: 'clearState02' },
  /* 18 */
  0x18: { name: 'goTo' },
  0x19: { name: 'doSentence' },
  0x1a: { name: 'move' },
  0x1b: { name: 'setBitVar' },
  /* 1C */
  0x1c: { name: 'startSound' },
  0x1d: { name: 'ifClassOfIs' },
  0x1e: { name: 'walkActorTo' },
  0x1f: { name: 'ifState02' },
  /* 20 */
  0x20: { name: 'stopMusic' },
  0x21: { name: 'putActor' },
  0x22: { name: 'saveLoadGame' },
  0x23: { name: 'getActorY' },
  /* 24 */
  0x24: { name: 'loadRoomWithEgo' },
  0x25: { name: 'drawObject' },
  0x26: { name: 'setVarRange' },
  0x27: { name: 'setState04' },
  /* 28 */
  0x28: { name: 'equalZero' },
  0x29: { name: 'setOwnerOf' },
  0x2a: { name: 'addIndirect' },
  0x2b: { name: 'delayVariable' },
  /* 2C */
  0x2c: { name: 'assignVarByte' },
  0x2d: { name: 'putActorInRoom' },
  0x2e: { name: 'delay' },
  0x2f: { name: 'ifNotState04' },
  /* 30 */
  0x30: { name: 'setBoxFlags' },
  0x31: { name: 'getBitVar' },
  0x32: { name: 'setCameraAt' },
  0x33: { name: 'roomOps' },
  /* 34 */
  0x34: { name: 'getDist' },
  0x35: { name: 'findObject' },
  0x36: { name: 'walkActorToObject' },
  0x37: { name: 'setState01' },
  /* 38 */
  0x38: { name: 'isLessEqual' },
  0x39: { name: 'doSentence' },
  0x3a: { name: 'subtract' },
  0x3b: { name: 'waitForActor' },
  /* 3C */
  0x3c: { name: 'stopSound' },
  0x3d: { name: 'setActorElevation' },
  0x3e: { name: 'walkActorTo' },
  0x3f: { name: 'ifNotState01' },
  /* 40 */
  0x40: { name: 'cutscene' },
  0x41: { name: 'putActor' },
  0x42: { name: 'startScript' },
  0x43: { name: 'getActorX' },
  /* 44 */
  0x44: { name: 'isLess' },
  0x45: { name: 'drawObject' },
  0x46: { name: 'increment' },
  0x47: { name: 'clearState08' },
  /* 48 */
  0x48: { name: 'isEqual' },
  0x49: { name: 'faceActor' },
  0x4a: { name: 'chainScript' },
  0x4b: { name: 'setObjPreposition' },
  /* 4C */
  0x4c: { name: 'waitForSentence' },
  0x4d: { name: 'walkActorToActor' },
  0x4e: { name: 'putActorAtObject' },
  0x4f: { name: 'ifState08' },
  /* 50 */
  0x50: { name: 'pickupObject' },
  0x51: { name: 'animateActor' },
  0x52: { name: 'actorFollowCamera' },
  0x53: { name: 'actorOps' },
  /* 54 */
  0x54: { name: 'setObjectName' },
  0x55: { name: 'actorFromPos' },
  0x56: { name: 'getActorMoving' },
  0x57: { name: 'setState02' },
  /* 58 */
  0x58: { name: 'beginOverride' },
  0x59: { name: 'doSentence' },
  0x5a: { name: 'add' },
  0x5b: { name: 'setBitVar' },
  /* 5C */
  0x5c: { name: 'dummy' },
  0x5d: { name: 'ifClassOfIs' },
  0x5e: { name: 'walkActorTo' },
  0x5f: { name: 'ifNotState02' },
  /* 60 */
  0x60: { name: 'cursorCommand' },
  0x61: { name: 'putActor' },
  0x62: { name: 'stopScript' },
  0x63: { name: 'getActorFacing' },
  /* 64 */
  0x64: { name: 'loadRoomWithEgo' },
  0x65: { name: 'drawObject' },
  0x66: { name: 'getClosestObjActor' },
  0x67: { name: 'clearState04' },
  /* 68 */
  0x68: { name: 'isScriptRunning' },
  0x69: { name: 'setOwnerOf' },
  0x6a: { name: 'subIndirect' },
  0x6b: { name: 'dummy' },
  /* 6C */
  0x6c: { name: 'getObjPreposition' },
  0x6d: { name: 'putActorInRoom' },
  0x6e: { name: 'dummy' },
  0x6f: { name: 'ifState04' },
  /* 70 */
  0x70: { name: 'lights' },
  0x71: { name: 'getActorCostume' },
  0x72: { name: 'loadRoom' },
  0x73: { name: 'roomOps' },
  /* 74 */
  0x74: { name: 'getDist' },
  0x75: { name: 'findObject' },
  0x76: { name: 'walkActorToObject' },
  0x77: { name: 'clearState01' },
  /* 78 */
  0x78: { name: 'isGreater' },
  0x79: { name: 'doSentence' },
  0x7a: { name: 'verbOps' },
  0x7b: { name: 'getActorWalkBox' },
  /* 7C */
  0x7c: { name: 'isSoundRunning' },
  0x7d: { name: 'setActorElevation' },
  0x7e: { name: 'walkActorTo' },
  0x7f: { name: 'ifState01' },
  /* 80 */
  0x80: { name: 'breakHere' },
  0x81: { name: 'putActor' },
  0x82: { name: 'startMusic' },
  0x83: { name: 'getActorRoom' },
  /* 84 */
  0x84: { name: 'isGreaterEqual' },
  0x85: { name: 'drawObject' },
  0x86: { name: 'getActorElevation' },
  0x87: { name: 'setState08' },
  /* 88 */
  0x88: { name: 'isNotEqual' },
  0x89: { name: 'faceActor' },
  0x8a: { name: 'assignVarWordIndirect' },
  0x8b: { name: 'setObjPreposition' },
  /* 8C */
  0x8c: { name: 'resourceRoutines' },
  0x8d: { name: 'walkActorToActor' },
  0x8e: { name: 'putActorAtObject' },
  0x8f: { name: 'ifNotState08' },
  /* 90 */
  0x90: { name: 'getObjectOwner' },
  0x91: { name: 'animateActor' },
  0x92: { name: 'panCameraTo' },
  0x93: { name: 'actorOps' },
  /* 94 */
  0x94: { name: 'print' },
  0x95: { name: 'actorFromPos' },
  0x96: { name: 'getRandomNr' },
  0x97: { name: 'clearState02' },
  /* 98 */
  0x98: { name: 'restart' },
  0x99: { name: 'doSentence' },
  0x9a: { name: 'move' },
  0x9b: { name: 'setBitVar' },
  /* 9C */
  0x9c: { name: 'startSound' },
  0x9d: { name: 'ifClassOfIs' },
  0x9e: { name: 'walkActorTo' },
  0x9f: { name: 'ifState02' },
  /* A0 */
  0xa0: { name: 'stopObjectCode' },
  0xa1: { name: 'putActor' },
  0xa2: { name: 'saveLoadGame' },
  0xa3: { name: 'getActorY' },
  /* A4 */
  0xa4: { name: 'loadRoomWithEgo' },
  0xa5: { name: 'drawObject' },
  0xa6: { name: 'setVarRange' },
  0xa7: { name: 'setState04' },
  /* A8 */
  0xa8: { name: 'notEqualZero' },
  0xa9: { name: 'setOwnerOf' },
  0xaa: { name: 'addIndirect' },
  0xab: { name: 'switchCostumeSet' },
  /* AC */
  0xac: { name: 'drawSentence' },
  0xad: { name: 'putActorInRoom' },
  0xae: { name: 'waitForMessage' },
  0xaf: { name: 'ifNotState04' },
  /* B0 */
  0xb0: { name: 'setBoxFlags' },
  0xb1: { name: 'getBitVar' },
  0xb2: { name: 'setCameraAt' },
  0xb3: { name: 'roomOps' },
  /* B4 */
  0xb4: { name: 'getDist' },
  0xb5: { name: 'findObject' },
  0xb6: { name: 'walkActorToObject' },
  0xb7: { name: 'setState01' },
  /* B8 */
  0xb8: { name: 'isLessEqual' },
  0xb9: { name: 'doSentence' },
  0xba: { name: 'subtract' },
  0xbb: { name: 'waitForActor' },
  /* BC */
  0xbc: { name: 'stopSound' },
  0xbd: { name: 'setActorElevation' },
  0xbe: { name: 'walkActorTo' },
  0xbf: { name: 'ifNotState01' },
  /* C0 */
  0xc0: { name: 'endCutscene' },
  0xc1: { name: 'putActor' },
  0xc2: { name: 'startScript' },
  0xc3: { name: 'getActorX' },
  /* C4 */
  0xc4: { name: 'isLess' },
  0xc5: { name: 'drawObject' },
  0xc6: { name: 'decrement' },
  0xc7: { name: 'clearState08' },
  /* C8 */
  0xc8: { name: 'isEqual' },
  0xc9: { name: 'faceActor' },
  0xca: { name: 'chainScript' },
  0xcb: { name: 'setObjPreposition' },
  /* CC */
  0xcc: { name: 'pseudoRoom' },
  0xcd: { name: 'walkActorToActor' },
  0xce: { name: 'putActorAtObject' },
  0xcf: { name: 'ifState08' },
  /* D0 */
  0xd0: { name: 'pickupObject' },
  0xd1: { name: 'animateActor' },
  0xd2: { name: 'actorFollowCamera' },
  0xd3: { name: 'actorOps' },
  /* D4 */
  0xd4: { name: 'setObjectName' },
  0xd5: { name: 'actorFromPos' },
  0xd6: { name: 'getActorMoving' },
  0xd7: { name: 'setState02' },
  /* D8 */
  0xd8: { name: 'printEgo' },
  0xd9: { name: 'doSentence' },
  0xda: { name: 'add' },
  0xdb: { name: 'setBitVar' },
  /* DC */
  0xdc: { name: 'dummy' },
  0xdd: { name: 'ifClassOfIs' },
  0xde: { name: 'walkActorTo' },
  0xdf: { name: 'ifNotState02' },
  /* E0 */
  0xe0: { name: 'cursorCommand' },
  0xe1: { name: 'putActor' },
  0xe2: { name: 'stopScript' },
  0xe3: { name: 'getActorFacing' },
  /* E4 */
  0xe4: { name: 'loadRoomWithEgo' },
  0xe5: { name: 'drawObject' },
  0xe6: { name: 'getClosestObjActor' },
  0xe7: { name: 'clearState04' },
  /* E8 */
  0xe8: { name: 'isScriptRunning' },
  0xe9: { name: 'setOwnerOf' },
  0xea: { name: 'subIndirect' },
  0xeb: { name: 'dummy' },
  /* EC */
  0xec: { name: 'getObjPreposition' },
  0xed: { name: 'putActorInRoom' },
  0xee: { name: 'dummy' },
  0xef: { name: 'ifState04' },
  /* F0 */
  0xf0: { name: 'lights' },
  0xf1: { name: 'getActorCostume' },
  0xf2: { name: 'loadRoom' },
  0xf3: { name: 'roomOps' },
  /* F4 */
  0xf4: { name: 'getDist' },
  0xf5: { name: 'findObject' },
  0xf6: { name: 'walkActorToObject' },
  0xf7: { name: 'clearState01' },
  /* F8 */
  0xf8: { name: 'isGreater' },
  0xf9: { name: 'doSentence' },
  0xfa: { name: 'verbOps' },
  0xfb: { name: 'getActorWalkBox' },
  /* FC */
  0xfc: { name: 'isSoundRunning' },
  0xfd: { name: 'setActorElevation' },
  0xfe: { name: 'walkActorTo' },
  0xff: { name: 'ifState01' },
};

const varNames = [
  /* 0 */
  'VAR_EGO',
  'VAR_RESULT',
  'VAR_CAMERA_POS_X',
  'VAR_HAVE_MSG',
  /* 4 */
  'VAR_ROOM',
  'VAR_OVERRIDE',
  'VAR_MACHINE_SPEED',
  'VAR_CHARCOUNT',
  /* 8 */
  'VAR_ACTIVE_VERB',
  'VAR_ACTIVE_OBJECT1',
  'VAR_ACTIVE_OBJECT2',
  'VAR_NUM_ACTOR',
  /* 12 */
  'VAR_CURRENT_LIGHTS',
  'VAR_CURRENTDRIVE',
  null,
  null,
  /* 16 */
  null,
  'VAR_MUSIC_TIMER',
  'VAR_VERB_ALLOWED',
  'VAR_ACTOR_RANGE_MIN',
  /* 20 */
  'VAR_ACTOR_RANGE_MAX',
  null,
  null,
  'VAR_CAMERA_MIN_X',
  /* 24 */
  'VAR_CAMERA_MAX_X',
  'VAR_TIMER_NEXT',
  'VAR_SENTENCE_VERB',
  'VAR_SENTENCE_OBJECT1',
  /* 28 */
  'VAR_SENTENCE_OBJECT2',
  'VAR_SENTENCE_PREPOSITION',
  'VAR_VIRT_MOUSE_X',
  'VAR_VIRT_MOUSE_Y',
  /* 32 */
  'VAR_CLICK_AREA',
  'VAR_CLICK_VERB',
  null,
  'VAR_CLICK_OBJECT',
  /* 36 */
  'VAR_ROOM_RESOURCE',
  'VAR_LAST_SOUND',
  'VAR_BACKUP_VERB',
  'VAR_KEYPRESS',
  /* 40 */
  'VAR_CUTSCENEEXIT_KEY',
  'VAR_TALK_ACTOR',
  null,
  null,
];

const verbs = {
  0x01: 'Open',
  0x02: 'Close',
  0x03: 'Give',
  0x04: 'Turn On',
  0x05: 'Turn Off',
  0x06: 'Fix',
  0x07: 'New Kid',
  0x08: undefined,
  0x09: 'Push',
  0x0a: 'Pull',
  0x0b: 'Use',
  0x0c: 'Read',
  0x0d: 'Go To',
  0x0e: 'Get',
  0x0f: undefined,
};

export { opCodes, varNames, verbs };
