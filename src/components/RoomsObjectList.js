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
  // Objects can be deeply nested (3 levels in room 9).
  // This rendering function is recursive.
  const renderRoomObjects = (parentObjects) => {
    return parentObjects.map((object) => {
      const childObjects = objects.filter(
        ({ parent }) => parent === object.id + 1,
      );

      return (
        <div key={object.id}>
          <RoomObject
            object={object}
            objectImage={objectImages[object.id]}
            isHoveredObject={hoveredObject === object.id}
            setHoveredObject={setHoveredObject}
            isSelectedObject={selectedObjects[object.id]}
            setSelectedObjectState={setSelectedObjectState}
          />
          {childObjects && (
            <ol className="bg-slate-200 pl-6">
              {renderRoomObjects(childObjects)}
            </ol>
          )}
        </div>
      );
    });
  };

  const parentObjects = objects.filter(({ parent }) => parent === 0);

  return (
    <>
      <ColumnListHeader>Objects</ColumnListHeader>
      {renderRoomObjects(parentObjects)}
    </>
  );
};

const RoomObject = ({
  object,
  objectImage,
  isHoveredObject,
  setHoveredObject,
  isSelectedObject,
  setSelectedObjectState,
}) => {
  // Trim the final @.
  const name = object.name.replace(/@+$/, '') || 'Unnamed object';
  const namedClass = object.name ? 'first-letter:capitalize' : 'italic';
  const id = `object-${object.id}`;

  if (!objectImage?.tiles) {
    return (
      <ColumnListItem
        onMouseOver={() => setHoveredObject(object.id)}
        onMouseLeave={() => setHoveredObject(null)}
        className={clsx(
          'flex whitespace-nowrap pl-6 leading-4 sm:pl-8 md:pl-9 lg:pl-10 xl:pl-11',
          isHoveredObject && 'bg-slate-300',
        )}>
        <span className={namedClass}>{name}</span>
      </ColumnListItem>
    );
  }

  return (
    <ColumnListItem
      onMouseOver={() => setHoveredObject(object.id)}
      onMouseLeave={() => setHoveredObject(null)}
      className={clsx(
        'flex gap-1 whitespace-nowrap leading-4 sm:gap-2',
        isHoveredObject && 'bg-slate-300',
      )}>
      <input
        type="checkbox"
        id={id}
        checked={isSelectedObject}
        onChange={({ target }) =>
          setSelectedObjectState(object.id, target.checked)
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
};

export default RoomsObjectList;
