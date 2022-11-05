import { useState, useEffect } from "react";
import { useUpdateCourseContext } from "src/contexts/UpdateCourseContext";
import { useUserContext } from "src/contexts/UserContext";
import { getSkillsObject } from "src/api/skills";
import { XMarkIcon } from "@heroicons/react/20/solid";
import CourseDescription from "./CourseDescription";
import UpdateConfirmationPopUp from "./UpdateConfirmationPopUp";

export default function HRUpdateCourse() {
  const { currentUserType } = useUserContext();
  const { updateCourse } = useUpdateCourseContext();

  const [courseId, setCourseId] = useState(updateCourse.courseId);
  const [courseName, setCourseName] = useState(updateCourse.courseName);
  const [courseDesc, setCourseDesc] = useState(updateCourse.courseDesc);
  const [skills, setSkills] = useState(updateCourse.skills);
  const [isSucessPopUpOpen, setIsSuccessPopUpOpen] = useState(false);
  const [skillsToBeUnassigned, setSkillsToBeUnassigned] = useState([]);
  const [allActiveSkills, setAllActiveSkills] = useState({});
  const [skillsToBeDisplayed, setSkillsToBeDisplayed] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [defaultSkillValue, setDefaultSkillValue] = useState("default");

  console.log(courseId);

  const handleSkillChange = (e) => {
    e.preventDefault();
    const newSkillId = parseInt(e.target.value, 10);
    const objectToInsert = { skill_id: newSkillId, action: "add" };

    const checkIfIdExists = (obj) => obj.skill_id === newSkillId;
    const result = selectedSkills.some(checkIfIdExists);
    if (!result) {
      setSelectedSkills([...selectedSkills, objectToInsert]);
    } else {
      const indexOfExistingSkill = selectedSkills.findIndex((obj) => obj.skill_id === newSkillId);
      if (indexOfExistingSkill !== -1) {
        selectedSkills[indexOfExistingSkill].action = "add";
      }
    }
    const resultOfDisplay = skillsToBeDisplayed.some(checkIfIdExists);
    if (!resultOfDisplay) {
      setSkillsToBeDisplayed([...skillsToBeDisplayed, objectToInsert]);
    }

    setDefaultSkillValue("default");
  };

  console.log(skills);

  useEffect(() => {
    getAllSkills();

    async function getAllSkills() {
      const skillsReturnedFromBackend = await getSkillsObject(true);
      setAllActiveSkills(skillsReturnedFromBackend);

      const tempSkillArray = skills.map((skill) => skill.skillId);
      for (let i = 0; i < tempSkillArray.length; i += 1) {
        const skillIdToInsert = tempSkillArray[i];
        const objectToInsert = { skill_id: skillIdToInsert, action: "add" };
        const checkIfIdExists = (obj) => obj.skill_id === skillIdToInsert;
        const result = selectedSkills.some(checkIfIdExists);
        if (!result) {
          selectedSkills.push(objectToInsert);
        }
      }
      setSkillsToBeDisplayed(selectedSkills);
    }
  }, []);

  console.log(selectedSkills);

  const renderSkillsOptions = Object.keys(allActiveSkills).map((skillId) => (
    <option value={skillId}>{allActiveSkills[skillId].skillName}</option>
  ));

  const removeSkill = (skillId) => () => {
    const checkIfSkillIsAlreadyAssigned = (obj) => obj.skill_id === skillId;
    const result = selectedSkills.some(checkIfSkillIsAlreadyAssigned);
    if (result) {
      const indexOfExistingSkill = selectedSkills.findIndex((obj) => obj.skill_id === skillId);
      if (indexOfExistingSkill !== -1) {
        selectedSkills[indexOfExistingSkill].action = "delete";
      }
    }
    setSkillsToBeDisplayed((skillsToBeDisplayed) =>
      skillsToBeDisplayed.filter(
        (selectedSkillElement) => selectedSkillElement.skill_id !== skillId,
      ),
    );
  };

  const renderSelectedSkills = skillsToBeDisplayed.map((skillObject) => (
    <div className='flex bg-primary mr-2 px-3 py-1 m-1 space-x-2 rounded'>
      <span className='text-white'>{allActiveSkills[skillObject.skill_id].skillName}</span>
      <button type='button' onClick={removeSkill(skillObject.skill_id)}>
        <XMarkIcon className='h-6 w-6' />
      </button>
    </div>
  ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccessPopUpOpen(true);
  };

  switch (currentUserType) {
    case "HR":
      return (
        <div className='relative flex flex-col container max-w-7xl mt-10 bg-white p-10 mx-auto rounded-lg shadow-lg'>
          <h1 className='text-3xl text-left font-bold'>Update Course</h1>
          <form onSubmit={handleSubmit}>
            <p className='font-medium text-xl text-justify'>
              You have selected Course: {courseName}
            </p>
            <div className='flex flex-col w-full p-3 px-5 bg-gray-100 rounded-lg mt-5'>
              <p className='text-lg font-bold text-black dark:text-white'>Course Description:</p>
              <CourseDescription courseDesc={courseDesc} skills={skills} />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='courseDesc'
                className='block mb-2 text-md font-medium text-gray-900 dark:text-gray-300 space-y-2'
              >
                <p>Skills</p>
                <select
                  id='underline_select'
                  onChange={handleSkillChange}
                  className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
                  value={defaultSkillValue}
                >
                  <option selected value='default' disabled hidden>
                    Assign a skill
                  </option>
                  {renderSkillsOptions}
                </select>
              </label>
              <div className='flex flex-wrap bg-gray-100 border border-gray-300 text-white text-sm rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full p-2.5'>
                {renderSelectedSkills}
              </div>
            </div>
            <button
              type='submit'
              className='text-white bg-accent2 hover:bg-accent3 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              Re-assign skills to course
            </button>
          </form>
          {isSucessPopUpOpen ? (
            <UpdateConfirmationPopUp
              setIsConfirmPopUpOpen={setIsSuccessPopUpOpen}
              isConfirmPopUpOpen={isSucessPopUpOpen}
              selectedSkills={selectedSkills}
              skills={skills}
              courseId={courseId}
              courseName={courseName}
            />
          ) : null}
        </div>
      );
    default:
      return null;
  }
}
