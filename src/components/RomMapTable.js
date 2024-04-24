import { formatBytes, formatPercentage } from '../lib/utils';

const RomMapTable = ({ resourceSizes }) => {
  return (
    <section>
      <table className="w-[512] max-w-full table-auto text-xs text-slate-900 md:text-sm dark:text-slate-100">
        <thead>
          <tr className="bg-slate-300 text-sm md:text-base dark:bg-slate-700">
            <th className="px-4 py-1 text-left font-normal">Resource</th>
            <th className="px-4 py-1 text-right font-normal">Size</th>
            <th className="px-4 py-1 text-right font-normal">%</th>
          </tr>
        </thead>
        <tbody>
          {resourceSizes.map(({ label, size, percentage }) => (
            <tr
              key={label}
              className="even:bg-slate-200 even:dark:bg-slate-800">
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
