import React, { useEffect, useState } from "react";
import { getSkillById } from "src/api/skills";

export default function CourseSkillBadge({ skillId }) {
    const [skillName, setSkillName] = useState("");

    useEffect(() => {
        async function getSkillName(skillId) {
            const skill = await getSkillById(skillId);
            setSkillName(skill.skillName);
        }
        
        getSkillName(skillId);
    }, []);

    return (
        <span className='m-px max-width-min bg-callToActionColor1 text-center text-white text-xs font-normal px-2 py-0.5 rounded-xl'>{skillName}</span>
    );
}
