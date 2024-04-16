import { clsx } from 'clsx';
import ColumnListItem from './ColumnListItem';

const RoomsObjectList = ({
  objects,
  objectImages,
  setHoveredObject,
  selectedObjects,
  setSelectedObjectState,
}) => {
  return objects.map((object, i) => {
    // Trim the final @.
    const name = object.name.replace(/@+$/, '') || 'Unnamed object';
    const namedClass = object.name
      ? 'first-letter:capitalize'
      : 'italic text-slate-500';
    const id = `object-${i}`;
    const enabled = selectedObjects[i];

    if (!objectImages[i]?.tiles) {
      return (
        <ColumnListItem
          key={i}
          className="ml-5 flex whitespace-nowrap leading-4 md:ml-6"
          onMouseOver={() => setHoveredObject(i)}
          onMouseLeave={() => setHoveredObject(null)}>
          <span className={namedClass}>{name}</span>
        </ColumnListItem>
      );
    }

    return (
      <ColumnListItem
        key={i}
        className="flex gap-1 whitespace-nowrap leading-4 sm:gap-2"
        onMouseOver={() => setHoveredObject(i)}
        onMouseLeave={() => setHoveredObject(null)}>
        <input
          type="checkbox"
          id={id}
          checked={enabled}
          onChange={({ target }) => setSelectedObjectState(i, target.checked)}
          className="size-4 cursor-pointer rounded border-gray-300 text-primary-600 focus:ring-primary-600"
        />
        <label
          for={id}
          className={clsx('cursor-pointer', namedClass)}>
          {name}
        </label>
      </ColumnListItem>
    );
  });
};

export default RoomsObjectList;
