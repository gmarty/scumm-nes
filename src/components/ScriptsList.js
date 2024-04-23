import ColumnListHeader from './ColumnListHeader';
import ColumnListItem from './ColumnListItem';

const ScriptsList = ({ scripts, currentId }) => {
  return (
    <>
      <ColumnListHeader>Scripts</ColumnListHeader>
      {scripts
        .sort((a, b) => a.num > b.num)
        .map((script) => {
          const selected = script.metadata.id === currentId;
          const path = `/scripts/${script.metadata.id}`;
          const label = `Script ${script.metadata.id}`;

          return (
            <ColumnListItem
              key={script.metadata.id}
              path={selected ? null : path}>
              {label}
            </ColumnListItem>
          );
        })}
    </>
  );
};

export default ScriptsList;
