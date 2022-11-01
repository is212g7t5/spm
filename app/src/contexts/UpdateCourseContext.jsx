import React, { useState, createContext, useContext, useMemo } from "react";

// Do not remove default unused vars as typescript uses this for type hinting
const defaultUpdateCourseContextState = {
  updateCourse: {},
  setUpdateCourse: (CourseDetails) => {},
};
const UpdateCourseContext = createContext(defaultUpdateCourseContextState);

export function UpdateCourseContextProvider({ children }) {
  const [updateCourse, setUpdateCourse] = useState(null);

  const updateCourseContextState = useMemo(
    () => ({
      updateCourse,
      setUpdateCourse,
    }),
    [updateCourse, setUpdateCourse],
  );

  return (
    <UpdateCourseContext.Provider value={updateCourseContextState}>
      {children}
    </UpdateCourseContext.Provider>
  );
}

// Helper functions
export function useUpdateCourseContext() {
  return useContext(UpdateCourseContext);
}
