import React, { useState, useEffect } from "react";
import CourseContainer from "./CourseContainer";
import JobAndSkillsContainer from "./JobAndSkillsContainer";

function LearningJourneyDetails({ LJId }) {
    return (
        <>
            <h1 className="my-2 lg:text-2xl font-bold lg:text-center">Learning Journey {LJId}</h1>
            <div className="grid grid-cols-4">
                <CourseContainer />
                <JobAndSkillsContainer LJId={LJId} />
            </div>
        </>
    )
}

export default LearningJourneyDetails;
