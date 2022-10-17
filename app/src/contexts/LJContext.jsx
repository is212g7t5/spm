import React, { useState, createContext, useContext, useMemo } from "react";

// Do not remove default unused vars as typescript uses this for type hinting
const defaultLJContextState = {
  selectedJobRole: {},
  setSelectedJobRole: (JobDetails) => {},
  selectedCourseDetails: {},
  setSelectedCourseDetails: (courseDetails) => {},
  clearSelectedCourseDetails: () => {},
  addCoursesToLJ: (courseDetails) => {},
  removeCourseIdFromLJ: (courseDetails) => {},
};
const LJContext = createContext(defaultLJContextState);

export function LJContextProvider({ children }) {
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

  const clearSelectedCourseDetails = () => {
    setSelectedCourseDetails({});
  };

  const LJContextState = useMemo(
    () => ({
      selectedJobRole,
      setSelectedJobRole,
      selectedCourseDetails,
      setSelectedCourseDetails,
      clearSelectedCourseDetails,
      addCoursesToLJ,
      removeCourseIdFromLJ,
    }),
    [
      selectedJobRole,
      setSelectedJobRole,
      selectedCourseDetails,
      setSelectedCourseDetails,
      clearSelectedCourseDetails,
      addCoursesToLJ,
      removeCourseIdFromLJ,
    ],
  );

  return <LJContext.Provider value={LJContextState}>{children}</LJContext.Provider>;
}

// Helper functions
export function useLJContext() {
  return useContext(LJContext);
}
