import React, { useState, createContext, useContext } from "react";

export const USER_TYPES = {
  STAFF: { key: "staff", name: "Staff" },
  HR: { key: "hr", name: "HR" },
  MANAGER: { key: "manager", name: "Manager" },
};

// Do not remove default unused vars as typescript uses this for type hinting
const defaultUserContextState = {
  isUserLoggedIn: false,
  setIsUserLoggedIn: (loggedInStatus) => {},
  currentUserType: "",
  setUserTypeToStateAndSession: (userType) => {},
};
const UserContext = createContext(defaultUserContextState);

export function UserProvider({ children }) {
  const [isUserLoggedin, setIsUserLoggedIn] = useState(false);
  const [currentUserType, setCurrentUserType] = useState("");

  const setUserTypeToStateAndSession = (userType) => {
    setCurrentUserType(userType);
    sessionStorage.setItem("user", userType);
  };

  const UserContextState = {
    isUserLoggedin,
    setIsUserLoggedIn,
    currentUserType,
    setUserTypeToStateAndSession,
  };

  return <UserContext.Provider value={UserContextState}>{children}</UserContext.Provider>;
}

// Helper functions
export function useUserContext() {
  return useContext(UserContext);
}
