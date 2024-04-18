const ColourSwatch = ({ colour }) => (
  <span
    className="inline-block h-6 w-8 rounded border border-gray-700"
    style={{ backgroundColor: colour }}
  />
);

export default ColourSwatch;
