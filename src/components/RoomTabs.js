import { clsx } from 'clsx';

const RoomTabs = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { name: 'Palettes', current: currentTab === 'Palettes' },
    { name: 'Tilesets', current: currentTab === 'Tilesets' },
    // { name: 'Scripts', current: currentTab === 'Scripts' },
  ];

  return (
    <div>
      <div className="sm:hidden">
        <label
          htmlFor="tabs"
          className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          defaultValue={tabs.find((tab) => tab.current).name}
          onChange={({ target }) => setCurrentTab(target.value)}
          className="block w-full rounded border-slate-300 focus:border-primary-500 focus:ring-primary-500">
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="flex gap-x-4 md:gap-5 xl:gap-6"
          aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setCurrentTab(tab.name)}
              className={clsx(
                tab.current
                  ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  : 'text-slate-500 hover:text-slate-700 hover:dark:text-slate-300',
                'rounded px-3 py-2 text-sm font-medium',
              )}
              aria-current={tab.current ? 'page' : undefined}>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default RoomTabs;
