import { useMatch, useParams } from 'react-router-dom';
import PrimaryColumn from '../components/PrimaryColumn';
import TitleGfxList from '../components/TitleGfxList';
import CostumeGfxList from '../components/CostumeGfxList';
import RoomGfxList from '../components/RoomGfxList';
import Main from '../components/Main';
import MainHeader from '../components/MainHeader';
import ResourceMetadata from '../components/ResourceMetadata';
import GfxCanvasContainer from './GfxCanvasContainer';

const GfxContainer = ({ titlegfx, costumegfx, roomgfx }) => {
  const isTitleGfx = !!useMatch('/titlegfx/:gfcId');
  const isCostumeGfx = !!useMatch('/costumegfx/:gfcId');
  const isRoomGfx = !!useMatch('/roomgfx/:gfcId');
  const { gfcId } = useParams();

  const currentGfcId =
    typeof gfcId === 'undefined' ? null : parseInt(gfcId, 10);
  const gfc = isTitleGfx
    ? titlegfx[currentGfcId]
    : isCostumeGfx
      ? costumegfx[currentGfcId]
      : roomgfx[currentGfcId];

  if (!gfc) {
    return null;
  }

  return (
    <>
      <PrimaryColumn>
        <TitleGfxList
          gfx={titlegfx}
          currentId={isTitleGfx ? currentGfcId : null}
        />
        <CostumeGfxList
          gfx={costumegfx}
          currentId={isCostumeGfx ? currentGfcId : null}
        />
        <RoomGfxList
          gfx={roomgfx}
          currentId={isRoomGfx ? currentGfcId : null}
        />
      </PrimaryColumn>
      <Main>
        <MainHeader
          title={
            currentGfcId === null
              ? 'Graphics'
              : isTitleGfx
                ? `Title graphics tileset ${currentGfcId}`
                : isCostumeGfx
                  ? `Costume graphics tileset ${currentGfcId}`
                  : `Room graphics tileset ${currentGfcId}`
          }>
          {currentGfcId !== null && (
            <ResourceMetadata metadata={gfc.metadata} />
          )}
        </MainHeader>
        <GfxCanvasContainer
          gfx={gfc.gfx}
          zoom={3}
        />
      </Main>
    </>
  );
};

export default GfxContainer;
