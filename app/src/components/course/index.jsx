import React from 'react'
import courseData from './courseData.json';
import CourseTile from './CourseTile';

function Course () {
  const courseList = courseData.map((course) => 
    <CourseTile courseId={course.courseId} courseName={course.courseName} courseDesc={course.courseDesc} courseStatus={course.courseStatus} />
  );

  return (
    <div className="flex flex-col container w-9/12 max-w-7xl mt-10 p-10 mx-auto w-full bg-white rounded-lg shadow-lg shadow-blue-200">
      <h1 className="text-3xl text-left font-bold">Courses</h1>
      {courseList}
    </div>
  );
};

export default Course;
