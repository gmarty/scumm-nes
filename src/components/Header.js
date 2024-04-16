import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import meteor from '../assets/meteor.png';

const navigation = [
  { name: 'Rooms', href: '/rooms/1' },
  { name: 'Room Gfx', href: '/roomgfx' },
  { name: 'Prepositions', href: '/preps' },
  { name: 'ROM map', href: '/rom' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Global">
        <div className="flex md:flex-1">
          <span className="sr-only">SCUMM NES resource explorer</span>
          <img
            className="h-6 w-auto"
            src={meteor}
            alt="Maniac Mansion meteor"
          />
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              className="size-6"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="hidden md:flex md:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6 text-white">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex md:flex-1 md:justify-end">
          {process.env.NODE_ENV === 'development' && (
            <div className="text-white">
              <span className="hidden max-sm:inline">XS</span>
              <span className="hidden sm:max-md:inline">SM</span>
              <span className="hidden md:max-lg:inline">MD</span>
              <span className="hidden lg:max-xl:inline">LG</span>
              <span className="hidden xl:max-2xl:inline">XL</span>
              <span className="hidden 2xl:inline">2XL</span>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="md:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10 bg-slate-900/75" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <span className="sr-only">SCUMM NES resource explorer</span>
            <img
              className="h-6 w-auto"
              src={meteor}
              alt="Maniac Mansion meteor"
            />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                className="h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
