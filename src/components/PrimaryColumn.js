const PrimaryColumn = ({ children }) => (
  <nav className="shrink-0 overflow-y-auto text-nowrap bg-slate-700 text-xs text-slate-200 md:text-sm">
    <ol>{children}</ol>
  </nav>
);

export default PrimaryColumn;
