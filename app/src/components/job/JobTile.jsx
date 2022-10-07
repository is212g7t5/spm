import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, BriefcaseIcon } from "@heroicons/react/20/solid";
import { useHistory } from "react-router-dom";
import { useLJCreationContext } from "src/contexts/LJCreationContext";

import SkillBadge from "./SkillBadge";

export default function JobTile({ jobId, jobName, jobDesc, skills, isActive }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { setSelectedJobRole } = useLJCreationContext();
  const history = useHistory();

  const handleCreateLJButtonClick = (e) => {
    e.stopPropagation();
    setSelectedJobRole({ jobId, jobName, jobDesc, skills, isActive });
    history.push("create-learning-journey");
  };

  return (
    <div className='container flex-col'>
      <div
        className='flex p-5 m-3 items-center justify-between bg-white rounded-lg shadow hover:shadow-lg cursor-pointer'
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        aria-hidden='true'
      >
        <BriefcaseIcon className='fs-5 ml-1 mr-2 h-5 w-5' aria-hidden='true' />
        <div className='ml-5 mr-auto'>
          <div className='flex space-x-5 items-center'>
            <div className={"font-medium text-left " + (isActive ? "" : "text-gray-400")}>
              {jobName}
            </div>
            {isActive ? "" : <CreateInactiveBadge />}
          </div>
          <div className='text-gray-600 text-sm text-left'>{jobId}</div>
        </div>
        {skills.length >= 1 && (
          <CreateLearningJourneyButton handleCreateLJButtonClick={handleCreateLJButtonClick} />
        )}
        <JobTileButton isDetailsOpen={isDetailsOpen} setIsDetailsOpen={setIsDetailsOpen} />
      </div>
      <div className='mx-3'>
        {isDetailsOpen && <JobTileDescription jobDesc={jobDesc} skills={skills} />}
      </div>
    </div>
  );
}

function CreateInactiveBadge() {
  return (
    <span className='bg-gray-200 text-gray-400 mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
      Inactive
    </span>
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
    <button className='ml-5 w-5 text-right flex justify-end' type='button'>
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
    <div className='m-auto flex flex-col w-full p-5 px-10 bg-slate-100 rounded-lg'>
      <p className='font-medium text-justify'>{jobDesc}</p>
      {skills.length ? (
        <div className='flex mt-5'>{renderSkillsForJobRole}</div>
      ) : (
        "No current skills"
      )}
    </div>
  );
}
