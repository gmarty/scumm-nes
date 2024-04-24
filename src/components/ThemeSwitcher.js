import { RadioGroup } from '@headlessui/react';
import { clsx } from 'clsx';

const ThemeSwitcher = ({ theme, setTheme, themeOptions }) => {
  return (
    <>
      <h2 className="text-xl font-semibold leading-6 text-slate-700 md:text-2xl dark:text-slate-300">
        Colour theme
      </h2>

      <RadioGroup
        value={theme}
        onChange={setTheme}>
        <RadioGroup.Label className="sr-only">Choose a theme</RadioGroup.Label>
        <div className="flex justify-center gap-4 md:gap-5 xl:gap-6">
          {themeOptions.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) =>
                clsx(
                  active && 'ring-2 ring-primary-600 ring-offset-2',
                  checked
                    ? 'bg-primary-600 text-slate-100 hover:bg-primary-500'
                    : 'bg-slate-200 text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 hover:dark:bg-slate-900',
                  'cursor-pointer focus:outline-none',
                  'flex w-48 max-w-48 flex-initial items-center justify-center rounded-md px-3 py-3 text-sm font-semibold sm:flex-1',
                )
              }>
              <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  );
};

export default ThemeSwitcher;
