import React from "react";
import CourseSkillBadge from "./CourseSkillBadge";



function CourseCard({ courseName }) {

    const skillData = [
        "People Management", "Data Analysis", "Project Management", "Figma", "Innovation", "Graphic Design", "Presentation", "Sales", "Communication", "Information Systems and Innovation"
    ]

    const skillList = skillData.map((skill, index) => (
        <CourseSkillBadge
            key={index}
            skillName={skill}
        />
    ))

    return (
        <div className="p-2 max-w-xs max-h-32 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-base text-center font-bold tracking-tight text-gray-900 dark:text-white">Course Name</h5>
            <div className="flex flex-wrap  overflow-auto">{skillList}</div>
        </div>
    )
}

export default CourseCard;