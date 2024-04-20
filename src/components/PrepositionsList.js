import ColumnListHeader from './ColumnListHeader';
import ColumnListItem from './ColumnListItem';

const PrepositionsList = ({ preps, lang }) => {
  return (
    <>
      <ColumnListHeader>Prepositions</ColumnListHeader>
      {preps.preps.map((prep, id) => (
        <ColumnListItem
          key={id}
          lang={lang}>
          <q>{prep}</q>
        </ColumnListItem>
      ))}
    </>
  );
};

export default PrepositionsList;
