import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import Login from "./user/Login";

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
                <Login/>
                {/* Profile dropdown */}
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

export function classNames(...classes) {
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
