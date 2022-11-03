import React from "react";

export default function JobSkillBadge({ skillName }) {
  return (
    <span className='bg-accent4 text-accent1 text-sm text-center font-semibold mr-2 px-2.5 py-0.5 rounded-lg p-1 mx-2 my-1'>
      {skillName}
    </span>
  );
}
