import React, { Fragment, useEffect, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { users, UserContext } from "./UserContext";
import UserNavigation from "./UserNavigation";

export default function Login() {

  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if (sessionStorage.getItem("user") != null && sessionStorage.getItem("user").toLowerCase() in users) {
      setUser(sessionStorage.getItem("user"));
    } else {
      setUser("Login");
    }
  }, [])

  return (
    <Menu as='div' className='relative ml-3'>
      <div>
        <Menu.Button
          className='relative inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800'>
          <span>{user}</span>
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
          <UserNavigation/>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
