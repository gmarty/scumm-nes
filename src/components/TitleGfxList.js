import ColumnListHeader from './ColumnListHeader';
import ColumnListItem from './ColumnListItem';

const TitleGfxList = ({ gfx, currentId }) => {
  return (
    <>
      <ColumnListHeader>Title gfx</ColumnListHeader>
      {gfx.map(({ metadata }) => {
        const selected = metadata.id === currentId;
        const path = `/titlegfx/${metadata.id}`;
        const label = `Tileset ${metadata.id}`;

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

export default TitleGfxList;
