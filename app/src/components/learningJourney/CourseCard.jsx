import React from "react";
import CourseSkillBadge from "./CourseSkillBadge";


export default function CourseCard({ courseId, courseName, registrationStatus, completionStatus }) {
    // I assume we call some API "Get all skills for course" here
    const skillData = [
        "People Management", "Data Analysis", "Project Management", "Figma", "Innovation", "Graphic Design"
    ]

    const statusToColor = {
        "Completed": "bg-green-500",
        "Rejected": "bg-red-500",
        "Waitlisted": "bg-blue-500",
        "Registered": "bg-yellow-500",
        "Not Registered": "bg-purple-500"
    };

    const skillList = skillData.map((skill, index) => (
        <CourseSkillBadge
            key={index}
            skillName={skill}
        />
    ))

    return (
        <div className="flex flex-col p-2 max-w-xs max-h-32 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-0.5 text-base text-center font-semibold tracking-tight text-gray-900 dark:text-white">
                {courseId}: {courseName}
                <div className={`inline-flex ml-1.5 w-3 h-3 rounded-full ${completionStatus === "Completed" ? statusToColor[completionStatus] : statusToColor[registrationStatus]}`} />
            </h5>
            <div className="flex flex-wrap overflow-auto">{skillList}</div>
        </div>
    )

}