import React, { useState, createContext, useContext, useMemo } from "react";

export const USER_TYPES = {
  STAFF: { key: "staff", name: "Staff", id: 130001 },
  HR: { key: "hr", name: "HR", id: 160008 },
  MANAGER: { key: "manager", name: "Manager", id: 130002 },
};

// Do not remove default unused vars as typescript uses this for type hinting
const defaultUserContextState = {
  isUserLoggedIn: false,
  setIsUserLoggedIn: (loggedInStatus) => {},
  currentUserType: "",
  setUserTypeToStateAndSession: (userType) => {},
  currentUserId: null,
  setCurrentUserIdToStateAndSession: (userId) => {},
};
const UserContext = createContext(defaultUserContextState);

export function UserProvider({ children }) {
  const [isUserLoggedin, setIsUserLoggedIn] = useState(false);
  const [currentUserType, setCurrentUserType] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  const setUserTypeToStateAndSession = (userType) => {
    setCurrentUserType(userType);
    sessionStorage.setItem("user", userType);
  };

  const setCurrentUserIdToStateAndSession = (userId) => {
    setCurrentUserId(userId);
    sessionStorage.setItem("userId", userId);
  };

  const UserContextState = useMemo(
    () => ({
      isUserLoggedin,
      setIsUserLoggedIn,
      currentUserType,
      setUserTypeToStateAndSession,
      currentUserId,
      setCurrentUserIdToStateAndSession,
    }),
    [
      isUserLoggedin,
      setIsUserLoggedIn,
      currentUserType,
      setUserTypeToStateAndSession,
      currentUserId,
      setCurrentUserIdToStateAndSession,
    ],
  );

  return <UserContext.Provider value={UserContextState}>{children}</UserContext.Provider>;
}

// Helper functions
export function useUserContext() {
  return useContext(UserContext);
}
