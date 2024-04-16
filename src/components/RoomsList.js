import ColumnListItem from './ColumnListItem';

const RoomsList = ({ rooms, currentRoomId }) => {
  return rooms.map((room) => {
    const selected = room.metadata.id === currentRoomId;
    const path = `/rooms/${room.metadata.id}`;
    const label = `Room ${room.metadata.id}`;

    return (
      <ColumnListItem
        key={room.metadata.id}
        path={selected ? null : path}>
        {label}
      </ColumnListItem>
    );
  });
};

export default RoomsList;
