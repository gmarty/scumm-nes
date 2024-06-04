import ColumnListHeader from './ColumnListHeader';
import ColumnListItem from './ColumnListItem';

const CostumeGfxList = ({ gfx, currentId }) => {
  return (
    <>
      <ColumnListHeader>Costume gfx</ColumnListHeader>
      {gfx.map(({ metadata }) => {
        const selected = metadata.id === currentId;
        const path = `/costumegfx/${metadata.id}`;
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

export default CostumeGfxList;
