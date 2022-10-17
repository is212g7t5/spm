import React, { useEffect, useState } from "react";
import { getCourseById } from "src/api/course";
import { getSkillIdsForCourse } from "src/api/skillCourse";
import { getRegistrationByStaffAndCourseId } from "src/api/registration";
import CourseSkillBadge from "./CourseSkillBadge";

export default function CourseCard({ courseId, staffId }) {
  const statusToColor = {
    Completed: "bg-green-500",
    Rejected: "bg-red-500",
    Waitlisted: "bg-blue-200",
    Registered: "bg-yellow-500",
    Ongoing: "bg-purple-500",
    "Not Registered": "bg-gray-100",
  };

  const [courseName, setCourseName] = useState("");

  const [courseSkillIds, setCourseSkillIds] = useState([]);

  const [courseStatus, setCourseStatus] = useState("");

  useEffect(() => {
    async function getCourseName(courseId) {
      const course = await getCourseById(courseId);
      setCourseName(course.courseName);
    }

    async function getCourseSkillIds(courseId) {
      const skillIds = await getSkillIdsForCourse(courseId);
      setCourseSkillIds(skillIds);
    }

    async function getCourseStatus(staffId, courseId) {
      const registrationData = await getRegistrationByStaffAndCourseId(staffId, courseId);
      if (Object.keys(registrationData).length === 0) {
        setCourseStatus("Not Registered");
      } else {
        setCourseStatus(
          registrationData.completionStatus.length > 0
            ? registrationData.completionStatus.trim()
            : registrationData.regStatus.trim(),
        );
      }
    }

    getCourseName(courseId);
    getCourseSkillIds(courseId);
    getCourseStatus(staffId, courseId);
  }, []);

  const skillList = courseSkillIds.map((skillId, index) => (
    <CourseSkillBadge key={index} skillId={skillId} />
  ));

  return (
    <div className='flex flex-col p-2 max-w-xs max-h-32 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-100 dark:border-gray-700'>
      <h5 className='mb-0.5 lg:text-base text-xs text-center font-semibold tracking-tight text-black dark:text-white'>
        <div className={`inline-flex mr-1.5 w-3 h-3 rounded-full ${statusToColor[courseStatus]}`} />
        {courseId}: {courseName}
      </h5>
      <div className='flex flex-wrap overflow-auto'>{skillList}</div>
    </div>
  );
}
