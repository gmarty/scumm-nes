import ColumnListItem from './ColumnListItem';

const RoomGfxList = ({ roomgfx, currentId }) => {
  return roomgfx.map(({ metadata }) => {
    const selected = metadata.id === currentId;
    const path = `/roomgfx/${metadata.id}`;
    const label = `Tileset ${metadata.id}`;

    return (
      <ColumnListItem
        key={metadata.id}
        path={selected ? null : path}>
        {label}
      </ColumnListItem>
    );
  });
};

export default RoomGfxList;
