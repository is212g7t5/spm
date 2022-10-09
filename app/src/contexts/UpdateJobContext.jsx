import React, { useState, createContext, useContext, useMemo } from "react";

// Do not remove default unused vars as typescript uses this for type hinting
const defaultUpdateJobContextState = {
  updateJobRole: {},
  setUpdateJobRole: (JobDetails) => {},
};
const UpdateJobContext = createContext(defaultUpdateJobContextState);

export function UpdateJobContextProvider({ children }) {
  const [updateJobRole, setUpdateJobRole] = useState(null);

  const updateJobContextState = useMemo(
    () => ({
      updateJobRole,
      setUpdateJobRole,
    }),
    [updateJobRole, setUpdateJobRole],
  );

  return (
    <UpdateJobContext.Provider value={updateJobContextState}>
      {children}
    </UpdateJobContext.Provider>
  );
}

// Helper functions
export function useUpdateJobContext() {
  return useContext(UpdateJobContext);
}
