import { useParams } from 'react-router-dom';
import PrimaryColumn from '../components/PrimaryColumn';
import CostumesList from '../components/CostumesList';
import Main from '../components/Main';
import MainHeader from '../components/MainHeader';
import ResourceMetadata from '../components/ResourceMetadata';
import CostumeCanvasContainer from './CostumeCanvasContainer';

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
  const { setId, id } = useParams();

  const currentSetId =
    typeof setId === 'undefined' ? null : parseInt(setId, 10);
  const currentId = typeof id === 'undefined' ? null : parseInt(id, 10);
  // Used for the side navbar:
  // * Costume set 0 has 25 costumes (hardcoded value?).
  // * Costume set 1 has as many costumes as entries in the corresponding sprdesc.
  const costumeSets = [
    Array(costumeIdLookupTable.length).fill(0),
    sprdesc[1].sprdesc,
  ];
  const costume =
    costumes.find(({ metadata }) => metadata.id === currentId) || null;
  const costumeId =
    currentSetId === 0 ? costumeIdLookupTable[currentId] : currentId;

  const getFramesNumbersFromCostumeId = (costumeId = 0) => {
    if (costumeId === sprdesc[currentSetId].sprdesc.length - 1) {
      // @todo Find a better way than hardcoding it.
      return currentSetId === 0 ? 2 : 1;
    }

    return (
      sprdesc[currentSetId].sprdesc[costumeId + 1] -
      sprdesc[currentSetId].sprdesc[costumeId]
    );
  };

  const frameNum = getFramesNumbersFromCostumeId(costumeId);

  if (!costume) {
    return null;
  }

  return (
    <>
      <PrimaryColumn>
        <CostumesList
          costumeSets={costumeSets}
          currentSetId={currentSetId}
          currentId={currentId}
        />
      </PrimaryColumn>

      <Main>
        <MainHeader title={`Costume ${currentId}`}>
          <ResourceMetadata metadata={costume.metadata} />
        </MainHeader>
        {currentSetId === 0 ? (
          <div className="space-y-4">
            {costume.costumes.map((animation, i) => (
              <div key={i}>
                <h2 className="mb-1 text-sm font-semibold text-slate-700 md:text-base dark:text-slate-300">
                  Animation {i}
                </h2>
                <div className="flex flex-row flex-wrap gap-4">
                  {animation.map((frame, key) => (
                    <CostumeCanvasContainer
                      key={key}
                      id={costumeId}
                      frame={frame}
                      gfx={costumegfx[currentSetId]}
                      sprdesc={sprdesc[currentSetId].sprdesc}
                      sproffs={sproffs[currentSetId].sproffs}
                      sprlens={sprlens[currentSetId].sprlens}
                      sprdata={sprdata[currentSetId].sprdata}
                      sprpals={sprpals[currentSetId]}
                      zoom={2}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-row flex-wrap gap-4">
            {Array(frameNum)
              .fill()
              .map((unused, frame) => (
                <CostumeCanvasContainer
                  key={frame}
                  id={costumeId}
                  frame={frame}
                  gfx={costumegfx[currentSetId]}
                  sprdesc={sprdesc[currentSetId].sprdesc}
                  sproffs={sproffs[currentSetId].sproffs}
                  sprlens={sprlens[currentSetId].sprlens}
                  sprdata={sprdata[currentSetId].sprdata}
                  sprpals={sprpals[currentSetId]}
                  zoom={2}
                />
              ))}
          </div>
        )}
      </Main>
    </>
  );
};

export default CostumesContainer;
