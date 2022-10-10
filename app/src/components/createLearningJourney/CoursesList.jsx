import React from "react";
import { useLJCreationContext } from "src/contexts/LJCreationContext";
import { XCircleIcon } from "@heroicons/react/20/solid";

export default function CoursesList() {
  const { selectedCourseDetails } = useLJCreationContext();

  return (
    <div className='flex-col mt-10 bg-background rounded-lg px-5 py-3'>
      <h2 className='text-lg font-bold text-secondary dark:text-white'>Courses Added:</h2>
      <p className='text-sm font-light text-gray-900 dark:text-white italic'>
        Here are your courses. Click on the cross to remove a course from your Learning Journey.
      </p>
      <CoursesBody courses={selectedCourseDetails} />
    </div>
  );
}

function CoursesBody({ courses }) {
  const renderCourseBadges = Object.keys(courses).map((courseId, index) => (
    <CourseCard key={index} courseDetails={courses[courseId]} />
  ));

  return (
    <div className='flex grid gap-4 lg:grid-cols-2 2xl:grid-cols-3 mt-5 mx-auto items-center'>
      {Object.keys(courses).length > 0
        ? renderCourseBadges
        : "No courses added yet. Go add a course!"}
    </div>
  );
}

function CourseCard({ courseDetails }) {
  return (
    <div className='relative p-10 md:h-60 xl:h-72 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
      <CourseCardCloseButton courseId={courseDetails.courseId} />
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
        {courseDetails.courseName}
      </h5>
      <p className='h-full font-normal text-gray-700 dark:text-gray-400'>
        {courseDetails.courseDesc}
      </p>
    </div>
  );
}

function CourseCardCloseButton({ courseId }) {
  const { removeCourseIdFromLJ } = useLJCreationContext();

  const handleRemoveCourseIdFromLJ = (courseId) => (e) => {
    if (!courseId) {
      console.log("Course ID is not present");
      return;
    }
    removeCourseIdFromLJ(courseId);
  };

  return (
    <button
      type='button'
      onClick={handleRemoveCourseIdFromLJ(courseId)}
      className='absolute top-3 right-3 text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800'
    >
      <XCircleIcon width={20} height={20} />
      <span className='sr-only'>Icon description</span>
    </button>
  );
}

// {
//     courseId: "IS111",
//     courseName: "Introduction to Information Systems",
//     courseStatus: "Active",
//     courseDesc:
//       "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications.",
//     registrationStatus: "Registered",
//     completionStatus: "Completed",
//   },
