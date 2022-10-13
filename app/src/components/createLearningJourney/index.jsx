import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useLJCreationContext } from "src/contexts/LJCreationContext";
import { useUserContext } from "src/contexts/UserContext";

import { getAllSkillsAndCourses } from "src/api/skills";
import { createLearningJourneyWithJobId } from "src/api/learningJourney";
import { createLJCourseMapping } from "src/api/learningJourneyCourse";

import JobSkills from "./JobSkills";
import CoursesList from "./CoursesList";
import CourseModal from "./CourseModal";
import SubmitButton from "./SubmitButton"

export default function index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coursesAndSkillsMapping, setCoursesAndSkillsMapping] = useState([]);
  const [currentSelectedSkill, setCurrentSelectedSkill] = useState("");

  const history = useHistory();
  const { selectedJobRole, clearSelectedCourseDetails, selectedCourseDetails } = useLJCreationContext();
  const { currentUserId } = useUserContext();

  useEffect(() => {
    if (!selectedJobRole) {
      history.push("/jobs");
      toast.error(
        "You have been redirected. Please select a Job Role to create a learning journey",
      );
    }
  }, []);

  useEffect(() => {
    getCoursesAndSetState();

    async function getCoursesAndSetState() {
      const allCoursesAndSkills = await getAllSkillsAndCourses();
      setCoursesAndSkillsMapping(allCoursesAndSkills);
    }

    return () => {
      clearSelectedCourseDetails();
    };
  }, []);

  if (!selectedJobRole || !coursesAndSkillsMapping) {
    return <div>Loading ...</div>;
  }

  const closeModal = (e) => {
    setIsModalOpen(false);
  };

  const openModal = (e) => {
    setIsModalOpen(true);
  };

  const onSubmitButtonClicked = async (e) => {
    const res = await createLearningJourneyWithJobId(selectedJobRole.jobId, currentUserId);
    const LJCourseMapping = await createLJCourseMapping(res.lj_id, selectedCourseDetails);
    history.push("/");
  };

  return (
    <div className='flex flex-col container w-9/12 max-w-7xl mt-10 p-10 mx-auto w-full bg-white rounded-lg shadow-lg shadow-blue-200 justify-around'>
      <h1 className='text-3xl text-left font-bold'>Create your Learning Journey</h1>
      <p className='font-medium text-xl text-justify'>
        You have selected Role: {selectedJobRole.jobName}
      </p>
      <JobTileDescription jobDesc={selectedJobRole.jobDesc} />
      <JobSkills
        setCurrentSelectedSkill={setCurrentSelectedSkill}
        skills={selectedJobRole.skills}
        openModal={openModal}
      />
      <CoursesList />
      <CourseModal
        skillId={currentSelectedSkill}
        coursesAndSkillsMapping={coursesAndSkillsMapping}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      <SubmitButton onClick={onSubmitButtonClicked} />
    </div>
  );
}

function JobTileDescription({ jobDesc }) {
  return (
    <div className='flex flex-col w-full p-3 px-5 bg-slate-100 rounded-lg mt-5'>
      <p className='text-lg font-bold text-gray-900 dark:text-white'>Job Description:</p>
      <p className='text-base text-gray-900 dark:text-white text-jusify'>{jobDesc}</p>
    </div>
  );
}
