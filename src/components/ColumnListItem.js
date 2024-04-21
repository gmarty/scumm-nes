import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

const ColumnListItem = ({ path, selected, className, children, ...props }) => {
  return !path ? (
    <li
      className={clsx(
        'bg-slate-200 px-1 py-1 text-slate-700 sm:px-2 md:px-3 lg:px-4 xl:px-5',
        className,
      )}
      {...props}>
      {children}
    </li>
  ) : (
    <li
      className={clsx(
        'py-1 hover:bg-slate-600 hover:text-slate-100',
        className,
      )}
      {...props}>
      <Link
        className="px-1 py-1 sm:px-2 md:px-3 lg:px-4 xl:px-5"
        to={path}>
        {children}
      </Link>
    </li>
  );
};

export default ColumnListItem;
