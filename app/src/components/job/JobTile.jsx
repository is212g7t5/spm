import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, BriefcaseIcon } from "@heroicons/react/20/solid";
import { createLearningJourneyWithJobId } from "src/api/learningJourney";
import SkillBadge from "./SkillBadge";

export default function JobTile({ jobId, jobName, jobDesc, skills }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleCreateLJButtonClick = (e) => {
    e.stopPropagation();
    const res = createLearningJourneyWithJobId(jobId);
    console.log(res);
  };

  return (
    <div className='container flex-col'>
      <div
        className='flex p-5 m-3 items-center justify-between bg-white rounded-lg shadow hover:shadow-lg cursor-pointer'
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        aria-hidden="true"
      >
        <BriefcaseIcon className='fs-5 ml-1 mr-2 h-5 w-5' ria-hidden='true' />
        <div className='ml-5'>
          <div className='font-medium text-left'>{jobName}</div>
          <div className='text-gray-600 text-sm text-left'>{jobId}</div>
        </div>
        <CreateLearningJourneyButton handleCreateLJButtonClick={handleCreateLJButtonClick} />
        <JobTileButton isDetailsOpen={isDetailsOpen} setIsDetailsOpen={setIsDetailsOpen} />
      </div>
      {isDetailsOpen && <JobTileDescription jobDesc={jobDesc} skills={skills} />}
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

function JobTileButton({ isDetailsOpen, setIsDetailsOpen }) {
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

function JobTileDescription({ jobDesc, skills }) {
  const renderSkillsForJobRole = skills.map(({ skillId, skillName, skillDesc }, index) => (
    <SkillBadge key={`skill-${skillId}`} skillName={skillName} />
  ));

  return (
    <div className='m-auto flex flex-col w-11/12 p-5 px-10'>
      <p className='font-medium text-justify'>{jobDesc}</p>
      <div className='flex mt-5'>{renderSkillsForJobRole}</div>
    </div>
  );
}
