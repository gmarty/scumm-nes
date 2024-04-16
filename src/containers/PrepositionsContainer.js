import SecondaryColumn from '../components/SecondaryColumn';
import Main from '../components/Main';
import ColumnListHeader from '../components/ColumnListHeader';
import PrepositionsList from '../components/PrepositionsList';
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
        <h1>Prepositions</h1>
        <ResourceMetadata metadata={preps.metadata} />
      </Main>
    </>
  );
};

export default PrepositionsContainer;
