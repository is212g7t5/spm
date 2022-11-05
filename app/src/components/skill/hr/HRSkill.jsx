import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllSkillsAndCourses } from "src/api/skills";
import { StarIcon } from "@heroicons/react/20/solid";

import SkillTile from "../SkillTile";

function HRSkill() {
  const [skills, setSkills] = useState([]);
  const [isDeactivateSkillButtonClick, setDeactivateSkillButtonClick] = useState(false);
  const [isDeactivateSkillModalOpen, setDeactivateSkillModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState({
    skillId: null,
    skillName: null,
    skillDesc: null,
  });

  const onDeactivateSkillModalClose = () => {
    setDeactivateSkillModalOpen(false);
  };

  const renderSkills = skills.map(({ skillId, skillName, skillDesc, courses, isActive }, index) => (
    <SkillTile
      key={index}
      skillId={skillId}
      skillName={skillName}
      skillDesc={skillDesc}
      courses={courses}
      isActive={isActive}
      selectedSkill={selectedSkill}
      setSelectedSkill={setSelectedSkill}
      isDeactivateSkillButtonClick={isDeactivateSkillButtonClick}
      setDeactivateSkillButtonClick={setDeactivateSkillButtonClick}
      isDeactivateSkillModalOpen={isDeactivateSkillModalOpen}
      setDeactivateSkillModalOpen={setDeactivateSkillModalOpen}
      onDeactivateSkillModalClose={onDeactivateSkillModalClose}
    />
  ));

  useEffect(() => {
    async function getAllSkills() {
      const skillsReturnedFromBackend = await getAllSkillsAndCourses();
      setSkills(skillsReturnedFromBackend);
    }

    getAllSkills();
  }, [isDeactivateSkillButtonClick === true]);

  const history = useHistory();

  const redirectToCreateSkillPage = () => {
    history.push("/create-skill");
  };

  return (
    <div className='flex flex-col container mt-10 bg-white p-10 mx-auto mt-10 rounded-lg shadow-lg'>
      <div className='flex md:flex-row flex-col justify-between'>
        <h1 className='text-3xl text-left font-bold'>View All Skills</h1>
        <button
          type='button'
          className='w-fit relative inline-flex items-center rounded-md border border-accent2 bg-transparent px-4 py-2 mt-2 md:mt-0 text-sm font-medium text-accent2 hover:text-white hover:bg-accent2 focus:outline-none focus:ring-2 focus:ring-gray-300'
          onClick={redirectToCreateSkillPage}
        >
          <StarIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
          <span>Create New Skill</span>
        </button>
      </div>
      {skills.length === 0 ? "No Skills Found" : renderSkills}
    </div>
  );
}

export default HRSkill;
