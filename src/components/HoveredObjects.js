import { clsx } from 'clsx';

const HoveredObjects = ({
  objects,
  hoveredObject,
  setHoveredObject,
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
        onMouseOver={() => setHoveredObject(i)}
        onMouseLeave={() => setHoveredObject(null)}
        onClick={() => toggleObjectState(i)}
        className={clsx(
          'absolute cursor-pointer',
          hoveredObject === i && 'bg-primary-600/50',
        )}
        style={{ width, height, left, top }}></div>
    );
  });
};

export default HoveredObjects;
