import React, { useEffect, useState } from "react";
import { useUserContext } from "src/contexts/UserContext";
import { useLJContext } from "src/contexts/LJContext";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getLearningJourneyByLJId } from "src/api/learningJourney";
import { getCourseIdsFromLJId } from "src/api/learningJourneyCourse";
import { getCourseById } from "src/api/course";
import { getJobById } from "src/api/jobs";
import { getSkillIdsForJobId } from "src/api/jobSkill";
import { getSkillById } from "src/api/skills";

import CourseContainer from "./CourseContainer";
import JobAndSkillsContainer from "./JobAndSkillsContainer";
import AddCourseButton from "./AddCourseButton";

function LearningJourneyDetails() {
  const { currentUserId } = useUserContext();
  const { setSelectedLJId, setSelectedJobRole, setSelectedCourseDetails } = useLJContext();

  const { LJId } = useParams();
  const history = useHistory();

  const [jobName, setJobName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [isJobActive, setIsJobActive] = useState(true);
  const [skills, setSkills] = useState([]);

  const [LJCourseIds, setLJCourseIds] = useState([]);
  const [LJCourseDetails, setLJCourseDetails] = useState({});

  useEffect(() => {
    getAllCoursesForLJ(LJId);

    async function getAllCoursesForLJ(LJId) {
      const courseIds = await getCourseIdsFromLJId(LJId);

      const coursePromises = [];
      for (let i = 0; i < courseIds.length; i += 1) {
        coursePromises.push(getCourseById(courseIds[i]));
      }

      const courses = await Promise.all(coursePromises);
      const courseDetailsInObjForm = {};
      courses.forEach((course) => {
        courseDetailsInObjForm[course.courseId] = { ...course };
      });

      setLJCourseIds(courseIds);
      setLJCourseDetails(courseDetailsInObjForm);
    }
  }, [LJId]);

  useEffect(() => {
    getJobDetailsForLJ(LJId);

    async function getJobDetailsForLJ(LJId) {
      const LJData = await getLearningJourneyByLJId(LJId);
      const jobData = await getJobById(LJData.jobId);
      const skillIds = await getSkillIdsForJobId(LJData.jobId);

      const skillPromises = [];
      for (let i = 0; i < skillIds.length; i += 1) {
        skillPromises.push(getSkillById(skillIds[i]));
      }
      const skillsResult = await Promise.all(skillPromises);

      setJobName(jobData.jobName);
      setJobDesc(jobData.jobDesc);
      setIsJobActive(jobData.isActive);
      setSkills(skillsResult);
    }
  }, [LJId]);

  const startLJEditProcess = (e) => {
    // 1. Update the global state with necessary stuff
    // 2. Redirect to create learning journey page with the new stuff
    setSelectedLJId(LJId);
    setSelectedJobRole({ jobName, jobDesc, isJobActive, skills });
    setSelectedCourseDetails(LJCourseDetails);
    history.push("/create-learning-journey?isEdit=true", { isEditing: true });
  };

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
      <AddCourseButton startLJEditProcess={startLJEditProcess} isJobActive={isJobActive} />
    </div>
  );
}

export default LearningJourneyDetails;
