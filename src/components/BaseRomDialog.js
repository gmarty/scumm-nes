import { Fragment, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import resources from '../lib/resources';

const BASE_ROMS = resources.map(({ metadata: { name } }) => name);
BASE_ROMS.sort();
const defaultValue = 'USA'; // The USA version is the most commonly used base ROM.

const BaseRomDialog = ({ open, setOpen, setBaseRom }) => {
  const [baseRom, setInternalBaseRom] = useState(defaultValue);

  return (
    <Transition
      show={open}
      as={Fragment}>
      <Dialog
        className="relative z-10"
        onClose={() => {}}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-slate-100/75 opacity-100 dark:bg-slate-900/75" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel className="relative transform overflow-hidden rounded-md bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <QuestionMarkCircleIcon
                      className="size-6 text-primary-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 sm:mt-5">
                    <DialogTitle
                      as="h3"
                      className="text-center text-base font-semibold leading-6 text-gray-900">
                      Unrecognised ROM
                    </DialogTitle>
                    <div className="my-2">
                      <p className="text-sm text-gray-500">
                        The ROM you selected could not be identified. If it's a
                        ROM hack, select the version used as its base.
                      </p>
                    </div>
                    <BaseRomSelector setBaseRom={setInternalBaseRom} />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    onClick={() => {
                      setOpen(false);
                      setBaseRom(baseRom);
                    }}>
                    Select base ROM version
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const BaseRomSelector = ({ setBaseRom }) => {
  return (
    <>
      <label
        htmlFor="base-rom"
        className="block text-sm font-medium leading-6 text-gray-900">
        Base ROM version
      </label>
      <select
        id="base-rom"
        name="base-rom"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
        defaultValue={defaultValue}
        onChange={({ target }) => setBaseRom(target.value)}>
        {BASE_ROMS.map((baseRom) => (
          <option key={baseRom}>{baseRom}</option>
        ))}
      </select>
    </>
  );
};

export default BaseRomDialog;
