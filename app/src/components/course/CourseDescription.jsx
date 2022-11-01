import { ComputerDesktopIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function CourseDescription({ courseDesc, skills }) {
  const renderActiveSkills = skills.map((skill, index) => {
    if (skill.is_active === 1) {
      return <SkillBadge skillName={skill.skill_name} />;
    }
    return null;
  });

  return (
    <div className='m-auto flex flex-col w-full p-5 px-10 bg-gray-100 rounded-lg'>
      <p className='text-ellipsis overflow-hidden font-medium text-justify'>{courseDesc}</p>
      {skills.length ? (
        <div className='flex-grid mt-5'>{renderActiveSkills}</div>
      ) : (
        "No skill attached to this course"
      )}
    </div>
  );
}

function SkillBadge({ skillName }) {
  return (
    <span className='bg-blue-200 text-blue-800 text-xl font-semibold mr-4 px-1 py-0.3 rounded dark:bg-blue-200 dark:text-blue-800'>
      {skillName}
    </span>
  );
}
