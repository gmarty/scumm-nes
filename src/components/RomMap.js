import RomMapCanvasContainer from '../containers/RomMapCanvasContainer';
import RomMapCaption from './RomMapCaption';

const RomMap = ({ rom, res, resourceList }) => {
  return (
    <div className="space-y-4 md:flex md:gap-5 md:space-y-0 xl:gap-6">
      <RomMapCanvasContainer
        rom={rom}
        res={res}
        resourceList={resourceList}
      />
      <RomMapCaption resourceList={resourceList} />
    </div>
  );
};

export default RomMap;
