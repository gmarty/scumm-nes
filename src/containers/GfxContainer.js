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
  const isTitleGfx = !!useMatch('/titlegfx/:id');
  const isCostumeGfx = !!useMatch('/costumegfx/:id');
  const isRoomGfx = !!useMatch('/roomgfx/:id');
  const { id } = useParams();

  const currentId = typeof id === 'undefined' ? null : parseInt(id, 10);
  const gfc = isTitleGfx
    ? titlegfx[currentId]
    : isCostumeGfx
      ? costumegfx[currentId]
      : roomgfx[currentId];

  if (!gfc) {
    return null;
  }

  return (
    <>
      <PrimaryColumn>
        <TitleGfxList
          gfx={titlegfx}
          currentId={isTitleGfx ? currentId : null}
        />
        <CostumeGfxList
          gfx={costumegfx}
          currentId={isCostumeGfx ? currentId : null}
        />
        <RoomGfxList
          gfx={roomgfx}
          currentId={isRoomGfx ? currentId : null}
        />
      </PrimaryColumn>
      <Main>
        <MainHeader
          title={
            currentId === null
              ? 'Graphics'
              : isTitleGfx
                ? `Title graphics tileset ${currentId}`
                : isCostumeGfx
                  ? `Costume graphics tileset ${currentId}`
                  : `Room graphics tileset ${currentId}`
          }>
          {currentId !== null && <ResourceMetadata metadata={gfc.metadata} />}
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
