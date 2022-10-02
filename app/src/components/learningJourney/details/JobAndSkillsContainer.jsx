import React from "react";
import { mockJobAndSkills } from "src/utils/mocks";
import JobBadge from "./JobBadge";
import JobSkillBadge from "./JobSkillBadge";

export default function JobAndSkillsContainer() {

    const skills = mockJobAndSkills.skills.map((skill, index) => (
        <JobSkillBadge skillName={skill.skillName} key={index} />
    ))

    return (
        <div className="flex flex-col w-48 mt-1 ml-9 lg:col-span-1 col-span-2">
            <h2 className="mb-1 lg:text-lg font-bold text-center">Target Job Role:</h2>
            <JobBadge jobName={mockJobAndSkills.jobName} isActive={mockJobAndSkills.isActive} />

            <div className="flex flex-col mt-2 rounded-lg shadow-lg">
                {skills}
            </div>
        </div>
    )
}
