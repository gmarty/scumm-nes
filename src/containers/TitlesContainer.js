import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRomDispatch } from '../contexts/RomContext';
import getScreenLabel from '../lib/getScreenLabel';
import PrimaryColumn from '../components/PrimaryColumn';
import Main from '../components/Main';
import ScreenSelector from '../components/ScreenSelector';
import ScreenCanvasContainer from './ScreenCanvasContainer';
import RoomTabs from '../components/RoomTabs';
import Palettes from '../components/Palettes';
import RoomGfx from '../components/RoomGfx';
import MainHeader from '../components/MainHeader';
import ResourceMetadata from '../components/ResourceMetadata';

const TitlesContainer = ({ rooms, titles }) => {
  const dispatch = useRomDispatch();
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
    const newPalette = structuredClone(title.palette);
    if (i % 4 === 0) {
      // Keep the first colours in sync.
      for (let i = 0; i < 16; i += 4) {
        newPalette[i] = colourId;
      }
    } else {
      newPalette[i] = colourId;
    }

    dispatch({
      type: 'changed-palette',
      screenType: 'title',
      id: currentId,
      palette: newPalette,
    });
  };

  if (!title) {
    return null;
  }

  return (
    <>
      <PrimaryColumn>
        <ScreenSelector
          rooms={rooms}
          titles={titles}
        />
      </PrimaryColumn>
      <Main>
        {!title ? (
          <h1>Titles</h1>
        ) : (
          <>
            <MainHeader
              title={getScreenLabel('title', title.metadata.id, true)}>
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
