import React from "react";

export default function CourseSkillBadge({ skillName }) {
    return (
        <span className='m-px max-width-min bg-orange-500 text-center text-white text-xs font-normal px-2 py-0.5 rounded-xl'>{skillName}</span>
    );
}