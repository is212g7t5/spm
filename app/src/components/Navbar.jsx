import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function Navbar() {
  const [pageNavigation, setPageNavigation] = useState([
    { name: "Dashboard", href: "/" },
    { name: "Skills", href: "#" },
    { name: "Courses", href: "/courses" },
    { name: "Job Roles", href: "/jobs" },
  ]);

  const [userNavigation, setUserNavigation] = useState([
    { name: "Your Learning Journeys", href: "/" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ]);

  const renderNavbarItems = pageNavigation.map((item) => (
    <a
      key={item.name}
      href={item.href}
      className={classNames(
        isCurrent(item.href)
          ? "bg-cyan-900 text-white"
          : "text-gray-300 hover:bg-cyan-700 hover:text-white",
        "px-3 py-2 rounded-md text-sm font-medium",
      )}
      aria-current={item.current ? "page" : undefined}
    >
      {item.name}
    </a>
  ));

  const renderDisclosureNavbarItems = pageNavigation.map((item) => (
    <Disclosure.Button
      key={item.name}
      as='a'
      href={item.href}
      className={classNames(
        isCurrent(item.href)
          ? "bg-cyan-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white",
        "block px-3 py-2 rounded-md text-base font-medium",
      )}
      aria-current={isCurrent(item.href) ? "page" : undefined}
    >
      {item.name}
    </Disclosure.Button>
  ));

  const renderUserNavigation = userNavigation.map((item) => (
    <Menu.Item key={item.name}>
      {({ active }) => (
        <a
          href={item.href}
          className={classNames(
            active ? "bg-gray-100" : "",
            "block px-4 py-2 text-sm text-gray-700",
          )}
        >
          {item.name}
        </a>
      )}
    </Menu.Item>
  ));

  return (
    <Disclosure as='nav' className='bg-cyan-800'>
      {({ open }) => (
        <>
          <div className='flex h-16 justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex'>
              <div className='ml-2 mr-2 flex items-center md:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-shrink-0 items-center'>
                <a
                  href='/'
                  className='text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white'
                >
                  LJPS
                </a>
              </div>
              <div className='hidden md:ml-6 md:flex md:items-center md:space-x-4'>
                {renderNavbarItems}
              </div>
            </div>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <button
                  type='button'
                  className='relative inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800'
                >
                  <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
                  <span>New Learning Journey</span>
                </button>
              </div>
              <div className='hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center'>
                {/* Profile dropdown */}
                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='flex rounded-full bg-cyan-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-800'>
                      <span className='sr-only'>Open user menu</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          fill='white'
                          stroke='white'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                        />
                      </svg>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      {renderUserNavigation}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>{renderDisclosureNavbarItems}</div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isCurrent(href) {
  const currentUrl = document.location.toString().split("/");
  const page = `/${currentUrl[currentUrl.length - 1]}`;
  if (page === href) {
    return true;
  }
  return false;
}
