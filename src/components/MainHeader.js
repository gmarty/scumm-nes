const MainHeader = ({ title, children }) => {
  return (
    <div className="flex flex-col justify-between gap-2 md:gap-4 lg:flex-row">
      {title && (
        <h1 className="order-last whitespace-nowrap text-xl font-semibold text-slate-700 md:text-2xl lg:order-first dark:text-slate-300">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
};

export default MainHeader;
