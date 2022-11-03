import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { getSkills } from "src/api/skills";

export default function JobSkillSelection({ selectedSkills, setSelectedSkills }) {
  const [skills, setSkills] = useState([]);
  const [defaultSkillValue, setDefaultSkillValue] = useState("default");

  useEffect(() => {
    getAllSkills();

    async function getAllSkills() {
      const skillsReturnedFromBackend = await getSkills(true);
      setSkills(skillsReturnedFromBackend);
    }
  }, []);

  const handleSkillChange = (e) => {
    e.preventDefault();
    setSelectedSkills([...selectedSkills, skills[e.target.value].skillId]);
    setDefaultSkillValue("default");
  };

  const renderSkillsOptions = skills.map((skill, index) => {
    if (!selectedSkills.includes(skill.skillId)) {
      return (
        <option key={skill.skillId} value={index}>
          {skill.skillName}
        </option>
      );
    }
    return null;
  });

  const removeSkill = (skillId) => () => {
    setSelectedSkills((selectedSkills) =>
      selectedSkills.filter((selectedSkillId) => selectedSkillId !== skillId),
    );
  };

  const renderSelectedSkills = selectedSkills.map((skillId) => (
    <div className='flex bg-primary mr-2 px-3 py-1 m-1 space-x-2 rounded'>
      <span>{skills.find((skill) => skill.skillId === skillId).skillName}</span>
      <button type='button' onClick={removeSkill(skillId)}>
        <XMarkIcon className='h-6 w-6 text-white' />
      </button>
    </div>
  ));

  return (
    <div>
      {skills.length > 0 ? (
        <div className='mb-6'>
          <p className='block mb-2 text-md font-medium text-black'>Skills</p>
          <label
            htmlFor='jobDesc'
            className='block mb-2 text-md font-medium text-gray-900 dark:text-gray-300 space-y-2'
          >
            <select
              id='underline_select'
              onChange={handleSkillChange}
              className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer'
              value={defaultSkillValue}
            >
              <option value='default' disabled hidden>
                Add a skill
              </option>
              {renderSkillsOptions}
            </select>
          </label>

          {selectedSkills.length > 0 ? (
            <div className='flex flex-wrap bg-gray-100 border border-gray-300 text-white text-sm rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full p-2.5'>
              {renderSelectedSkills}
            </div>
          ) : null}
        </div>
      ) : (
        <div className='mb-6'>
          <p className='block mb-2 text-md font-medium text-black'>Skills</p>
          <p>No skills available. Please contact the administrator for more info.</p>
        </div>
      )}
    </div>
  );
}
