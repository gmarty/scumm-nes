import ScriptCode from './ScriptCode';

const RoomScripts = ({ excdScript, encdScript }) => {
  return (
    <div className="flex gap-4 md:gap-5 xl:gap-6">
      <div>
        <h2>Enter Script</h2>
        <div>
          <ScriptCode code={encdScript} />
        </div>
      </div>
      <div>
        <h2>Exit Script</h2>
        <div>
          <ScriptCode code={excdScript} />
        </div>
      </div>
    </div>
  );
};

export default RoomScripts;
