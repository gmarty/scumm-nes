import ScriptCode from './ScriptCode';

const RoomScripts = ({ excdScript, encdScript }) => {
  return (
    <div className="flex flex-col gap-4 md:gap-5 lg:flex-row xl:gap-6">
      <div>
        <h2 className="text-sm">Enter Script</h2>
        <ScriptCode code={encdScript} />
      </div>
      <div>
        <h2 className="text-sm">Exit Script</h2>
        <ScriptCode code={excdScript} />
      </div>
    </div>
  );
};

export default RoomScripts;
