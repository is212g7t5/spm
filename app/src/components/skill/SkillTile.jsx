import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  StarIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useUserContext } from "src/contexts/UserContext";
import { useUpdateSkillContext } from "src/contexts/UpdateSkillContext";
import { useHistory } from "react-router-dom";
import CourseBadge from "./CourseBadge";
import DeactivateSkillModal from "./hr/DeactivateSkillModal";
import StopDeactivateSkillModal from "./hr/StopDeactivateSkillModal";

export default function SkillTile({
  skillId,
  skillName,
  skillDesc,
  courses,
  isActive,
  selectedSkill,
  setSelectedSkill,
  isDeactivateSkillButtonClick,
  setDeactivateSkillButtonClick,
  isDeactivateSkillModalOpen,
  setDeactivateSkillModalOpen,
  onDeactivateSkillModalClose,
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isStopDeactivateSkillModalOpen, setStopDeactivateSkillModalOpen] = useState(false);
  const { currentUserType } = useUserContext();
  const { setUpdateSkill } = useUpdateSkillContext();
  const history = useHistory();

  const handleEditSkillButtonClick = (e) => {
    e.stopPropagation();
    setUpdateSkill({ skillId, skillName, skillDesc, isActive });
    history.push("update-skill");
  };

  const onStopDeactivateSkillModalOpen = (e) => {
    e.stopPropagation();
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
            <div className='flex space-x-5 items-center'>
              <div className={"font-medium text-left " + (isActive ? "" : "text-gray-400")}>
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
                skillId={skillId}
                skillName={skillName}
                skillDesc={skillDesc}
                isActive={isActive}
                setSelectedSkill={setSelectedSkill}
                isDeactivateSkillModalOpen={isDeactivateSkillModalOpen}
                setDeactivateSkillModalOpen={setDeactivateSkillModalOpen}
                onStopDeactivateSkillModalOpen={onStopDeactivateSkillModalOpen}
              />
              {isDeactivateSkillModalOpen && (
                <DeactivateSkillModal
                  selectedSkill={selectedSkill}
                  isDeactivateSkillModalOpen={isDeactivateSkillModalOpen}
                  onDeactivateSkillModalClose={onDeactivateSkillModalClose}
                  isDeactivateSkillButtonClick={isDeactivateSkillButtonClick}
                  setDeactivateSkillButtonClick={setDeactivateSkillButtonClick}
                />
              )}
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
      <div className='mx-3'>
        {isDetailsOpen && <SkillTileDescription skillDesc={skillDesc} courses={courses} />}
      </div>
    </div>
  );
}

function CreateEditSkillButton({ handleEditSkillButtonClick }) {
  return (
    <button
      type='button'
      className='w-full flex items-center mr-5 justify-center ml-auto text-white bg-secondary hover:bg-primary focus:ring-2 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 text-center m-1'
      onClick={handleEditSkillButtonClick}
    >
      <PencilSquareIcon className='mr-2 h-5 w-5' aria-hidden='true' />
      <span>Edit</span>
    </button>
  );
}

function CreateDeactivateSkillButton({
  skillId,
  skillName,
  skillDesc,
  isActive,
  setSelectedSkill,
  isDeactivateSkillModalOpen,
  setDeactivateSkillModalOpen,
  onStopDeactivateSkillModalOpen,
}) {
  const handleDeactivateActiveSkillButtonClick = (e) => {
    e.stopPropagation();
    setSelectedSkill({ skillId, skillName, skillDesc });
    setDeactivateSkillModalOpen(!isDeactivateSkillModalOpen);
  };

  return (
    <div>
      {isActive === 1 ? (
        <button
          type='button'
          className='flex w-full items-center mr-5 justify-center ml-auto text-white bg-accent2 hover:bg-accent3 focus:ring-2 focus:ring-gray-300 ring-tertiary rounded-lg text-sm px-1 py-2.5 text-center m-1'
          onClick={handleDeactivateActiveSkillButtonClick}
        >
          <TrashIcon className='mr-2 h-5 w-5' aria-hidden='true' />
          Deactivate
        </button>
      ) : (
        <button
          type='button'
          className='flex w-full items-center mr-5 justify-center ml-auto text-white bg-gray-400 rounded-lg text-sm px-2 py-2.5 text-center m-1'
          onClick={onStopDeactivateSkillModalOpen}
        >
          <TrashIcon className='mr-2 h-5 w-5' aria-hidden='true' />
          Deactivated
        </button>
      )}
    </div>
  );
}

function CreateInactiveBadge() {
  return <span className='bg-gray-100 text-gray-400 mr-2 px-2.5 py-0.5 rounded'>Inactive</span>;
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
      <p className='text-ellipsis overflow-hidden font-medium text-justify'>{skillDesc}</p>
      {courses.length ? (
        <div className='flex flex-wrap mt-5 '>{renderCoursesForSkill}</div>
      ) : (
        "No courses attached to this skill"
      )}
    </div>
  );
}
