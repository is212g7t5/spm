import React from 'react'
import CourseTile from './CourseTile';

function Course () {
  return (
    <div className="flex flex-col container w-9/12 max-w-7xl mt-10 p-10 mx-auto w-full bg-white rounded-lg shadow-lg shadow-blue-200">
      <h1 className="text-3xl text-left font-bold">Courses</h1>
      <CourseTile
        courseId='IS111'
        courseName='Intro to Programming'
        courseDesc='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      />
      <CourseTile
        courseId='IS113'
        courseName='Web Application Development 1'
        courseDesc='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      />
    </div>
  );
};

export default Course;
