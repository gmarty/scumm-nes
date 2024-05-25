import { useState, useEffect } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import PrimaryColumn from '../components/PrimaryColumn';
import Main from '../components/Main';
import RoomsList from '../components/RoomsList';
import TitlesList from '../components/TitlesList';
import ScreenCanvasContainer from './ScreenCanvasContainer';
import RoomTabs from '../components/RoomTabs';
import Palettes from '../components/Palettes';
import RoomGfx from '../components/RoomGfx';
import MainHeader from '../components/MainHeader';
import ResourceMetadata from '../components/ResourceMetadata';

const TitlesContainer = ({ rooms, titles }) => {
  const isRoom = !!useMatch('/rooms/:id');
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('Palettes');
  const [title, setTitle] = useState(null);
  const zoom = 2;

  const currentId = typeof id === 'undefined' ? null : parseInt(id, 10);

  useEffect(() => {
    const title = titles[id];

    // Hack: so it has the same shape than rooms.
    title.header = {
      width: title.width,
      height: title.height,
    };

    setTitle(title);
  }, [id, titles]);

  const updatePalette = (i, colourId) => {
    const newScreen = structuredClone(title);
    if (i % 4 === 0) {
      // Keep the first colours in sync.
      for (let i = 0; i < 16; i += 4) {
        newScreen.palette[i] = colourId;
      }
    } else {
      newScreen.palette[i] = colourId;
    }
    setTitle(newScreen);
  };

  if (!title) {
    return null;
  }

  return (
    <>
      <PrimaryColumn>
        <RoomsList
          items={rooms}
          currentId={isRoom ? currentId : null}
        />
        <TitlesList
          items={titles}
          currentId={isRoom ? null : currentId}
        />
      </PrimaryColumn>
      <Main>
        {!title ? (
          <h1>Titles</h1>
        ) : (
          <>
            <MainHeader title={`Title screen ${title.metadata.id}`}>
              <ResourceMetadata metadata={title.metadata} />
            </MainHeader>
            <ScreenCanvasContainer
              screen={title}
              gfc={{ gfx: title.gfx }}
              crop={false}
              zoom={zoom}
            />
            <RoomTabs
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              allowList={['Palettes', 'Tilesets']}
            />
            {currentTab === 'Palettes' && (
              <Palettes
                palette={title.palette}
                onUpdate={updatePalette}
              />
            )}
            {currentTab === 'Tilesets' && (
              <RoomGfx
                baseTiles={{ gfx: [] }}
                tileset={id}
                nametable={title.nametable}
                objectImages={title.objectImages}
                roomgfc={{ gfx: title.gfx }}
                type="title"
              />
            )}
          </>
        )}
      </Main>
    </>
  );
};

export default TitlesContainer;
