import { clsx } from 'clsx';
import ColumnListHeader from './ColumnListHeader';
import ColumnListItem from './ColumnListItem';
import { MagnifyingGlassCircleIcon as InspectIcon } from '@heroicons/react/16/solid';

const RoomsObjectList = ({
  objects,
  objectImages,
  hoveredObject,
  setHoveredObject,
  selectedObjects,
  setSelectedObjectState,
  inspectedObject,
  setInspectedObject,
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
            isInspected={inspectedObject === object.id}
            setInspectedObject={setInspectedObject}
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
  isInspected,
  setInspectedObject,
}) => {
  // Trim the final @.
  const name = object.name.replace(/@+$/, '') || 'Unnamed object';
  const namedClass = object.name ? 'first-letter:capitalize' : 'italic';

  const InspectorButton = () => (
    <span className="text-slate-400">
      <InspectIcon
        strokeWidth="1.5"
        className={clsx(
          isInspected
            ? 'text-primary-600'
            : 'opacity-0 hover:text-slate-600 group-hover:opacity-100',
          'size-4 cursor-pointer transition',
        )}
        onClick={() => setInspectedObject(object.id)}
      />
    </span>
  );

  if (!objectImage?.tiles) {
    return (
      <ColumnListItem
        onMouseOver={() => setHoveredObject(object.id)}
        onMouseLeave={() => setHoveredObject(null)}
        className={clsx(
          'group flex justify-between whitespace-nowrap pl-6 leading-4 sm:pl-8 md:pl-9 lg:pl-10 xl:pl-11',
          isHoveredObject && 'bg-slate-300',
        )}>
        <span className={namedClass}>{name}</span>
        <InspectorButton />
      </ColumnListItem>
    );
  }

  return (
    <ColumnListItem
      onMouseOver={() => setHoveredObject(object.id)}
      onMouseLeave={() => setHoveredObject(null)}
      className={clsx(
        'group flex justify-between gap-1 whitespace-nowrap leading-4 sm:gap-2',
        isHoveredObject && 'bg-slate-300',
      )}>
      <label className={clsx('flex cursor-pointer gap-1 sm:gap-2', namedClass)}>
        <input
          type="checkbox"
          checked={isSelectedObject}
          onChange={({ target }) =>
            setSelectedObjectState(object.id, target.checked)
          }
          className="size-4 cursor-pointer rounded border-slate-300 text-primary-600 focus:ring-primary-600"
        />
        {name}
      </label>
      <InspectorButton />
    </ColumnListItem>
  );
};

export default RoomsObjectList;
