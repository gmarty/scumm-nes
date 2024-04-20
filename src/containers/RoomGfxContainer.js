import { useParams } from 'react-router-dom';
import PrimaryColumn from '../components/PrimaryColumn';
import RoomGfxList from '../components/RoomGfxList';
import Main from '../components/Main';
import MainHeader from '../components/MainHeader';
import ResourceMetadata from '../components/ResourceMetadata';
import GfxCanvasContainer from './GfxCanvasContainer';

const RoomGfxContainer = ({ roomgfx }) => {
  const { gfcId } = useParams();

  const currentGfcId =
    typeof gfcId === 'undefined' ? null : parseInt(gfcId, 10);
  const roomgfc = roomgfx[currentGfcId];

  if (!roomgfc) {
    return null;
  }

  return (
    <>
      <PrimaryColumn>
        <RoomGfxList
          roomgfx={roomgfx}
          currentId={currentGfcId}
        />
      </PrimaryColumn>
      <Main>
        <MainHeader
          title={
            currentGfcId === null
              ? 'Room graphics'
              : `Room graphics tileset ${currentGfcId}`
          }>
          {currentGfcId !== null && (
            <ResourceMetadata metadata={roomgfc.metadata} />
          )}
        </MainHeader>
        <GfxCanvasContainer
          gfx={roomgfc.gfx}
          zoom={3}
        />
      </Main>
    </>
  );
};

export default RoomGfxContainer;
