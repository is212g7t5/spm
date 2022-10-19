import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  StarIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useUserContext } from "src/contexts/UserContext";
import { updateSkill } from "src/api/skills";
import CourseBadge from "./CourseBadge";
import StopDeactivateSkillModal from "./hr/StopDeactivateSkillModal";

export default function SkillTile({
  skillId,
  skillName,
  skillDesc,
  courses,
  isActive,
  isDeactivateSkillButtonClick,
  setDeactivateSkillButtonClick,
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isStopDeactivateSkillModalOpen, setStopDeactivateSkillModalOpen] = useState(false);
  const { currentUserType } = useUserContext();

  const handleEditSkillButtonClick = () => {
    console.log("Edit Skill selected");
  };

  const onStopDeactivateSkillModalOpen = () => {
    setStopDeactivateSkillModalOpen(true);
  };

  const onStopDeactivateSkillModalClose = () => {
    setStopDeactivateSkillModalOpen(false);
  };

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
              <div className={"font-medium text-left " + (isActive ? "" : "text-black")}>
                {skillName}
              </div>
              {isActive ? "" : <CreateInactiveBadge />}
            </div>
            <div className='text-black text-sm text-left'>{skillId}</div>
          </div>
        </div>
        <div className='flex items-center'>
          {currentUserType === "HR" && (
            <div className='flex flex-col'>
              <CreateEditSkillButton handleEditSkillButtonClick={handleEditSkillButtonClick} />
              <CreateDeactivateSkillButton
                onStopDeactivateSkillModalOpen={onStopDeactivateSkillModalOpen}
                skillId={skillId}
                skillName={skillName}
                skillDesc={skillDesc}
                isActive={isActive}
                isDeactivateSkillButtonClick={isDeactivateSkillButtonClick}
                setDeactivateSkillButtonClick={setDeactivateSkillButtonClick}
              />
              {isStopDeactivateSkillModalOpen && (
                <StopDeactivateSkillModal
                  isStopDeactivateSkillModalOpen={isStopDeactivateSkillModalOpen}
                  onStopDeactivateSkillModalClose={onStopDeactivateSkillModalClose}
                />
              )}
            </div>
          )}
          <SkillTileButton isDetailsOpen={isDetailsOpen} setIsDetailsOpen={setIsDetailsOpen} />
        </div>
      </div>
      {isDetailsOpen && <SkillTileDescription skillDesc={skillDesc} courses={courses} />}
    </div>
  );
}

function CreateEditSkillButton({ handleEditSkillButtonClick }) {
  return (
    <button
      type='button'
      className='w-full flex items-center mr-5 justify-center ml-auto text-textColor bg-secondary hover:bg-tertiary focus:ring-4 rounded-lg text-sm px-5 py-2.5 text-center m-1'
      onClick={handleEditSkillButtonClick}
    >
      <PencilSquareIcon className='mr-2 h-5 w-5' aria-hidden='true' />
      <span>Edit</span>
    </button>
  );
}

function CreateDeactivateSkillButton({
  onStopDeactivateSkillModalOpen,
  skillId,
  skillName,
  skillDesc,
  isActive,
  isDeactivateSkillButtonClick,
  setDeactivateSkillButtonClick,
}) {
  const onDeactivateSkillButtonClick = (e) => {
    e.stopPropagation();
    deactivateSkills();

    async function deactivateSkills() {
      await updateSkill(skillId, skillName, skillDesc, 0);
      setDeactivateSkillButtonClick(!isDeactivateSkillButtonClick);
    }
  };

  return (
    <div>
      {isActive === 1 ? (
        <button
          type='button'
          className='flex w-full items-center mr-5 justify-center ml-auto text-white bg-accent2 hover:bg-accent1 focus:ring-4 ring-tertiary rounded-lg text-sm px-1 py-2.5 text-center m-1'
          onClick={onDeactivateSkillButtonClick}
        >
          <TrashIcon className='mr-2 h-5 w-5' aria-hidden='true' />
          Deactivate
        </button>
      ) : (
        <button
          type='button'
          className='flex w-full items-center mr-5 justify-center ml-auto text-gray-400 bg-accent2 rounded-lg text-sm px-2 py-2.5 text-center m-1'
          onClick={onStopDeactivateSkillModalOpen}
        >
          <TrashIcon className='mr-2 h-5 w-5' aria-hidden='true' />
          Deactivate
        </button>
      )}
    </div>
  );
}

function CreateInactiveBadge() {
  return (
    <span className='bg-primary text-black mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
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
