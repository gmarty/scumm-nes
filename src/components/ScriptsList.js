import ColumnListHeader from './ColumnListHeader';
import ColumnListItem from './ColumnListItem';

const ScriptsList = ({ scripts, currentId }) => {
  return (
    <>
      <ColumnListHeader>Scripts</ColumnListHeader>
      {scripts
        .sort((a, b) => a.num > b.num)
        .map(({ metadata, code }) => {
          if (code.length == 0) {
            return null;
          }

          const selected = metadata.id === currentId;
          const path = `/scripts/${metadata.id}`;
          const label = `Script ${metadata.id}`;

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

export default ScriptsList;
