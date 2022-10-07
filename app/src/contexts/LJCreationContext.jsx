import React, { useState, createContext, useContext, useMemo } from "react";

// Do not remove default unused vars as typescript uses this for type hinting
const defaultLJCreationContextState = {
  selectedJobRole: {},
  setSelectedJobRole: (JobDetails) => {},
  selectedCourseDetails: [],
  addCourseIdToLJ: (courseId) => {},
  removeCourseIdFromLJ: (courseId) => {},
};
const LJCreationContext = createContext(defaultLJCreationContextState);

export function LJCreationContextProvider({ children }) {
  const [selectedJobRole, setSelectedJobRole] = useState(null);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState([]);

  const addCourseIdToLJ = (courseId) => {
    setSelectedCourseDetails([...selectedCourseDetails, courseId]);
  };

  const removeCourseIdFromLJ = (courseId) => {
    setSelectedCourseDetails(selectedCourseDetails.filter((id) => id !== courseId));
  };

  const LJCreationContextState = useMemo(
    () => ({
      selectedJobRole,
      setSelectedJobRole,
      selectedCourseDetails,
      addCourseIdToLJ,
      removeCourseIdFromLJ,
    }),
    [selectedJobRole, setSelectedJobRole, selectedCourseDetails, addCourseIdToLJ, removeCourseIdFromLJ],
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
