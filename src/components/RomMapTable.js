import { formatBytes, formatPercentage } from '../lib/utils';

const RomMapTable = ({ resourceSizes }) => {
  return (
    <section>
      <table className="w-[512] max-w-full table-auto text-xs md:text-sm">
        <thead>
          <tr className="bg-slate-500 text-white">
            <th className="px-4 py-1 text-left font-normal">Resource</th>
            <th className="px-4 py-1 text-right font-normal">Size</th>
            <th className="px-4 py-1 text-right font-normal">%</th>
          </tr>
        </thead>
        <tbody>
          {resourceSizes.map(({ label, size, percentage }) => (
            <tr
              key={label}
              className="even:bg-slate-100">
              <td className="px-4 first-letter:capitalize">{label}</td>
              <td className="whitespace-nowrap px-4 py-1 text-right">
                <span className="font-monocode">{formatBytes(size)}</span>
              </td>
              <td className="whitespace-nowrap px-4 py-1 text-right">
                <span className="font-monocode">
                  {formatPercentage(percentage)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default RomMapTable;
