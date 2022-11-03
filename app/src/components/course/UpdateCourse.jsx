import { useState, useEffect } from "react";
import { useUpdateCourseContext } from "src/contexts/UpdateCourseContext";
import { useUserContext } from "src/contexts/UserContext";
import { getSkillIdsForCourse, createSkillCourse, deleteSkillCourse } from "src/api/skillCourse";
import { getSkillsObject } from "src/api/skills";
// import UpdateCourseSuccess from "./UpdateCourseSuccess";
import { XMarkIcon } from "@heroicons/react/20/solid";
import CourseDescription from "./CourseDescription";

export default function HRUpdateCourse() {
  const { currentUserType } = useUserContext();
  const { updateCourse } = useUpdateCourseContext();

  const [courseId, setCourseId] = useState(updateCourse.courseId);
  const [courseName, setCourseName] = useState(updateCourse.courseName);
  const [courseDesc, setCourseDesc] = useState(updateCourse.courseDesc);
  const [skills, setSkills] = useState(updateCourse.skills);
  const [skillsToBeUnassigned, setSkillsToBeUnassigned] = useState([]);
  const [allActiveSkills, setAllActiveSkills] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [defaultSkillValue, setDefaultSkillValue] = useState("default");

  const handleSkillChange = (e) => {
    e.preventDefault();
    const newSkillId = parseInt(e.target.value, 10);
    if (!selectedSkills.includes(newSkillId)) {
      setSelectedSkills([...selectedSkills, newSkillId]);
    }
    setDefaultSkillValue("default");
  };

  useEffect(() => {
    getAllSkills();

    async function getAllSkills() {
      const skillsReturnedFromBackend = await getSkillsObject(true);
      setAllActiveSkills(skillsReturnedFromBackend);
      const tempSkillArray = skills.map((skill) => skill.skillId);
      setSelectedSkills(tempSkillArray);
    }
  }, []);

  console.log(allActiveSkills);
  console.log(selectedSkills);
  console.log(skills);
  console.log(courseId);

  const renderSkillsOptions = Object.keys(allActiveSkills).map((skillId) => (
    <option value={skillId}>{allActiveSkills[skillId].skillName}</option>
  ));

  const removeSkill = (skillId) => () => {
    setSelectedSkills((selectedSkills) =>
      selectedSkills.filter((selectedSkillId) => selectedSkillId !== skillId),
    );
  };

  const renderSelectedSkills = selectedSkills.map((skillId) => (
    <div className='flex bg-primaryColor text-textColor mr-2 px-3 py-1 space-x-2 rounded'>
      <span>{allActiveSkills[skillId].skillName}</span>
      <button type='button' onClick={removeSkill(skillId)}>
        <XMarkIcon className='h-6 w-6 text-textColor2' />
      </button>
    </div>
  ));

  const handleSubmit = async (e) => {
    // compare skills and selectedSkills -> only create for selected skills that are not in skills.

    // console.log(skillsToBeExcluded);
    // console.log(skillsToBeAssigned);

    // first unassign all skills related to course
    e.preventDefault();
    const tempSkillArray = skills.map((skill) => skill.skill_id);
    setSkillsToBeUnassigned(tempSkillArray);
    // if skills to be unassigned length >0
    skillsToBeUnassigned.map(async (skillIdToBeUnassigned) => {
        await deleteSkillCourse(skillIdToBeUnassigned, courseId);
    })

    // e.preventDefault();
    selectedSkills.map(async (skillIdToBeAssigned) => {
        await createSkillCourse(skillIdToBeAssigned, courseId);
    })

    // display pop up?

    // skillsToBeAssigned.filter((skillIdToBeAssigned) => skillIdToBeAssigned !== skills.map((skill) => skill.skill_id) );
  };

  switch (currentUserType) {
    case "HR":
      return (
        <div className='relative flex flex-col container max-w-7xl mt-10 bg-white p-10 mx-auto rounded-lg shadow-lg shadow-blue-200'>
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
                <p className='italic font-light text-gray-400 text-sm'>At least 1 skill</p>
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
              <div className='flex space-x-2'>{renderSelectedSkills}</div>
            </div>
            <button
              type='submit'
              className='text-white bg-accent2 hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              Re-assign skills to course
            </button>
          </form>
        </div>
      );
    default:
      return <p>FK!!!!</p>;
  }
}
