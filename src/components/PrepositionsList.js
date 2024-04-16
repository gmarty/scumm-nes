import ColumnListItem from './ColumnListItem';

const PrepositionsList = ({ preps, lang }) => {
  return preps.preps.map((prep, id) => {
    const label = prep;

    return (
      <ColumnListItem
        key={id}
        lang={lang}>
        <q>{label}</q>
      </ColumnListItem>
    );
  });
};

export default PrepositionsList;
