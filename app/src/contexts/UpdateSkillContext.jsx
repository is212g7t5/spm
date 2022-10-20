import React, { useState, createContext, useContext, useMemo } from "react";

// Do not remove default unused vars as typescript uses this for type hinting
const defaultUpdateSkillContextState = {
    updateSkill: {},
    setUpdateSkill: (SkillDetails) => { },
};
const UpdateSkillContext = createContext(defaultUpdateSkillContextState);

export function UpdateSkillContextProvider({ children }) {
    const [updateSkill, setUpdateSkill] = useState(null);

    const updateSkillContextState = useMemo(
        () => ({
            updateSkill,
            setUpdateSkill,
        }),
        [updateSkill, setUpdateSkill],
    );

    return (
        <UpdateSkillContext.Provider value={updateSkillContextState} >
            {children}
        </ UpdateSkillContext.Provider>
    );
}

// Helper functions
export function useUpdateSkillContext() {
    return useContext(UpdateSkillContext);
}
