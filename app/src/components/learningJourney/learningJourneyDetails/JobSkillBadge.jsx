import React from "react";

export default function JobSkillBadge({ skillName }) {
  return (
    <span className='bg-sky-100 text-sky-800 text-center shadow-md text-md font-medium p-1 mx-2 my-1 rounded-full dark:bg-blue-200 dark:text-blue-800'>
      {skillName}
    </span>
  );
}