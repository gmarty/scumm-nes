import { getResourceColour } from '../lib/resourceUtils';
import ColourSwatch from './ColourSwatch';

const RomMapCaption = ({ resourceList }) => {
  return (
    <dl className="md:max-w-auto flex w-[512] max-w-full flex-wrap justify-between gap-4 text-xs md:w-auto md:flex-col md:text-sm">
      {resourceList.map((label, i) => (
        <div
          key={i}
          className="flex-no-wrap flex gap-x-2">
          <dt className="h-6">
            <ColourSwatch colour={getResourceColour(i, resourceList.length)} />
          </dt>
          <dd className="first-letter:capitalize">{label}</dd>
        </div>
      ))}
    </dl>
  );
};

export default RomMapCaption;
