import ColumnListHeader from './ColumnListHeader';
import ColumnListItem from './ColumnListItem';

const RoomsBoxList = ({ boxes, setHoveredBox }) => {
  return (
    <>
      <ColumnListHeader>Boxes</ColumnListHeader>
      {boxes.map((box, i) => {
        return (
          <ColumnListItem
            key={i}
            onMouseOver={() => setHoveredBox(i)}
            onMouseLeave={() => setHoveredBox(null)}
            className="whitespace-nowrap pl-6 leading-4 hover:bg-slate-300 sm:pl-8 md:pl-9 lg:pl-10 xl:pl-11">
            Box {i + 1}
          </ColumnListItem>
        );
      })}
    </>
  );
};

export default RoomsBoxList;
