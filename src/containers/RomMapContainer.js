import Main from '../components/Main';
import MainHeader from '../components/MainHeader';
import RomMap from '../components/RomMap';
import RomMapTable from '../components/RomMapTable';
import { computeResourceSizes } from '../lib/resourceUtils';

const RESOURCES_NUMBER_IN_GRAPH = 8;

const RomMapContainer = ({ rom, res }) => {
  const resourceSizes = computeResourceSizes(rom, res);
  const resourceList = resourceSizes
    .slice(0, RESOURCES_NUMBER_IN_GRAPH)
    .map(({ label }) => label);

  return (
    <Main>
      <MainHeader title="ROM Map" />
      <RomMap
        rom={rom}
        res={res}
        resourceList={resourceList}
      />
      <RomMapTable resourceSizes={resourceSizes} />
    </Main>
  );
};

export default RomMapContainer;
