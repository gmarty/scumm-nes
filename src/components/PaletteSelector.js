import { RadioGroup } from '@headlessui/react';
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
        onChange={setPalette}>
        <div className="flex flex-wrap justify-center gap-4 md:gap-5 xl:gap-6">
          {paletteOptions.map((palette) => (
            <RadioGroup.Option
              key={palette.name}
              value={palette}
              className={({ active }) =>
                clsx(
                  active
                    ? 'border-primary-600 ring-2 ring-primary-600'
                    : 'border-gray-300 dark:border-gray-700',
                  'relative flex cursor-pointer flex-col gap-4 rounded-lg border bg-slate-200 p-4 text-slate-900 shadow-sm hover:bg-slate-200/50 focus:outline-none dark:bg-slate-800 dark:text-slate-100 hover:dark:bg-slate-800/50',
                )
              }>
              {({ checked, active }) => (
                <>
                  <span className="flex">
                    <span className="flex flex-1">
                      <span className="flex flex-col gap-0">
                        <RadioGroup.Label
                          as="span"
                          className="flex gap-1 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100">
                          {palette.name}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={clsx(
                              palette.experimental ? '' : 'invisible',
                              'size-5 text-gray-500 dark:text-gray-500',
                            )}>
                            <path d="M18.5 15L5.5 15"></path>
                            <path d="M16 4L8 4"></path>
                            <path d="M9 4.5L9 10.2602C9 10.7376 8.82922 11.1992 8.51851 11.5617L3.48149 17.4383C3.17078 17.8008 3 18.2624 3 18.7398V19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19V18.7398C21 18.2624 20.8292 17.8008 20.5185 17.4383L15.4815 11.5617C15.1708 11.1992 15 10.7376 15 10.2602L15 4.5"></path>
                            <path d="M12 9.01L12.01 8.99889"></path>
                            <path d="M11 2.01L11.01 1.99889"></path>
                          </svg>
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="text-sm text-gray-500">
                          {palette.description}
                        </RadioGroup.Description>
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
                  <RadioGroup.Description as="span">
                    <img
                      src={palette.img}
                      className="w-48 rounded"
                      alt={`Preview of a room with palette ${palette.name}.`}
                    />
                  </RadioGroup.Description>
                  <span
                    className={clsx(
                      active ? 'border' : 'border-2',
                      checked ? 'border-primary-600' : 'border-transparent',
                      'pointer-events-none absolute -inset-px rounded-lg',
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  );
};

export default PaletteSelector;
