import { RadioGroup, Label, Description } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';

const PaletteSelector = ({ palette, paletteOptions, setPalette }) => {
  return (
    <>
      <h2 className="text-xl font-semibold leading-6 text-slate-700 md:text-2xl dark:text-slate-300">
        NES palette
      </h2>

      <RadioGroup
        value={palette}
        onChange={setPalette}
        className="flex flex-wrap gap-4 pl-8 md:gap-5 xl:gap-6">
        {paletteOptions.map((option) => (
          <RadioGroup.Option
            key={option.name}
            value={option}
            className={({ focus, checked }) =>
              clsx(
                'relative flex cursor-pointer flex-col gap-4 rounded-lg border bg-slate-200 p-4 text-slate-900 shadow-sm focus:outline-none dark:bg-slate-800 dark:text-slate-100',
                focus
                  ? 'border-primary-600 ring-2 ring-primary-600'
                  : 'border-slate-300 dark:border-slate-700',
                !checked
                  ? 'hover:bg-slate-200/50 hover:dark:bg-slate-800/50'
                  : '',
              )
            }>
            {({ focus, checked }) => (
              <>
                <span className="flex">
                  <span className="flex flex-1">
                    <span className="flex flex-col gap-0">
                      <Label
                        as="span"
                        className="flex gap-1 text-sm font-medium leading-5 text-slate-900 dark:text-slate-100">
                        {option.name}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={clsx(
                            option.experimental ? '' : 'invisible',
                            'size-5 text-slate-500 dark:text-slate-500',
                          )}>
                          <path d="M18.5 15L5.5 15"></path>
                          <path d="M16 4L8 4"></path>
                          <path d="M9 4.5L9 10.2602C9 10.7376 8.82922 11.1992 8.51851 11.5617L3.48149 17.4383C3.17078 17.8008 3 18.2624 3 18.7398V19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19V18.7398C21 18.2624 20.8292 17.8008 20.5185 17.4383L15.4815 11.5617C15.1708 11.1992 15 10.7376 15 10.2602L15 4.5"></path>
                          <path d="M12 9.01L12.01 8.99889"></path>
                          <path d="M11 2.01L11.01 1.99889"></path>
                        </svg>
                      </Label>
                      <Description
                        as="span"
                        className="text-sm text-slate-500">
                        {option.description}
                      </Description>
                    </span>
                  </span>
                  <CheckCircleIcon
                    className={clsx(
                      !checked ? 'invisible' : '',
                      'size-5 text-primary-600',
                    )}
                    aria-hidden="true"
                  />
                </span>
                <Description as="span">
                  <img
                    src={option.img}
                    className="w-48 rounded"
                    alt={`Preview of a room with palette ${option.name}.`}
                  />
                </Description>
                <span
                  className={clsx(
                    'pointer-events-none absolute -inset-px rounded-lg',
                    focus ? 'border' : 'border-2',
                    checked ? 'border-primary-600' : 'border-transparent',
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </>
  );
};

export default PaletteSelector;
