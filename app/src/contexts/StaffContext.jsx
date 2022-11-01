import React, { useState, createContext, useContext, useMemo } from "react";

// Do not remove default unused vars as typescript uses this for type hinting
const defaultStaffContextState = {
  learningJourneys: [],
  setLearningJourneys: (learningJourneys) => {},
};
const StaffContext = createContext(defaultStaffContextState);

export function StaffContextProvider({ children }) {
  const [learningJourneys, setLearningJourneys] = useState([]);

  const StaffContextState = useMemo(
    () => ({
      learningJourneys,
      setLearningJourneys,
    }),
    [learningJourneys, setLearningJourneys],
  );

  return <StaffContext.Provider value={StaffContextState}>{children}</StaffContext.Provider>;
}

// Helper functions
export function useStaffContext() {
  return useContext(StaffContext);
}
