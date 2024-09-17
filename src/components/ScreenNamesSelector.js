import { Fragment } from 'react';
import {
  Field,
  Label,
  Description,
  Radio,
  RadioGroup,
} from '@headlessui/react';
import { clsx } from 'clsx';

const ScreenNamesSelector = ({
  screenName,
  screenNameOptions,
  setScreenName,
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold leading-6 text-slate-700 md:text-2xl dark:text-slate-300">
        Resource naming scheme
      </h2>

      <RadioGroup
        value={screenName}
        onChange={setScreenName}
        className="flex flex-col gap-5 pl-8">
        {screenNameOptions.map((option) => (
          <Field
            key={option.value}
            className="flex items-center gap-1">
            <Radio
              value={option}
              as={Fragment}>
              {({ focus, checked }) => (
                <div className="flex outline-none">
                  <div
                    className={clsx(
                      'group flex size-4 cursor-pointer items-center justify-center rounded-full border',
                      focus && 'ring-2 ring-primary-600 ring-offset-1',
                      !checked
                        ? 'bg-slate-200 hover:bg-slate-100 hover:dark:bg-slate-100'
                        : 'bg-primary-600',
                    )}>
                    <span
                      className={clsx(
                        'size-1.5 rounded-full bg-slate-200',
                        !checked ? 'invisible' : 'visible',
                      )}
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <Label
                      as="p"
                      className="font-medium leading-5 text-slate-900 dark:text-slate-100">
                      {option.name}
                    </Label>
                    <Description
                      as="p"
                      className="text-slate-500">
                      {option.description}
                    </Description>
                  </div>
                </div>
              )}
            </Radio>
          </Field>
        ))}
      </RadioGroup>
    </>
  );
};

export default ScreenNamesSelector;
