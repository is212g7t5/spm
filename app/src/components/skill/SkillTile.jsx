import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";
import CourseBadge from "./CourseBadge";

export default function SkillTile({ skillId, skillName, skillDesc, courses }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className='container flex-col'>
      <div
        className='flex p-5 m-3 items-center justify-between bg-white rounded-lg shadow hover:shadow-lg cursor-pointer'
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        aria-hidden="true"
      >
        <div className='ml-5 flex items-center'>
        <StarIcon className='fs-5 m-1 mr-2 h-5 w-5' aria-hidden='true' />
          <div className='font-medium'>{skillName}<div className='text-gray-600 text-sm text-left'>{skillId}</div></div>
        </div>
        <SkillTileButton isDetailsOpen={isDetailsOpen} setIsDetailsOpen={setIsDetailsOpen} />
      </div>
      {isDetailsOpen && <SkillTileDescription skillDesc={skillDesc} courses={courses} />}
      {/* Can't seem to render courses for skill */}
    </div>
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
  const renderCoursesForSkill = courses.map(({ courseId, courseName, courseDesc }, index) => (
    <CourseBadge key={`course-${courseId}`} courseName={courseName} />
  ));

  return (
    <div className='m-auto flex flex-col w-11/12 p-5 px-10'>
      <p className='font-medium text-justify'>{skillDesc}</p>
      <div className='flex mt-5'>{renderCoursesForSkill}</div>
      {/* render courses for skill not working for some reason */}
    </div>
  );
}
