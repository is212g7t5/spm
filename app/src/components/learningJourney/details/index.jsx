import React from "react";
import { useUserContext } from "src/contexts/UserContext";
import CourseContainer from "./CourseContainer";
import JobAndSkillsContainer from "./JobAndSkillsContainer";

function LearningJourneyDetails({ ljId }) {
    const { currentUserId } = useUserContext();
    return (
        <>
            <h1 className="my-2 lg:text-2xl font-bold lg:text-center">Learning Journey {ljId}</h1>
            <div className="grid grid-cols-4">
                <CourseContainer ljId={ljId} staffId={currentUserId} />
                <JobAndSkillsContainer />
            </div>
        </>
    )
}

export default LearningJourneyDetails;
