const MainHeader = ({ title, children }) => {
  return (
    <div className="flex justify-between gap-4">
      {title && (
        <h1 className="whitespace-nowrap text-2xl font-semibold text-slate-700">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
};

export default MainHeader;
