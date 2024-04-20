import { clsx } from 'clsx';
import ColumnListHeader from './ColumnListHeader';
import ColumnListItem from './ColumnListItem';

const RoomsObjectList = ({
  objects,
  objectImages,
  hoveredObject,
  setHoveredObject,
  selectedObjects,
  setSelectedObjectState,
}) => {
  return (
    <>
      <ColumnListHeader>Objects</ColumnListHeader>
      {objects.map((object, i) => {
        // Trim the final @.
        const name = object.name.replace(/@+$/, '') || 'Unnamed object';
        const namedClass = object.name ? 'first-letter:capitalize' : 'italic';
        const id = `object-${i}`;
        const enabled = selectedObjects[i];

        if (!objectImages[i]?.tiles) {
          return (
            <ColumnListItem
              key={i}
              onMouseOver={() => setHoveredObject(i)}
              onMouseLeave={() => setHoveredObject(null)}
              className={clsx(
                'flex whitespace-nowrap pl-6 leading-4 sm:pl-8 md:pl-9 lg:pl-10 xl:pl-11',
                hoveredObject === i && 'bg-slate-300',
              )}>
              <span className={namedClass}>{name}</span>
            </ColumnListItem>
          );
        }

        return (
          <ColumnListItem
            key={i}
            onMouseOver={() => setHoveredObject(i)}
            onMouseLeave={() => setHoveredObject(null)}
            className={clsx(
              'flex gap-1 whitespace-nowrap leading-4 sm:gap-2',
              hoveredObject === i && 'bg-slate-300',
            )}>
            <input
              type="checkbox"
              id={id}
              checked={enabled}
              onChange={({ target }) =>
                setSelectedObjectState(i, target.checked)
              }
              className="size-4 cursor-pointer rounded border-gray-300 text-primary-600 focus:ring-primary-600"
            />
            <label
              htmlFor={id}
              className={clsx('cursor-pointer', namedClass)}>
              {name}
            </label>
          </ColumnListItem>
        );
      })}
    </>
  );
};

export default RoomsObjectList;
