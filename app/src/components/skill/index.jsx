import React, { useEffect, useState } from "react";
import { getSkills, getAllSkillsAndCourses } from "src/api/skills";

import SkillTile from "./SkillTile";

function Skill() {
  const [skills, setSkills] = useState([]);

  const renderSkills = skills.map(({ skillId, skillName, skillDesc, courses }, index) => (
    <SkillTile key={index} skillId={skillId} skillName={skillName} skillDesc={skillDesc} courses={courses} />
  ));

  useEffect(() => {
    getAllSkills();

    async function getAllSkills() {
      const skillsReturnedFromBackend = await getSkills();
      setSkills(skillsReturnedFromBackend);
    }
  }, []);

  return (
    <div className='flex flex-col container w-11/12 max-w-7xl mt-10 bg-white p-10 mx-auto w-full rounded-lg shadow-lg shadow-blue-200'>
      <h1 className='text-3xl text-left font-bold'>View All Skills</h1>
      {skills.length === 0 ? "No Skills Found" : renderSkills}
    </div>
  );
}

export default Skill;
