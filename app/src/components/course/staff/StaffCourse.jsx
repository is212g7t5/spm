import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllCoursesAndActiveSkills } from "src/api/course";
import { useUserContext } from "src/contexts/UserContext";
import CourseTile from "../CourseTile";

function StaffCourse() {
  const [courses, setCourses] = useState([]);
  const { currentUserId } = useUserContext();

  useEffect(() => {
    getAllCourses();

    async function getAllCourses() {
      const coursesReturnedFromBackend = await getAllCoursesAndActiveSkills();
      if (coursesReturnedFromBackend.length === 0) {
        toast.warning("There are no courses to display");
      }
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
      skills={course.skills}
    />
  ));

  const courseComponent = (props) => (
    <div className='flex flex-col container w-9/12 max-w-7xl mt-10 p-10 mx-auto w-full bg-white rounded-lg shadow-lg shadow-blue-200'>
      <p>{props}</p>
      <h1 className='text-3xl text-left font-bold'>Courses</h1>
      {courses.length === 0 ? "No Courses Found" : renderCourses}
    </div>
  )

  return (
    <div className='flex flex-col container w-9/12 max-w-7xl mt-10 p-10 mx-auto w-full bg-white rounded-lg shadow-lg shadow-blue-200'>
      <h1 className='text-3xl text-left font-bold'>Courses</h1>
      {courses.length === 0 ? "No Courses Found" : renderCourses}
    </div>
  )
}

export default StaffCourse;