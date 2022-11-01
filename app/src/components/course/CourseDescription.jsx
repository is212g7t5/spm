import React from "react";
import SkillBadge from "./SkillBadge";

export default function CourseDescription({ desc, skills }) {
  const renderSkillsForCourse = skills.map(({ skillId, skillName, isActive }, index) => (
    <SkillBadge key={`skill-${skillId}`} skillName={skillName} />
  ));
  return (
    <div className='flex flex-row w-full p-4 transition duration-150 ease-in-out'>
      <div className='flex flex-col w-full'>
        <div className='font-medium text-left'>{desc}</div>
        {skills.length ? (
          <div className='flex mt-4'>{renderSkillsForCourse}</div>
        ) : "No skills offered by course"}
      </div>
    </div>
  );
}
