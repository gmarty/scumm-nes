import { clsx } from 'clsx';

const HoveredObjects = ({
  objects,
  hoveredObject,
  toggleObjectState,
  zoom,
}) => {
  return objects.map((object, i) => {
    const width = object.width * 8 * zoom;
    const height = object.height * 8 * zoom;
    const left = object.x * 8 * zoom;
    const top = object.y * 8 * zoom;

    return (
      <div
        key={i}
        onClick={() => toggleObjectState(i)}
        className={clsx(
          'absolute block cursor-pointer hover:border-primary-600/50 hover:bg-primary-600/50',
          hoveredObject === i && 'border-primary-600/50 bg-primary-600/50',
        )}
        style={{ width, height, left, top }}></div>
    );
  });
};

export default HoveredObjects;
