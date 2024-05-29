import { useLocation, useNavigate } from 'react-router-dom';
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';
import getScreenLabel from '../lib/getScreenLabel';

const getScreenNameFromPathname = (pathname) => {
  const id = pathname.split('/').pop();
  const screenType = pathname.startsWith('/rooms/') ? 'room' : 'title';
  return getScreenLabel(screenType, id);
};

const ScreenSelector = ({ rooms, titles }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Listbox
      value={pathname}
      onChange={(pathname) => navigate(pathname)}
      className="sticky top-0 bg-slate-900/60 py-1"
      as="div">
      {({ open }) => (
        <div className="relative mx-1">
          <Label className="block px-1 font-medium leading-6 text-slate-100 sm:px-2 md:px-3 lg:px-4">
            <h2>Screen selector</h2>
          </Label>
          <ListboxButton className="relative w-full cursor-default rounded bg-slate-100 py-1.5 pl-3 pr-10 text-left text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700">
            <span className="block truncate">
              {getScreenNameFromPathname(pathname)}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="size-5 text-slate-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <Transition
            show={open}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <ListboxOption
                disabled
                className="relative block cursor-default select-none truncate py-2 pl-3 pr-9 font-semibold text-slate-900">
                Title screens
              </ListboxOption>
              {titles.map(({ metadata }) => (
                <ListboxOption
                  key={metadata.id}
                  className={({ focus }) =>
                    clsx(
                      focus ? 'bg-primary-600 text-white' : '',
                      !focus ? 'text-slate-900' : '',
                      'relative cursor-default select-none py-2 pl-6 pr-9',
                    )
                  }
                  value={`/titles/${metadata.id}`}>
                  {({ selected, focus }) => (
                    <>
                      <span
                        className={clsx(
                          selected ? 'font-semibold' : 'font-normal',
                          'block truncate',
                        )}>
                        {getScreenLabel('title', metadata.id)}
                      </span>

                      {selected ? (
                        <span
                          className={clsx(
                            focus ? 'text-white' : 'text-primary-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                          )}>
                          <CheckIcon
                            className="size-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}

              <ListboxOption
                disabled
                className="relative block cursor-default select-none truncate py-2 pl-3 pr-9 font-semibold text-slate-900">
                Rooms
              </ListboxOption>
              {rooms
                .filter(({ header }) => header) // Some rooms are empty.
                .map(({ metadata }) => (
                  <ListboxOption
                    key={metadata.id}
                    className={({ focus }) =>
                      clsx(
                        focus ? 'bg-primary-600 text-white' : '',
                        !focus ? 'text-slate-900' : '',
                        'relative cursor-default select-none py-2 pl-6 pr-9',
                      )
                    }
                    value={`/rooms/${metadata.id}`}>
                    {({ selected, focus }) => (
                      <>
                        <span
                          className={clsx(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}>
                          {getScreenLabel('room', metadata.id)}
                        </span>

                        {selected ? (
                          <span
                            className={clsx(
                              focus ? 'text-white' : 'text-primary-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}>
                            <CheckIcon
                              className="size-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default ScreenSelector;
