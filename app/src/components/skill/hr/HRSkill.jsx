import React, { useEffect, useState } from "react";
import { getAllSkillsAndCourses } from "src/api/skills";

import SkillTile from "../SkillTile";

function HRSkill() {
  const [skills, setSkills] = useState([]);

  const renderSkills = skills.map(({ skillId, skillName, skillDesc, courses, isActive }, index) => (
    <SkillTile
      key={index}
      skillId={skillId}
      skillName={skillName}
      skillDesc={skillDesc}
      courses={courses}
      isActive={isActive}
    />
  ));

  useEffect(() => {
    async function getAllSkills() {
      const skillsReturnedFromBackend = await getAllSkillsAndCourses();
      setSkills(skillsReturnedFromBackend);
    }

    getAllSkills();
  }, []);

  return (
    <div className='flex flex-col container w-11/12 max-w-7xl mt-10 bg-white p-10 mx-auto w-full rounded-lg shadow-lg shadow-blue-200'>
      <h1 className='text-3xl text-left font-bold'>View All Skills</h1>
      {skills.length === 0 ? "No Skills Found" : renderSkills}
    </div>
  );
}

export default HRSkill;
