import React, { useState, useEffect } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  BriefcaseIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useHistory } from "react-router-dom";
import { useLJContext } from "src/contexts/LJContext";
import { useUpdateJobContext } from "src/contexts/UpdateJobContext";
import { useUserContext } from "src/contexts/UserContext";
import { updateJob } from "src/api/jobs";
import SkillBadge from "./SkillBadge";
import JobDeletionPopUp from "./hr/JobDeletionPopUp";

export default function JobTile({ jobId, jobName, jobDesc, skills, isActive, setJobs }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isButtonPopUpOpen, setIsButtonPopUpOpen] = useState(false);

  const { currentUserType } = useUserContext();
  const { setSelectedJobRole } = useLJContext();
  const { setUpdateJobRole } = useUpdateJobContext();
  const history = useHistory();

  const handleCreateLJButtonClick = (e) => {
    e.stopPropagation();
    setSelectedJobRole({ jobId, jobName, jobDesc, skills, isActive });
    history.push("create-learning-journey");
  };

  const handleEditJobButtonClick = (e) => {
    e.stopPropagation();
    setUpdateJobRole({ jobId, jobName, jobDesc, skills, isActive });
    history.push("update-job");
  };

  const showPopUp = (e) => {
    e.stopPropagation();
    setIsButtonPopUpOpen(true);
  };

  return (
    <div className='container flex-col'>
      <div
        className='flex p-5 m-3 items-center justify-between bg-white rounded-lg shadow hover:shadow-lg cursor-pointer'
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        aria-hidden='true'
      >
        <div className='flex items-center'>
          <BriefcaseIcon className='fs-5 ml-1 mr-2 h-5 w-5' aria-hidden='true' />
          <div className='ml-5'>
            <div className='flex space-x-5 items-center'>
              <div className={"font-medium text-left " + (isActive ? "" : "text-black")}>
                {jobName}
              </div>
              {isActive ? "" : <CreateInactiveBadge />}
            </div>
            <div className='text-black text-sm text-left'>{jobId}</div>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='flex flex-col'>
            {skills.length >= 1 && (
              <CreateLearningJourneyButton handleCreateLJButtonClick={handleCreateLJButtonClick} />
            )}
            <div className='flex'>
              {currentUserType === "HR" && (
                <CreateEditJobButton handleEditJobButtonClick={handleEditJobButtonClick} />
              )}
              {currentUserType === "HR" && isActive ? (
                <CreateDeleteJobButton showPopUp={showPopUp}/>
              ) : null}
            </div>
          </div>
          <JobTileButton isDetailsOpen={isDetailsOpen} setIsDetailsOpen={setIsDetailsOpen} />
          {currentUserType === "HR" && (
            <JobDeletionPopUp
              trigger={isButtonPopUpOpen}
              setTrigger={setIsButtonPopUpOpen}
              jobId={jobId}
              isActive={isActive}
              jobName={jobName}
              setJobs={setJobs}
            />
          )}
        </div>
      </div>
      <div className='mx-3'>
        {isDetailsOpen && <JobTileDescription jobDesc={jobDesc} skills={skills} />}
      </div>
    </div>
  );
}

function CreateEditJobButton({ handleEditJobButtonClick }) {
  return (
    <button
      type='button'
      className='w-full flex items-center justify-center ml-auto text-white bg-secondary hover:bg-primary focus:ring-2 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 text-center m-1'
      onClick={handleEditJobButtonClick}
    >
      <PencilSquareIcon className='mr-2 h-5 w-5' aria-hidden='true' />
      <span>Edit</span>
    </button>
  );
}

function CreateDeleteJobButton({showPopUp}){
  return (
    <button
    type='button'
    className='w-full flex items-center justify-center ml-auto text-white bg-secondary hover:bg-primary focus:ring-2 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 text-center m-1'
    onClick={showPopUp}
  >
    <TrashIcon className='mr-2 h-5 w-5' aria-hidden='true' />
    <span>Delete</span>
  </button>
  );
}

function CreateInactiveBadge() {
  return (
    <span className='bg-gray-100 text-black mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
      Inactive
    </span>
  );
}

function CreateLearningJourneyButton({ handleCreateLJButtonClick }) {
  return (
    <button
      type='button'
      className='w-full ml-auto text-white bg-accent2 hover:bg-accent3 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-1'
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
    <div className='m-auto flex flex-col w-full p-5 px-10 bg-gray-100 rounded-lg'>
      <p className='text-ellipsis overflow-hidden font-medium text-justify'>{jobDesc}</p>
      {skills.length ? (
        <div className='flex mt-5'>{renderSkillsForJobRole}</div>
      ) : (
        "No current skills"
      )}
    </div>
  );
}
