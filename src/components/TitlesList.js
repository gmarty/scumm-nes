import ColumnListHeader from './ColumnListHeader';
import ColumnListItem from './ColumnListItem';

const TitlesList = ({ items, currentId }) => {
  return (
    <>
      <ColumnListHeader>Titles</ColumnListHeader>
      {items.map(({ metadata }) => {
        const selected = metadata.id === currentId;
        const path = `/titles/${metadata.id}`;
        const label = `Title ${metadata.id}`;

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

export default TitlesList;
