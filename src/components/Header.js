import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import DownloadRom from './DownloadRom';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {
  ArrowDownTrayIcon,
  Cog8ToothIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import meteor from '../assets/meteor.png';

const navigation = [
  { name: 'Screens', href: '/rooms/1' },
  { name: 'Costumes', href: '/costumes/0' },
  { name: 'Gfx', href: '/roomgfx/0' },
  { name: 'Scripts', href: '/scripts/1' },
  { name: 'Prepositions', href: '/preps' },
  { name: 'ROM map', href: '/rom-map' },
  { name: 'Settings', href: '/settings', sideBarOnly: true },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-slate-200 dark:bg-black">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 md:px-4"
        aria-label="Global">
        <div className="flex md:flex-1">
          <span className="sr-only">SCUMM-NES</span>
          <img
            className="h-6 w-auto"
            src={meteor}
            alt="Maniac Mansion meteor"
          />
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:text-slate-800 hover:dark:text-slate-200"
            onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              strokeWidth="2"
              className="size-6"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="hidden md:flex md:gap-x-12">
          {navigation
            .filter(({ sideBarOnly }) => !sideBarOnly)
            .map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
                {item.name}
              </Link>
            ))}
        </div>
        <div className="hidden gap-x-4 md:flex md:flex-1 md:justify-end">
          <DownloadRom>
            <ArrowDownTrayIcon
              strokeWidth="1.5"
              className="size-6"
            />
          </DownloadRom>
          <Link to="/settings">
            <Cog8ToothIcon
              strokeWidth="1.5"
              className="size-6 text-slate-500 transition hover:text-slate-800 hover:dark:text-slate-200"
            />
          </Link>
        </div>
      </nav>
      <Transition
        show={mobileMenuOpen}
        as={Fragment}>
        <Dialog
          as="div"
          className="md:hidden"
          onClose={setMobileMenuOpen}>
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 z-10 bg-slate-100/75 dark:bg-slate-900/75" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full">
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-slate-100 px-3 py-2 pl-6 sm:max-w-sm dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="sr-only">SCUMM-NES</span>
                <img
                  className="h-6 w-auto"
                  src={meteor}
                  alt="Maniac Mansion meteor"
                />
                <button
                  type="button"
                  className="-m-2 rounded-md p-2 text-slate-500 hover:text-slate-800 hover:dark:text-slate-200"
                  onClick={() => setMobileMenuOpen(false)}>
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon
                    strokeWidth="2"
                    className="size-6"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-slate-500/25">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-mx-3 block rounded px-3 py-2 text-base font-semibold leading-7 text-slate-700 hover:bg-slate-200 dark:text-slate-300 hover:dark:bg-slate-800"
                        onClick={() => setMobileMenuOpen(false)}>
                        {item.name}
                      </Link>
                    ))}
                    <DownloadRom>
                      <span className="-mx-3 block rounded px-3 py-2 text-base font-semibold leading-7 text-slate-700 hover:bg-slate-200 dark:text-slate-300 hover:dark:bg-slate-800">
                        Download modified ROM
                      </span>
                    </DownloadRom>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </header>
  );
};

export default Header;
