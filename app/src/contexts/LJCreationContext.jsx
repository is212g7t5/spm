import React, { useState, createContext, useContext, useMemo } from "react";

// Do not remove default unused vars as typescript uses this for type hinting
const defaultLJCreationContextState = {
  selectedJobRole: {},
  setSelectedJobRole: (JobDetails) => {},
  selectedCourseDetails: {},
  addCoursesToLJ: (courseDetails) => {},
  removeCourseIdFromLJ: (courseDetails) => {},
};
const LJCreationContext = createContext(defaultLJCreationContextState);

export function LJCreationContextProvider({ children }) {
  const [selectedJobRole, setSelectedJobRole] = useState(null);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState({});

  const addCoursesToLJ = (courses) => {
    const newSelectedCourseDetails = { ...selectedCourseDetails };
    courses.forEach((course) => {
      newSelectedCourseDetails[course.courseId] = { ...course };
    });
    setSelectedCourseDetails(newSelectedCourseDetails);
  };

  const removeCourseIdFromLJ = (courseId) => {
    setSelectedCourseDetails((prevSelectedCourseDetails) => {
      const finalSelectedCourseDetails = { ...prevSelectedCourseDetails };
      delete finalSelectedCourseDetails[courseId];
      return finalSelectedCourseDetails;
    });
  };

  const LJCreationContextState = useMemo(
    () => ({
      selectedJobRole,
      setSelectedJobRole,
      selectedCourseDetails,
      addCoursesToLJ,
      removeCourseIdFromLJ,
    }),
    [
      selectedJobRole,
      setSelectedJobRole,
      selectedCourseDetails,
      addCoursesToLJ,
      removeCourseIdFromLJ,
    ],
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
