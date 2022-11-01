import React, { useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { USER_TYPES, useUserContext } from "src/contexts/UserContext";
import UserNavigation from "./UserNavigation";

export default function Login() {
  const { currentUserType, setUserTypeToStateAndSession, setCurrentUserIdToStateAndSession } =
    useUserContext();

  useEffect(() => {
    const userFromSessionStorage = sessionStorage.getItem("user");
    const userIdFromSessionStorage = sessionStorage.getItem("userId");

    if (
      userFromSessionStorage != null &&
      userIdFromSessionStorage != null &&
      userFromSessionStorage in USER_TYPES
    ) {
      setUserTypeToStateAndSession(userFromSessionStorage);
      setCurrentUserIdToStateAndSession(userIdFromSessionStorage);
    } else {
      setUserTypeToStateAndSession("");
      setCurrentUserIdToStateAndSession(null);
    }
  }, []);

  return (
    <Menu as='div' className='relative my-auto ml-5 z-10'>
      <Menu.Button className='relative inline-flex items-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent3 focus:ring-offset-2 focus:ring-offset-gray-800'>
        <span>{currentUserType || "Login"}</span>
      </Menu.Button>
      <Transition
        enter='transition ease-out duration-200'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <UserNavigation />
      </Transition>
    </Menu>
  );
}
