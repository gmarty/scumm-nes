import { clsx } from 'clsx';

const ColumnListHeader = ({ className, children, ...props }) => {
  return (
    <li
      className={clsx(
        'bg-slate-900/60 px-1 py-1 text-center text-slate-100 sm:px-2 md:px-3 lg:px-4 xl:px-5',
        className,
      )}
      {...props}>
      <h2>{children}</h2>
    </li>
  );
};

export default ColumnListHeader;
