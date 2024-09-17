import { useState, useEffect } from 'react';
import {
  Popover,
  PopoverButton,
  CloseButton,
  PopoverPanel,
} from '@headlessui/react';
import ColourSwatch from './ColourSwatch';
import { digitalPrimeFbxPalette as colourPalette } from '../lib/palettes';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { clsx } from 'clsx';
import { getLuminosity } from '../lib/paletteUtils';

// ColourPicker uses shades of `neutral` instead of the usual `slate`.
// This is to avoid the frame to visually pollute the colours.

const ColourPicker = ({ colourId, onPick, children }) => {
  const [selectedColour, setSelectedColour] = useState(colourId);

  useEffect(() => {
    setSelectedColour(colourId);
  }, [colourId]);

  return (
    <Popover
      className="relative"
      as="span">
      <PopoverButton className="h-6 w-8">{children}</PopoverButton>
      <PopoverPanel
        anchor={{ to: 'bottom', gap: '0.125rem' }}
        className="rounded bg-neutral-500 drop-shadow">
        <div className="mx-2 flex justify-end">
          <CloseButton
            as="button"
            type="button"
            className="-m-2 rounded-md p-2 text-neutral-300 hover:text-neutral-100 dark:text-neutral-700 hover:dark:text-neutral-900">
            <span className="sr-only">Close menu</span>
            <XMarkIcon
              strokeWidth="2"
              className="size-6"
              aria-hidden="true"
            />
          </CloseButton>
        </div>

        <div className="mx-2 mb-2 grid grid-cols-14">
          {colourPalette.map((c, i) =>
            i % 16 <= 13 ? (
              <ColourSwatch
                key={i}
                colour={c}
                className={clsx(
                  i === selectedColour
                    ? getLuminosity(c) < 127
                      ? 'border-2 !border-neutral-100'
                      : 'border-2 border-neutral-900'
                    : 'rounded-none border-0',
                )}
                onClick={() => {
                  setSelectedColour(i);
                  onPick(i);
                }}
              />
            ) : null,
          )}
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default ColourPicker;
