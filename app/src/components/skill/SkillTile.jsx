import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";
import CourseBadge from "./CourseBadge";

export default function SkillTile({ skillId, skillName, skillDesc, courses, isActive }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className='container flex-col'>
      <div
        className='flex p-5 m-3 items-center justify-between bg-white rounded-lg shadow hover:shadow-lg cursor-pointer'
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        aria-hidden='true'
      >
        <div className='flex items-center'>
          <StarIcon className='fs-5 m-1 mr-2 h-5 w-5' aria-hidden='true' />
          <div className='ml-5'>
            <div className='flex space-x-3 items-center'>
              <div className={"font-medium text-left " + (isActive ? "" : "text-gray-400")}>{skillName}</div>
              {isActive ? "" : <CreateInactiveBadge />}
            </div>
            <div className='text-gray-600 text-sm text-left'>{skillId}</div>
          </div>
        </div>
        <SkillTileButton isDetailsOpen={isDetailsOpen} setIsDetailsOpen={setIsDetailsOpen} />
      </div>
      {isDetailsOpen && <SkillTileDescription skillDesc={skillDesc} courses={courses} />}
    </div>
  );
}

function CreateInactiveBadge() {
  return (
    <span className='bg-textColor2 text-gray-400 mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
      Inactive
    </span>
  );
}

function SkillTileButton({ isDetailsOpen, setIsDetailsOpen }) {
  return (
    <button className='w-10 text-right flex justify-end' type='button'>
      {isDetailsOpen ? (
        <ChevronDownIcon className='w-5 h-5' aria-hidden='true' />
      ) : (
        <ChevronRightIcon className='w-5 h-5' aria-hidden='true' />
      )}
    </button>
  );
}

function SkillTileDescription({ skillDesc, courses }) {
  const renderCoursesForSkill = courses.map((course, index) => {
    const { courseId, courseName, courseDesc, courseStatus } = course;
    if (courseStatus === "Active") {
      return <CourseBadge key={index} courseName={courseName} />;
    }
    return null;
  });

  return (
    <div className='m-auto flex flex-col w-11/12 p-5 px-10'>
      <p className='font-medium text-justify'>{skillDesc}</p>
      {courses.length ? (
        <div className='flex-grid mt-5'>{renderCoursesForSkill}</div>
      ) : (
        "No courses attached to this skill"
      )}
    </div>
  );
}
