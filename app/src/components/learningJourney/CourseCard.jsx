import React from "react";
import CourseSkillBadge from "./CourseSkillBadge";


export default function CourseCard({ courseId, courseName, courseStatus }) {
    // I assume we call some API "Get all skills for course" here
    const skillData = [
        "People Management", "Data Analysis", "Project Management", "Figma", "Innovation", "Graphic Design"
    ]

    const skillList = skillData.map((skill, index) => (
        <CourseSkillBadge
            key={index}
            skillName={skill}
        />
    ))

    return (
        <div className="flex flex-col p-2 max-w-xs max-h-32 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-0.5 text-base text-center font-semibold tracking-tight text-gray-900 dark:text-white">
                <span>{courseId}: </span>
                {courseName}
                
            </h5>
            {/* <div className="mb-1 text-xs bg-cyan-700 text-white font-normal mr-1.5 px-1 rounded">{courseStatus}</div> */}
            <div className="flex flex-wrap overflow-auto">{skillList}</div>
        </div>
    )

}