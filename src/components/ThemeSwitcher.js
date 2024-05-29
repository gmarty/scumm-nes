import { RadioGroup, Label } from '@headlessui/react';
import { clsx } from 'clsx';

const ThemeSwitcher = ({ theme, setTheme, themeOptions }) => {
  return (
    <>
      <h2 className="text-xl font-semibold leading-6 text-slate-700 md:text-2xl dark:text-slate-300">
        Colour theme
      </h2>

      <RadioGroup
        value={theme}
        onChange={setTheme}
        className="flex gap-4 pl-8 md:gap-5 xl:gap-6">
        {themeOptions.map((option) => (
          <RadioGroup.Option
            key={option.name}
            value={option}
            className={({ focus, checked }) =>
              clsx(
                'cursor-pointer focus:outline-none',
                'flex w-48 max-w-48 flex-initial items-center justify-center rounded-md px-3 py-3 text-sm font-medium sm:flex-1',
                focus && 'ring-2 ring-primary-600 ring-offset-2',
                checked
                  ? 'bg-primary-600 text-slate-100'
                  : 'bg-slate-200 text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-200/50 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 hover:dark:bg-slate-800/50',
              )
            }>
            <Label as="span">{option.name}</Label>
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </>
  );
};

export default ThemeSwitcher;
