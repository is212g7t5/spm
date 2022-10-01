import React, { useState, createContext } from "react";

export const users = {
  staff: {key: "staff", name: "Staff"},
  hr: {key: "hr", name: "HR"},
  manager: {key: "manager", name: "Manager"},
  login: {key: "login", name: "Logout"},
}

export const UserContext = createContext("login");

export function UserProvider({ children }) {
  const userState = useState("login");

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
};