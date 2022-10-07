import React, { useEffect, useState } from "react";
import { getLearningJourneyCoursesById } from "src/api/learningJourneyCourse";
import AddCourseButton from "./AddCourseButton";
import CourseCard from "./CourseCard";

export default function CourseContainer({ ljId, staffId }) {

    const [ljCourseIds, setLjCourseIds] = useState([]);

    const renderCourseCards = ljCourseIds.map((ljCourseId, index) => (
        <CourseCard courseId={ljCourseId} staffId={staffId}  />
    ))

    useEffect(() => {
        async function getAllCoursesForLJ(ljId) {
            const courseIdsReturnedFromBackend = await getLearningJourneyCoursesById(ljId);
            setLjCourseIds(courseIdsReturnedFromBackend);
        }

        getAllCoursesForLJ(ljId);
    }, []);

    const statusToColor = {
        "Completed": "bg-green-500",
        "Rejected": "bg-red-500",
        "Waitlisted": "bg-blue-500",
        "Registered": "bg-yellow-500",
        "Ongoing": "bg-purple-500",
        "Not Registered": "bg-gray-500"
    };

    const renderStatusToColorLegend = Object.entries(statusToColor).map(([key, value], index) => (
        <>
            <div className={`w-3.5 h-3.5 mb-1.5 rounded-full ${value}`} />
            <span className="text-sm mb-1 ml-0.5 mr-2.5">{key}</span>
        </>
    ));

    return (
        <div className="flex flex-col col-span-4 lg:col-span-3">
            <div className="lg:flex items-end">
                <h2 className="ml-6 mr-3 mt-1 lg:text-2xl font-semibold">Added Courses</h2>
                {renderStatusToColorLegend}
            </div>
            <div className="flex ml-5 max-w-xs lg:max-w-4xl max-h-72 lg:max-h-screen overflow-auto bg-white rounded-lg border border-gray-200 shadow-lg">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 m-2">
                    <AddCourseButton />
                    {renderCourseCards}
                </div>
            </div>
        </div>
    )
}
