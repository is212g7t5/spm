import React from "react";
import SkillBadge from "./SkillBadge";

export default function CourseDescription({ courseDesc, skills }) {
  const renderActiveSkills = skills.map((skill, index) => {
    if (skill.isActive === 1) {
      return <SkillBadge skillName={skill.skillName} />;
    }
    return null;
  });

  return (
    <div className='m-auto flex flex-col w-full p-5 px-10 bg-gray-100 rounded-lg'>
      <p className='text-ellipsis overflow-hidden font-medium text-justify'>{courseDesc}</p>
      {skills.length ? (
        <div className='flex flex-wrap mt-5'>{renderActiveSkills}</div>
      ) : (
        "No skills attached to this course"
      )}
    </div>
  );
}
