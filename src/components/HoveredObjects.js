import { clsx } from 'clsx';

const HoveredObjects = ({
  width,
  height,
  objects,
  hoveredObject,
  setHoveredObject,
  toggleObjectState,
}) => {
  return objects.map((object, i) => {
    const objWidth = (object.width * 100) / width;
    const objHeight = (object.height * 100) / height;
    const left = (object.x * 100) / width;
    const top = (object.y * 100) / height;

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
        style={{
          width: `${objWidth}%`,
          height: `${objHeight}%`,
          left: `${left}%`,
          top: `${top}%`,
        }}></div>
    );
  });
};

export default HoveredObjects;
