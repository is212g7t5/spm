import React from "react";

export default function SkillBadge({ skillName }) {
  return (
    <span className='bg-accent4 text-accent1 text-sm font-semibold mt-1 md:mt-0 mr-2 px-2.5 py-0.5 rounded'>
      {skillName}
    </span>
  );
}
