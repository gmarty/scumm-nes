import { useParams } from 'react-router-dom';
import PrimaryColumn from '../components/PrimaryColumn';
import CostumesList from '../components/CostumesList';
import Main from '../components/Main';
import MainHeader from '../components/MainHeader';
import ResourceMetadata from '../components/ResourceMetadata';
import CostumeCanvasContainer from './CostumeCanvasContainer';
import { hex } from '../lib/utils';

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

  //console.log('costumegfx', costumegfx);
  console.log('costumes', costumes);
  //console.log('sprpals', sprpals);
  console.log('sprdesc', sprdesc[0].sprdesc.map((v) => hex(v, 4)));
  console.log('sproffs', sproffs[0].sproffs.map((v) => hex(v, 4)));
  console.log('sprlens', sprlens[0].sprlens);
  console.log('sprdata', sprdata[0].sprdata);

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
        <MainHeader title={`Costumes`}>
          <ResourceMetadata metadata={costume.metadata} />
        </MainHeader>
        {costume.costumes.map((costume, i) => (
          <div key={i}>
            <h2>{`Costume ${i+1}`}</h2>
            <div className="flex flex-row gap-4">
              {costume.map((frame, j) => (
                <div key={j}>
                  <h3 class="text-xs">{`Frame ${j}`}</h3>
                  <CostumeCanvasContainer
                    cIndex={i}
                    frame={j}
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
        ))}
      </Main>
    </>
  );
};

export default CostumesContainer;
