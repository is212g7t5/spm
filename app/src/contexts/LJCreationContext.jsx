import React, { useState, createContext, useContext, useMemo } from "react";

// Do not remove default unused vars as typescript uses this for type hinting
const defaultLJCreationContextState = {
  selectedJobRole: "",
  setSelectedJobRole: (JobDetails) => {},
  selectedCourseIds: [],
  addCourseIdToLJ: (courseId) => {},
  removeCourseIdFromLJ: (courseId) => {},
};
const LJCreationContext = createContext(defaultLJCreationContextState);

export function LJCreationContextProvider({ children }) {
  const [selectedJobRole, setSelectedJobRole] = useState(null);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);

  const addCourseIdToLJ = (courseId) => {
    setSelectedCourseIds([...selectedCourseIds, courseId]);
  };

  const removeCourseIdFromLJ = (courseId) => {
    setSelectedCourseIds(selectedCourseIds.filter((id) => id !== courseId));
  };

  const LJCreationContextState = useMemo(
    () => ({
      selectedJobRole,
      setSelectedJobRole,
      selectedCourseIds,
      addCourseIdToLJ,
      removeCourseIdFromLJ,
    }),
    [selectedJobRole, setSelectedJobRole, selectedCourseIds, addCourseIdToLJ, removeCourseIdFromLJ],
  );

  return (
    <LJCreationContext.Provider value={LJCreationContextState}>
      {children}
    </LJCreationContext.Provider>
  );
}

// Helper functions
export function useLJCreationContext() {
  return useContext(LJCreationContext);
}
