import Main from '../components/Main';
import MainHeader from '../components/MainHeader';
import RomMap from '../components/RomMap';
import RomMapTable from '../components/RomMapTable';
import { getResourceList } from '../lib/resourceUtils';

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

const computeResourceSizes = (rom, res) => {
  const resourceList = getResourceList();
  const paddingSize = getPaddingSize(rom);
  const romSize = rom.byteLength;
  const entries = [];
  let nonResourceSize = romSize;

  resourceList.forEach((label) => {
    const resource = res[label];
    if (!resource) {
      return;
    }

    const size = resource.reduce((a, b) => a + b[1], 0);
    const percentage = size / romSize;
    entries.push({
      label,
      size,
      percentage,
    });
    nonResourceSize -= size;
  });

  entries.push({
    label: 'padding',
    size: paddingSize,
    percentage: paddingSize / romSize,
  });

  entries.push({
    label: 'other',
    size: nonResourceSize - paddingSize,
    percentage: (nonResourceSize - paddingSize) / romSize,
  });

  entries.sort((a, b) => b.size - a.size);

  return entries;
};

// @todo Exclude the resources here.
const getPaddingSize = (rom) => {
  const view = new DataView(rom);
  let paddingSize = 0;
  for (let j = 0; j < rom.byteLength; j += 4) {
    if (
      view.getUint8(j) === 0xff &&
      view.getUint8(j + 1) === 0xff &&
      view.getUint8(j + 2) === 0xff &&
      view.getUint8(j + 3) === 0xff
    ) {
      paddingSize += 4;
    }
  }
  return paddingSize;
};

export default RomMapContainer;
