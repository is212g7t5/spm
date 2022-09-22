import React from 'react'
import CourseTile from './CourseTile';

function Course () {
  return (
    <div className="flex flex-col container w-9/12 max-w-7xl mt-10 p-10 mx-auto w-full bg-white rounded-lg shadow-lg shadow-blue-200">
      <h1 className="text-3xl text-left font-bold">Courses</h1>
      <CourseTile courseId='IS111' courseName='Intro to Programming'/>
      <CourseTile courseId='IS113' courseName='Web App Dev 1'/>
    </div>
  );
};

export default Course;