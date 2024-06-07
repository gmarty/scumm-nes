import PrimaryColumn from '../components/PrimaryColumn';
import PrepositionsList from '../components/PrepositionsList';
import Main from '../components/Main';
import MainHeader from '../components/MainHeader';
import ResourceMetadata from '../components/ResourceMetadata';

const PrepositionsContainer = ({ preps, lang }) => {
  return (
    <>
      <PrimaryColumn>
        <PrepositionsList
          preps={preps}
          lang={lang}
        />
      </PrimaryColumn>

      <Main>
        <MainHeader title="Prepositions">
          <ResourceMetadata metadata={preps.metadata} />
        </MainHeader>
      </Main>
    </>
  );
};

export default PrepositionsContainer;
