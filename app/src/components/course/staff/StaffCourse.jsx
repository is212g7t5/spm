import React, { useState, useEffect } from "react";
import { getCoursesandActiveSkills } from "src/api/course";
import { useUserContext } from "src/contexts/UserContext";
import CourseTile from "../CourseTile";

function StaffCourse() {
  const [courses, setCourses] = useState([]);
  const { currentUserId } = useUserContext();

  useEffect(() => {
    getAllCoursesAndActiveSkills();

    async function getAllCoursesAndActiveSkills() {
      const coursesReturnedFromBackend = await getCoursesandActiveSkills();
      setCourses(coursesReturnedFromBackend);
    }
  }, []);

  const renderCourses = courses.map((course, index) => (
    <CourseTile
      key={index}
      staffId={currentUserId}
      courseId={course.courseId}
      courseName={course.courseName}
      courseDesc={course.courseDesc}
      courseStatus={course.courseStatus}
      registrationStatus={course.registrationStatus}
      completionStatus={course.completionStatus}
      skills={course.skills}
    />
  ));

  return (
    <div className='flex flex-col container mt-10 bg-white p-10 mx-auto rounded-lg shadow-lg shadow-blue-200'>
      <h1 className='text-3xl text-left font-bold'>View All Courses</h1>
      {courses.length === 0 ? "No Courses Found" : renderCourses}
    </div>
  );
}

export default StaffCourse;
