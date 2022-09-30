import React, { useState, useContext } from "react";
import { Menu } from "@headlessui/react";
import { users, UserContext } from "./UserContext";

export default function renderUserNavigation() {
  const [user, setUser] = useContext(UserContext);

  const [userNavigation, setUserNavigation] = useState(
    Object.values(users)
  )

  return userNavigation.map((item) => (
    <Menu.Item 
      onClick={() => {
        const target = item.name;
        if (target === "Logout") {
          setUser("Login")
          sessionStorage.removeItem("user");
        } else {
          setUser(target);
          sessionStorage.setItem("user", target);
        }
      }}
      key={item.key}>
      {({ active }) => (
        <p
          className={`${active ? "bg-gray-100 " : ""} block px-4 py-2 text-sm text-gray-700`}
        >
          {item.name}
        </p>
      )}
    </Menu.Item>
  ));
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
