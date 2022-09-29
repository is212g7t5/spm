import React from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import AddCourseButton from "./AddCourseButton";
import CourseCard from "./CourseCard";

export default function CourseContainer() {

    const courseData = [
        {
            courseId: "IS111",
            courseName: "Introduction to Information Systems",
            courseStatus: "Completed",
            courseDesc:
                "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications.",
        },
        {
            courseId: "IS112",
            courseName: "Data Management",
            courseStatus: "Waitlisted",
            courseDesc:
                "This course will cover fundamentals of relational database theory, important data management concepts such as data modelling, database design, database implementation and searches in un-structured data (i.e., text) in current business information systems. A series of in-class exercises, tests, pop quiz and course project will help students understand covered topics. Students are expected to apply knowledge learned in the classroom to solve many problems based upon real-life business scenarios, while gaining hands-on experiences in designing, implementing, and managing database systems.",
        },
        {
            courseId: "IS113",
            courseName: "Web Application Development 1",
            courseStatus: "Not Registered",
            courseDesc:
                "Web applications are commonly used today by governments, enterprises, and even individuals to provide information, market products, etc. Ability to create web applications is thus a crucial skill for graduates in Information Systems. This course is designed to equip students with the knowledge and skill to develop well-styled database-driven web applications.",
        },
    ];

    // TODO: VERIFY AND REMOVE
    const statusToBadgeClass = {
        "Completed": "bg-green-100 text-green-800",
        "Rejected": "bg-red-100 text-red-800", 
        "Waitlisted": "bg-blue-100 text-blue-800",
        "Registered": "bg-yellow-100 text-yellow-800"
      };

    return (
        <>
            <div className="flex items-end">
                <h2 className="ml-6 mr-3 mt-1 text-2xl font-semibold">Added Courses</h2>
                <div className="w-3.5 h-3.5 mb-1.5 rounded-full bg-blue-500"/>
            </div>
            <div className="flex ml-5 mt-1 max-w-4xl bg-white rounded-lg border border-gray-200 shadow-lg">
                <div className="grid grid-cols-3 gap-3 m-2">
                    <AddCourseButton />
                    {/* <div className="flex flex-col p-2 max-w-xs max-h-32 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-base text-center font-bold tracking-tight text-gray-900 dark:text-white">
                        <span className="text-sm bg-cyan-700 text-white font-medium mr-1.5 px-1.5 py-0.5 rounded">{courseId}</span>
                        {courseName}
                    </h5>
                    <div className="flex flex-wrap overflow-auto">{skillList}</div>
                </div> */}

                    <CourseCard courseName="Intro to Programming" courseId="IS111" courseStatus="Not Registered" />
                    <CourseCard courseName="Intro to Programming" courseId="IS111" courseStatus="Waitlisted" />
                    <CourseCard courseName="Intro to Programming" courseId="IS111" courseStatus="Rejected" />
                    <CourseCard courseName="Intro to Programming" courseId="IS111" courseStatus="Completed" />
                    <CourseCard courseName="Intro to Programming" courseId="IS111" courseStatus="Not Completed" />
                    <CourseCard courseName="Intro to Programming" courseId="IS111" courseStatus="Not Registered" />
                    <CourseCard courseName="Intro to Programming" courseId="IS111" courseStatus="Waitlisted" />
                </div>
            </div>
        </>
    )
}