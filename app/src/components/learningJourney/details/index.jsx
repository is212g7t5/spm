import React, { useState, useEffect } from "react";
import { useUserContext } from "src/contexts/UserContext";
import CourseContainer from "./CourseContainer";
import JobAndSkillsContainer from "./JobAndSkillsContainer";

function LearningJourneyDetails({ LJId }) {
    const { currentUserId } = useUserContext();
    return (
        <>
            <h1 className="my-2 lg:text-2xl font-bold lg:text-center">Learning Journey {LJId}</h1>
            <div className="grid grid-cols-4">
                <CourseContainer LJId={LJId} staffId={currentUserId} />
                <JobAndSkillsContainer LJId={LJId}/>
            </div>
        </>
    )
}

export default LearningJourneyDetails;
