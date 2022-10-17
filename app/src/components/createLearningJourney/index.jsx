import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useLJContext } from "src/contexts/LJContext";
import { useUserContext } from "src/contexts/UserContext";

import { getAllSkillsAndCourses } from "src/api/skills";
import { createLearningJourneyWithJobId } from "src/api/learningJourney";
import { createLJCourseMapping } from "src/api/learningJourneyCourse";

import JobSkills from "./JobSkills";
import CoursesList from "./CoursesList";
import CourseModal from "./CourseModal";
import SubmitButton from "./SubmitButton";

export default function index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coursesAndSkillsMapping, setCoursesAndSkillsMapping] = useState([]);
  const [currentSelectedSkill, setCurrentSelectedSkill] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  const { selectedLJId, selectedJobRole, clearSelectedCourseDetails, selectedCourseDetails } =
    useLJContext();
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
    return cleanup;

    async function getCoursesAndSetState() {
      const allCoursesAndSkills = await getAllSkillsAndCourses();
      setCoursesAndSkillsMapping(allCoursesAndSkills);
    }

    function cleanup() {
      if (!selectedLJId) {
        clearSelectedCourseDetails();
      }
    }
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
    const createRes = await createLearningJourneyWithJobId(selectedJobRole.jobId, currentUserId);
    if ("error" in createRes) {
      setErrorMessage(createRes.error);
      return;
    }

    const mappingRes = await createLJCourseMapping(createRes.lj_id, selectedCourseDetails);
    if ("error" in mappingRes) {
      setErrorMessage(mappingRes.error);
      return;
    }

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
      <SubmitButton onClick={onSubmitButtonClicked} />
      <p className='text-red-500 mt-2'>{errorMessage}</p>
      <CourseModal
        skillId={currentSelectedSkill}
        coursesAndSkillsMapping={coursesAndSkillsMapping}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
}

function JobTileDescription({ jobDesc }) {
  return (
    <div className='flex flex-col w-full p-3 px-5 bg-gray-100 rounded-lg mt-5'>
      <p className='text-lg font-bold text-black dark:text-white'>Job Description:</p>
      <p className='text-base text-black dark:text-white text-jusify'>{jobDesc}</p>
    </div>
  );
}
