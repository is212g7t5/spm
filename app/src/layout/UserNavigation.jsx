import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { USER_TYPES, useUserContext } from "src/contexts/UserContext";

export default function UserNavigation() {
  const [allUserTypes, setAllUserTypes] = useState({});
  const { setUserTypeToStateAndSession, setCurrentUserIdToStateAndSession } = useUserContext();

  useEffect(() => {
    setAllUserTypes(USER_TYPES);
  }, []);

  const handleUserNavigation = (userId, userTypeKey) => () => {
    setUserTypeToStateAndSession(userTypeKey);
    setCurrentUserIdToStateAndSession(userId);
  };

  const renderUserTypesAsMenuItems = Object.keys(allUserTypes).map((userType) => (
    <Menu.Item onClick={handleUserNavigation(allUserTypes[userType].id, userType)} key={userType}>
      {({ active }) => (
        <p className={`${active ? "bg-gray-100 " : ""} block px-4 py-2 text-sm text-black`}>
          {allUserTypes[userType].name}
        </p>
      )}
    </Menu.Item>
  ));

  return (
    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
      {renderUserTypesAsMenuItems}
    </Menu.Items>
  );
}
