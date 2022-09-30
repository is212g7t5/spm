import React from "react";
import AddCourseButton from "./AddCourseButton";
import CourseCard from "./CourseCard";

export default function CourseContainer() {

    // Call Get all Courses for LJ API here
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

    const statusToColor = {
        "Completed": "bg-green-500",
        "Rejected": "bg-red-500",
        "Waitlisted": "bg-blue-500",
        "Registered": "bg-yellow-500",
        "Not Registered": "bg-purple-500"
    };

    const renderStatusToColorLegend = Object.entries(statusToColor).map(([key, value], index) => (
        <>
            <div className={`w-3.5 h-3.5 mb-1.5 rounded-full ${value}`} />
            <span className="text-sm mb-1 ml-0.5 mr-2.5">{key}</span>
        </>
    ));

    return (
        <>
            <div className="flex items-end">
                <h2 className="ml-6 mr-3 mt-1 text-2xl font-semibold">Added Courses</h2>
                {renderStatusToColorLegend}
            </div>
            <div className="flex ml-5 max-w-4xl bg-white rounded-lg border border-gray-200 shadow-lg">
                <div className="grid grid-cols-3 gap-3 m-2">
                    <AddCourseButton />


                    <CourseCard courseName="Intro to Programming" courseId="IS111" completionStatus="Completed" registrationStatus="Registered" />
                    <CourseCard courseName="Intro to Programming" courseId="IS111" completionStatus="Not Completed" registrationStatus="Registered" />
                    <CourseCard courseName="Intro to Programming" courseId="IS111" completionStatus="Not Completed" registrationStatus="Rejected" />
                    <CourseCard courseName="Intro to Programming" courseId="IS111" completionStatus="Not Completed" registrationStatus="Waitlisted" />
                    <CourseCard courseName="Intro to Programming" courseId="IS111" completionStatus="Not Completed" registrationStatus="Not Registered" />
                    <CourseCard courseName="Intro to Programming" courseId="IS111" completionStatus="Completed" registrationStatus="Registered" />
                    <CourseCard courseName="Intro to Programming" courseId="IS111" completionStatus="Completed" registrationStatus="Registered" />
                </div>
            </div>
        </>
    )
}