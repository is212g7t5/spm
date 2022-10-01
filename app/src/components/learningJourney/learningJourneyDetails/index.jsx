import React from "react";
import CourseContainer from "./CourseContainer";
import JobAndSkillsContainer from "./JobAndSkillsContainer";

function LearningJourneyDetails( { ljId }) {
    return (
        <>
            <h1 className="my-2 lg:text-2xl font-bold lg:text-center">Learning Journey 3</h1>
            <div className="grid grid-cols-4">
                <CourseContainer />
                <JobAndSkillsContainer />
            </div>
        </>
    )
}

export default LearningJourneyDetails;