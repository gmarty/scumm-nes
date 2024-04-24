const MainHeader = ({ title, children }) => {
  return (
    <div className="flex justify-between gap-4">
      {title && (
        <h1 className="whitespace-nowrap text-2xl font-semibold text-slate-700 md:text-3xl dark:text-slate-300">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
};

export default MainHeader;
