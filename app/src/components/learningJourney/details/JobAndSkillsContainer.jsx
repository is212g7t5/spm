import React, { useState, useEffect } from "react";
import { mockJobAndSkills } from "src/utils/mocks";
import { getJobById } from "src/api/jobs";
import { getLearningJourneyByLJId } from "src/api/learningJourney";
import { getSkillsForJobId } from "src/api/jobSkill";
import JobBadge from "./JobBadge";
import JobSkillBadge from "./JobSkillBadge";

export default function JobAndSkillsContainer({ LJId }) {

    const [jobName, setJobName] = useState("");

    const [isJobActive, setIsJobActive] = useState(true);

    useEffect(() => {
        async function getJobDetailsForLJ(LJId) {
            const LJData = await getLearningJourneyByLJId(LJId);
            const jobData = await getJobById(LJData.jobId);
            setJobName(jobData.jobName);
            setIsJobActive(jobData.isActive);
        }

        getJobDetailsForLJ(LJId);
    }, []);

    const skills = mockJobAndSkills.skills.map((skill, index) => (
        <JobSkillBadge skillName={skill.skillName} key={index} />
    ))

    return (
        <div className="flex flex-col w-48 mt-1 ml-9 lg:col-span-1 col-span-2">
            <h2 className="mb-1 lg:text-lg font-bold text-center">Target Job Role:</h2>
            <JobBadge jobName={jobName} isActive={isJobActive} />

            <div className="flex flex-col mt-2 rounded-lg shadow-lg">
                {skills}
            </div>
        </div>
    )
}
