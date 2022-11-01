import React from "react";

export default function SkillBadge({ skillName, isActive }) {
  if (isActive === 0) {
    return null;
  }
  return (
    <span className='bg-blue-200 text-blue-800 text-xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
      {skillName}
    </span>
  );
}
