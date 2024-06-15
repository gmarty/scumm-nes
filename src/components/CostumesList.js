import ColumnListHeader from './ColumnListHeader';
import ColumnListItem from './ColumnListItem';

const CostumesList = ({ costumeSets, currentSetId, currentId }) => {
  return (
    <>
      {costumeSets.map((costumeSet, costumeSetId) => (
        <div key={costumeSetId}>
          <ColumnListHeader>Costume set {costumeSetId}</ColumnListHeader>
          {costumeSet.sprdesc.map((unused, id) => {
            const selected = costumeSetId === currentSetId && id === currentId;
            const path = `/costumes/${costumeSetId}/${id}`;
            const label = `Costume ${id}`;

            return (
              <ColumnListItem
                key={id}
                path={selected ? null : path}>
                {label}
              </ColumnListItem>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default CostumesList;
