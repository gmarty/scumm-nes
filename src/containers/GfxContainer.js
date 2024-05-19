import { useMatch, useParams } from 'react-router-dom';
import PrimaryColumn from '../components/PrimaryColumn';
import RoomGfxList from '../components/RoomGfxList';
import TitleGfxList from '../components/TitleGfxList';
import Main from '../components/Main';
import MainHeader from '../components/MainHeader';
import ResourceMetadata from '../components/ResourceMetadata';
import GfxCanvasContainer from './GfxCanvasContainer';

const GfxContainer = ({ roomgfx, titlegfx }) => {
  const isRoomGfx = !!useMatch('/roomgfx/:gfcId');
  const { gfcId } = useParams();

  const currentGfcId =
    typeof gfcId === 'undefined' ? null : parseInt(gfcId, 10);
  const gfc = isRoomGfx ? roomgfx[currentGfcId] : titlegfx[currentGfcId];

  if (!gfc) {
    return null;
  }

  return (
    <>
      <PrimaryColumn>
        <RoomGfxList
          gfx={roomgfx}
          currentId={isRoomGfx ? currentGfcId : null}
        />
        <TitleGfxList
          gfx={titlegfx}
          currentId={isRoomGfx ? null : currentGfcId}
        />
      </PrimaryColumn>
      <Main>
        <MainHeader
          title={
            currentGfcId === null
              ? 'Graphics'
              : isRoomGfx
                ? `Room graphics tileset ${currentGfcId}`
                : `Title graphics tileset ${currentGfcId}`
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
