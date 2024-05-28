import ScriptCode from './ScriptCode';

const RoomObjectProperties = ({ object }) => {
  if (!object) {
    return (
      <div className="text-xs">Click the inspect icon next to an object.</div>
    );
  }

  return (
    <div className="text-xs">
      <h2 className="text-sm">Properties</h2>

      <div>
        <span>ID: </span>
        <span>{object.id}</span>
      </div>
      <div>
        <span>Position: </span>
        <span>
          {object.x}, {object.y}
        </span>
      </div>
      <div>
        <span>Dimension: </span>
        <span>
          {object.width} x {object.height}
        </span>
      </div>

      {object?.scripts?.length > 0 && <h2 className="pt-4 text-sm">Scripts</h2>}

      {object?.scripts?.map(([verb, code]) => (
        <div key={verb}>
          <h3>{verb}</h3>
          <ScriptCode code={code} />
        </div>
      ))}
    </div>
  );
};

export default RoomObjectProperties;
