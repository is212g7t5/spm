import React, { useEffect, useState } from "react";
import { useUserContext } from "src/contexts/UserContext";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getLearningJourneyCoursesById } from "src/api/learningJourneyCourse";
import { getJobById } from "src/api/jobs";
import { getLearningJourneyByLJId } from "src/api/learningJourney";
import { getSkillIdsForJobId } from "src/api/jobSkill";
import { getSkillById } from "src/api/skills";

import CourseContainer from "./CourseContainer";
import JobAndSkillsContainer from "./JobAndSkillsContainer";
import AddCourseButton from "./AddCourseButton";

function LearningJourneyDetails() {
  const { currentUserId } = useUserContext();
  const { LJId } = useParams();
  const history = useHistory();

  // Skills and Jobs
  const [jobName, setJobName] = useState("");
  const [isJobActive, setIsJobActive] = useState(true);
  const [skills, setSkills] = useState([]);

  // LJ Course details
  const [LJCourseIds, setLJCourseIds] = useState([]);

  useEffect(() => {
    getAllCoursesForLJ(LJId);

    async function getAllCoursesForLJ(LJId) {
      const courseIdsReturnedFromBackend = await getLearningJourneyCoursesById(LJId);
      setLJCourseIds(courseIdsReturnedFromBackend);
    }
  }, []);

  useEffect(() => {
    let skillsResult;
    const skillPromises = [];
    getJobDetailsForLJ(LJId);

    async function getJobDetailsForLJ(LJId) {
      const LJData = await getLearningJourneyByLJId(LJId);
      const jobData = await getJobById(LJData.jobId);
      setJobName(jobData.jobName);
      setIsJobActive(jobData.isActive);

      const skillIds = await getSkillIdsForJobId(LJData.jobId);
      for (let i = 0; i < skillIds.length; i += 1) {
        skillPromises.push(getSkillById(skillIds[i]));
      }
      skillsResult = await Promise.all(skillPromises);
      setSkills(skillsResult);
    }
  }, []);

  // Validation for LJ ID here if needed in future
  if (!LJId) {
    toast.error("No Learning Journey ID provided");
    history.push("/learning-journeys");
  }

  return (
    <div className='flex flex-col container w-11/12 max-w-7xl p-5 mx-auto w-full justify-around'>
      <h1 className='my-2 lg:text-2xl font-bold lg:text-center'>Learning Journey {LJId}</h1>
      <div className='grid grid-cols-4'>
        <CourseContainer LJId={LJId} staffId={currentUserId} LJCourseIds={LJCourseIds} />
        <JobAndSkillsContainer
          LJId={LJId}
          skills={skills}
          jobName={jobName}
          isJobActive={isJobActive}
        />
      </div>
      <AddCourseButton />
    </div>
  );
}

export default LearningJourneyDetails;
