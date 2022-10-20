import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, StarIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { useUserContext } from "src/contexts/UserContext";
import { useUpdateSkillContext } from "src/contexts/UpdateSkillContext";
import { useHistory } from "react-router-dom";
import CourseBadge from "./CourseBadge";

export default function SkillTile({ skillId, skillName, skillDesc, courses, isActive }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { currentUserType } = useUserContext();
  const { setUpdateSkill } = useUpdateSkillContext();
  const history = useHistory();

  const handleEditSkillButtonClick = (e) => {
    e.stopPropagation();
    setUpdateSkill({ skillId, skillName, skillDesc, isActive });
    history.push("update-skill");
  }

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
            <div className='flex space-x-5 items-center'>
              <div className={"font-medium text-left " + (isActive ? "" : "text-gray-400")}>{skillName}</div>
              {isActive ? "" : <CreateInactiveBadge />}
            </div>
            <div className='text-black text-sm text-left'>{skillId}</div>
          </div>
        </div>
        <div className="flex items-center">
          {currentUserType === "HR" && (
            <CreateEditSkillButton handleEditSkillButtonClick={handleEditSkillButtonClick} />
          )}
          <SkillTileButton isDetailsOpen={isDetailsOpen} setIsDetailsOpen={setIsDetailsOpen} />
        </div>
      </div>
      <div className="mx-3">
        {isDetailsOpen && <SkillTileDescription skillDesc={skillDesc} courses={courses} />}
      </div>
    </div>
  );
}

function CreateEditSkillButton({ handleEditSkillButtonClick }) {
  return (
    <button
      type='button'
      className='w-full flex items-center mr-5 justify-center ml-auto text-white bg-primary hover:bg-secondary focus:ring-4 rounded-lg text-sm px-5 py-2.5 text-center m-1'
      onClick={handleEditSkillButtonClick}
    >
      <PencilSquareIcon className='mr-2 h-5 w-5' aria-hidden='true' />
      <span>Edit</span>
    </button>
  );
}

function CreateInactiveBadge() {
  return (
    <span className='bg-gray-100 text-gray-400 mr-2 px-2.5 py-0.5 rounded'>
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
    <div className='m-auto flex flex-col w-full p-5 px-10 bg-gray-100 rounded-lg'>
      <p className='font-medium text-justify'>{skillDesc}</p>
      {courses.length ? (
        <div className='flex-grid mt-5'>{renderCoursesForSkill}</div>
      ) : (
        "No courses attached to this skill"
      )}
    </div>
  );
}
