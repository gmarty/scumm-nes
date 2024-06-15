import { useParams } from 'react-router-dom';
import PrimaryColumn from '../components/PrimaryColumn';
import CostumesList from '../components/CostumesList';
import Main from '../components/Main';
import MainHeader from '../components/MainHeader';
import ResourceMetadata from '../components/ResourceMetadata';
import CostumeCanvasContainer from './CostumeCanvasContainer';
import { hex } from '../lib/utils';

// @todo Parse it from 3DAED-3DB05 instead of hardcoding.
// prettier-ignore
const costumeIdLookupTable = [
  0x00, 0x03, 0x01, 0x06, 0x08,
  0x02, 0x00, 0x07, 0x0c, 0x04,
  0x09, 0x0a, 0x12, 0x0b, 0x14,
  0x0d, 0x11, 0x0f, 0x0e, 0x10,
  0x17, 0x00, 0x01, 0x05, 0x16,
];

const CostumesContainer = ({
  costumegfx,
  costumes,
  sprpals,
  sprdesc,
  sproffs,
  sprlens,
  sprdata,
}) => {
  const { id } = useParams();

  const currentId = typeof id === 'undefined' ? null : parseInt(id, 10);
  const costume =
    costumes.find(({ metadata }) => metadata.id === currentId) || null;

  const getFramesNumbersFromCostumeId = (id) => {
    if (id === sprdesc[0].sprdesc.length - 1) {
      return sprdesc[0].sprdesc.length - id + 1;
    }

    return sprdesc[0].sprdesc[id + 1] - sprdesc[0].sprdesc[id];
  };

  const frameNum = getFramesNumbersFromCostumeId(
    costumeIdLookupTable[currentId],
  );

  //console.log('costumegfx', costumegfx);
  // console.log('costumes', costumes);
  //console.log('sprpals', sprpals);
  // console.log(
  //   'sprdesc',
  //   sprdesc[0].sprdesc.map((v) => hex(v, 4)),
  // );
  // console.log(
  //   'sproffs',
  //   sproffs[0].sproffs.map((v) => hex(v, 4)),
  // );
  // console.log('sprlens', sprlens[0].sprlens);
  // console.log('sprdata', sprdata[0].sprdata);
  // console.log('frameNum', frameNum);

  //console.log('costume', costume);

  if (!costume) {
    return null;
  }

  return (
    <>
      <PrimaryColumn>
        <CostumesList
          costumes={costumes}
          currentId={currentId}
        />
      </PrimaryColumn>

      <Main>
        <MainHeader title={`Costume ${currentId + 1}`}>
          <ResourceMetadata metadata={costume.metadata} />
        </MainHeader>
        <div>
          <div className="flex flex-row gap-4">
            {Array(frameNum)
              .fill()
              .map((unused, frame) => (
                <div key={frame}>
                  <CostumeCanvasContainer
                    id={costumeIdLookupTable[currentId]}
                    frame={frame}
                    gfx={costumegfx[0]}
                    sprdesc={sprdesc[0].sprdesc}
                    sproffs={sproffs[0].sproffs}
                    sprlens={sprlens[0].sprlens}
                    sprdata={sprdata[0].sprdata}
                    sprpals={sprpals[0]}
                    zoom={2}
                  />
                </div>
              ))}
          </div>
        </div>
      </Main>
    </>
  );
};

export default CostumesContainer;
