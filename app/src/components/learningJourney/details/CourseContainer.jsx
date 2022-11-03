import React from "react";
import CourseCard from "./CourseCard";

export default function CourseContainer({ LJId, staffId, LJCourseIds }) {
  const renderCourseCards = LJCourseIds.map((LJCourseId, index) => (
    <CourseCard key={index} courseId={LJCourseId} staffId={staffId} />
  ));

  const renderStatusToColorLegend = Object.entries(statusToColor).map(([key, value], index) => (
    <React.Fragment key={key}>
      <div className={`w-3.5 h-3.5 mb-1.5 rounded-full ${value}`} />
      <span className='text-sm mb-1 ml-0.5 mr-2.5'>{key}</span>
    </React.Fragment>
  ));

  return (
    <div className='flex flex-col lg:col-span-3'>
      <div className='lg:flex'>
        <h2 className='mt-1 text-xl font-semibold'>Added Courses</h2>
      </div>
      <div className="flex flex-wrap mt-2">
        {renderStatusToColorLegend}
      </div>
      <div className='flex w-full max-h-72 lg:max-h-screen overflow-auto bg-white rounded-lg border border-gray-200 shadow-lg my-5 p-5'>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 m-2'>
          {renderCourseCards.length === 0 ? "No Courses added yet" : renderCourseCards}
        </div>
      </div>
    </div>
  );
}

const statusToColor = {
  Completed: "bg-green-500",
  Rejected: "bg-red-500",
  Waitlisted: "bg-blue-200",
  Registered: "bg-yellow-500",
  Ongoing: "bg-purple-500",
  "Not Registered": "bg-gray-100",
};
