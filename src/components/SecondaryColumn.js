const SecondaryColumn = ({ children }) => (
  <nav className="shrink-0 overflow-y-auto text-nowrap bg-slate-200 text-xs md:text-sm">
    <ol>{children}</ol>
  </nav>
);

export default SecondaryColumn;
