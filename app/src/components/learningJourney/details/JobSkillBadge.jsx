import React from "react";

export default function JobSkillBadge({ skillName }) {
  return (
    <span className='bg-teal-50 text-primaryColor text-center shadow-md text-md font-medium p-1 mx-2 my-1 rounded-full'>
      {skillName}
    </span>
  );
}
