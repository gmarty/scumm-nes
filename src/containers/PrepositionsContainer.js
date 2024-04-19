import SecondaryColumn from '../components/SecondaryColumn';
import ColumnListHeader from '../components/ColumnListHeader';
import PrepositionsList from '../components/PrepositionsList';
import Main from '../components/Main';
import MainHeader from '../components/MainHeader';
import ResourceMetadata from '../components/ResourceMetadata';

const PrepositionsContainer = ({ preps, lang }) => {
  return (
    <>
      <SecondaryColumn>
        <ColumnListHeader>Prepositions</ColumnListHeader>
        <PrepositionsList
          preps={preps}
          lang={lang}
        />
      </SecondaryColumn>
      <Main>
        <MainHeader title="Prepositions">
          <ResourceMetadata metadata={preps.metadata} />
        </MainHeader>
      </Main>
    </>
  );
};

export default PrepositionsContainer;
