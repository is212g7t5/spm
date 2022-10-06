import React, { Fragment, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import Login from "./Login";

export default function Navbar() {
  const [pageNavigation, setPageNavigation] = useState([
    { name: "Dashboard", href: "/" },
    { name: "Skills", href: "#" },
    { name: "Courses", href: "/courses" },
    { name: "Job Roles", href: "/jobs" },
  ]);

  const renderDisclosureNavbarItems = pageNavigation.map((item) => (
    <Disclosure.Button
      key={item.name}
      as='a'
      href={item.href}
      className={classNames(
        isCurrent(item.href)
          ? "bg-tertiaryColor text-textColor"
          : "text-textColor2 hover:bg-primaryColor hover:text-textColor",
        "block px-3 py-2 rounded-md text-base font-medium",
      )}
      aria-current={isCurrent(item.href) ? "page" : undefined}
    >
      {item.name}
    </Disclosure.Button>
  ));

  return (
    <Disclosure as='nav' className='bg-secondaryColor'>
      {({ open }) => (
        <>
          <div className='flex h-16 justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <RoutingItems open={open} pageNavigation={pageNavigation} />
            <CreateLJButton />
            <LoginButton />
          </div>
          <Disclosure.Panel className='md:hidden'>
            <div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>{renderDisclosureNavbarItems}</div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function RoutingItems({ open, pageNavigation }) {
  return (
    <>
      <MobileNavbarItems open={open} />
      <DeskopNavbarItems pageNavigation={pageNavigation} />
    </>
  );
}

function MobileNavbarItems({ open }) {
  return (
    <div className='flex'>
      <div className='ml-2 mr-2 flex items-center md:hidden'>
        {/* Mobile menu button */}
        <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-textColor2 hover:bg-primaryColor hover:text-textColor focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
          <span className='sr-only'>Open main menu</span>
          {open ? (
            <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
          ) : (
            <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
          )}
        </Disclosure.Button>
      </div>
    </div>
  );
}

function DeskopNavbarItems({ pageNavigation }) {
  const renderNavbarItems = pageNavigation.map((routingItem) => (
    <Link
      to={routingItem.href}
      key={routingItem.name}
      className={classNames(
        isCurrent(routingItem.href)
          ? "bg-tertiaryColor text-textColor"
          : "text-textColor2 hover:bg-primaryColor hover:text-textColor",
        "px-3 py-2 rounded-md text-sm font-medium",
      )}
      aria-current={isCurrent(routingItem.href) ? "page" : undefined}
    >
      {routingItem.name}
    </Link>
  ));

  return (
    <div className='hidden md:ml-6 md:flex md:items-center md:space-x-4 md:mr-auto'>
      <Link
        to='/'
        className='text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-textColor'
      >
        LJPS
      </Link>
      {renderNavbarItems}
    </div>
  );
}

function CreateLJButton() {
  const history = useHistory();

  const redirectToCreateLJPage = () => {
    history.push("/create-learning-journey");
  };

  return (
    <div className='flex-shrink-0 items-center my-auto ml-auto'>
      <button
        type='button'
        className='relative inline-flex items-center rounded-md border border-transparent bg-callToActionColor1 px-4 py-2 text-sm font-medium text-textColor shadow-sm hover:bg-callToActionColor2 focus:outline-none focus:ring-2 focus:ring-callToActionColor3 focus:ring-offset-2 focus:ring-offset-gray-800'
        onClick={redirectToCreateLJPage}
      >
        <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
        <span>New Learning Journey</span>
      </button>
    </div>
  );
}

function LoginButton() {
  return <Login />;
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
