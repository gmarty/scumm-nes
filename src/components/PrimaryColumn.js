const PrimaryColumn = ({ children }) => (
  <nav className="w-44 shrink-0 overflow-y-auto text-nowrap bg-slate-700 text-xs text-slate-200 sm:w-48 md:w-56 md:text-sm lg:w-60">
    <ol>{children}</ol>
  </nav>
);

export default PrimaryColumn;
