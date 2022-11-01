import React, { useEffect, useState } from "react";
import { getActiveSkillsAndCourses } from "src/api/skills";

import SkillTile from "../SkillTile";

function StaffSkill() {
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
    async function getActiveSkills() {
      const skillsReturnedFromBackend = await getActiveSkillsAndCourses();
      setSkills(skillsReturnedFromBackend);
      console.log(skillsReturnedFromBackend);
    }

    getActiveSkills();
  }, []);

  return (
    <div className='flex flex-col container mt-10 w-10/12 max-w-7xl bg-white p-10 mx-auto rounded-lg shadow-lg'>
      <h1 className='text-3xl text-left font-bold'>View All Skills</h1>
      {skills.length === 0 ? "No Skills Found" : renderSkills}
    </div>
  );
}

export default StaffSkill;
