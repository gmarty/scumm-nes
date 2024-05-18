import { clsx } from 'clsx';

const ColourSwatch = ({ colour, className, ...props }) => (
  <span
    {...props}
    className={clsx(
      'inline-block h-6 w-8 rounded border border-neutral-500',
      className,
    )}
    style={{ backgroundColor: colour }}
  />
);

export default ColourSwatch;
