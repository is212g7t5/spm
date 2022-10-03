import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";
import JobBadge from "./JobBadge";

export default function SkillTile({ skillId, skillName, skillDesc, jobs }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className='container flex-col'>
      <div
        className='flex p-5 m-3 items-center justify-between bg-white rounded-lg shadow hover:shadow-lg cursor-pointer'
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        aria-hidden="true"
      >
        <StarIcon className='fs-5 ml-1 mr-2 h-5 w-5' aria-hidden='true' />
        <div className='ml-5'>
          <div className='font-medium text-left'>{skillName}</div>
          {/* skillName and skillId is in the middle of the container, can't seem to shift left. Padding, border and margin are not the cause. Please help  */}
          <div className='text-gray-600 text-sm text-left'>{skillId}</div>
        </div>
        <SkillTileButton isDetailsOpen={isDetailsOpen} setIsDetailsOpen={setIsDetailsOpen} />
      </div>
      {isDetailsOpen && <SkillTileDescription skillDesc={skillDesc} jobs={jobs} />}
      {/* Can't seem to render jobs for skill */}
    </div>
  );
}

function CreateLearningJourneyButton({ handleCreateLJButtonClick }) {
  return (
    <button
      type='button'
      className='mr-5 ml-auto text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-1'
      onClick={handleCreateLJButtonClick}
    >
      <span>Create Learning Journey</span>
    </button>
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

function SkillTileDescription({ skillDesc, jobs }) {
  const renderJobRolesForSkill = jobs.map(({ jobId, jobName, jobDesc }, index) => (
    <JobBadge key={`job-${jobId}`} jobName={jobName} />
  ));

  return (
    <div className='m-auto flex flex-col w-11/12 p-5 px-10'>
      <p className='font-medium text-justify'>{skillDesc}</p>
      <div className='flex mt-5'>{renderJobRolesForSkill}</div>
      {/* render jobroles for skill not working for some reason */}
    </div>
  );
}
