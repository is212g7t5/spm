import React, { useEffect, useState } from "react";
import { getCourseById } from "src/api/course";
import { getSkillIdsForCourse } from "src/api/skillCourse";
import CourseSkillBadge from "./CourseSkillBadge";


export default function CourseCard({ courseId }) {
    const statusToColor = {
        "Completed": "bg-green-500",
        "Rejected": "bg-red-500",
        "Waitlisted": "bg-blue-500",
        "Registered": "bg-yellow-500",
        "Ongoing": "bg-purple-500",
        "Not Registered": "bg-gray-500"
    };

    const [courseName, setCourseName] = useState("");

    const [courseSkillIds, setCourseSkillIds] = useState([]);

    useEffect(() => {
        async function getCourseName(courseId) {
            const course = await getCourseById(courseId);
            setCourseName(course.courseName);
        }

        async function getCourseSkillIds(courseId) {
            const skillIds = await getSkillIdsForCourse(courseId);
            setCourseSkillIds(skillIds);
        }

        getCourseName(courseId);
        getCourseSkillIds(courseId);
    }, []);

    // TODO: Call Get Registration for Course_ID API here
    const registrationData = {
        "regStatus": "Waitlisted",
        "completionStatus": "Ongoing"
    }

    // if no registrationData, courseStatus = "Not Registered"
    const courseStatus = registrationData.completionStatus.length > 0 ? registrationData.completionStatus : registrationData.regStatus

    // I assume we call some API "Get all skills for course" here
    // const skillData = [
    //     "People Management", "Data Analysis", "Project Management", "Figma", "Innovation", "Graphic Design"
    // ]
    // const skillList = skillData.map((skill, index) => (
    //     <CourseSkillBadge
    //         key={index}
    //         skillId={skill}
    //         skillName={skill}
    //     />
    // ))
    const skillList = courseSkillIds.map((skillId, index) => (
        <CourseSkillBadge
            key={index}
            skillId={skillId}
        />
    ))

    return (
        <div className="flex flex-col p-2 max-w-xs max-h-32 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-0.5 lg:text-base text-xs text-center font-semibold tracking-tight text-gray-900 dark:text-white">
                <div className={`inline-flex mr-1.5 w-3 h-3 rounded-full ${statusToColor[courseStatus]}`} />
                {courseId}: {courseName}

            </h5>
            <div className="flex flex-wrap overflow-auto">{skillList}</div>
        </div>
    )
}
