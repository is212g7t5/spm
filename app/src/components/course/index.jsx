import React from "react";
import CourseTile from "./CourseTile";

function Course() {
  const courseData = [
    {
      courseId: "IS111",
      courseName: "Introduction to Information Systems",
      courseStatus: "Active",
      courseDesc:
        "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications.",
      registrationStatus: "Registered",
      completionStatus: "Completed",
    },
    {
      courseId: "IS112",
      courseName: "Data Management",
      courseStatus: "Retired",
      courseDesc:
        "This course will cover fundamentals of relational database theory, important data management concepts such as data modelling, database design, database implementation and searches in un-structured data (i.e., text) in current business information systems. A series of in-class exercises, tests, pop quiz and course project will help students understand covered topics. Students are expected to apply knowledge learned in the classroom to solve many problems based upon real-life business scenarios, while gaining hands-on experiences in designing, implementing, and managing database systems.",
      registrationStatus: "Registered",
      completionStatus: "Not Completed",
    },
    {
      courseId: "IS113",
      courseName: "Web Application Development 1",
      courseStatus: "Active",
      courseDesc:
        "Web applications are commonly used today by governments, enterprises, and even individuals to provide information, market products, etc. Ability to create web applications is thus a crucial skill for graduates in Information Systems. This course is designed to equip students with the knowledge and skill to develop well-styled database-driven web applications.",
      registrationStatus: "Waitlisted",
      completionStatus: "Not Completed",
    },
    {
      courseId: "IS212",
      courseName: "Software Project Management",
      courseStatus: "Active",
      courseDesc:
        "In this course, you will be exposed to Software Project management principles and techniques. Specifically, you will learn about Agile Methods to build software. You will be exposed to popular Agile methods such as Scrum. Techniques such as Pair Programming, C4 architecture, Test-Driven Development (TDD), Code Refactoring and Continuous Integration (CI). You will experience software development and project management by working in a team to develop a simple web application or an application that makes use of data analytics.",
      registrationStatus: "Rejected",
      completionStatus: "Not Completed",
    },
  ];

  const courseList = courseData.map((course, index) => (
    <CourseTile
      key={index}
      courseId={course.courseId}
      courseName={course.courseName}
      courseDesc={course.courseDesc}
      courseStatus={course.courseStatus}
      registrationStatus={course.registrationStatus}
      completionStatus={course.completionStatus}
    />
  ));

  return (
    <div className='flex flex-row container w-9/12 max-w-7xl mt-10 p-10 mx-auto w-full bg-white rounded-lg shadow-lg shadow-blue-200'>
      <h1 className='text-3xl text-left font-bold'>Courses</h1>
      {courseList}
    </div>
  );
}

export default Course;
