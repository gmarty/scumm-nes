import ColumnListHeader from './ColumnListHeader';
import ColumnListItem from './ColumnListItem';

const CostumesList = ({ costumes, currentId }) => {
  return (
    <>
      <ColumnListHeader>Costumes</ColumnListHeader>
      {costumes.map(({ metadata }) => {
        const selected = metadata.id === currentId;
        const path = `/costumes/${metadata.id}`;
        const label = `Costume ${metadata.id}`;

        return (
          <ColumnListItem
            key={metadata.id}
            path={selected ? null : path}>
            {label}
          </ColumnListItem>
        );
      })}
    </>
  );
};

export default CostumesList;
