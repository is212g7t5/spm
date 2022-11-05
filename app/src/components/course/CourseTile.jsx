import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  BookOpenIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { useUserContext } from "src/contexts/UserContext";
import { useUpdateCourseContext } from "src/contexts/UpdateCourseContext";
import { useHistory } from "react-router-dom";
import CourseDescription from "./CourseDescription";
import RegistrationStatusBadge from "./RegistrationStatusBadge";

function CourseTile({ staffId, courseId, courseName, courseDesc, courseStatus, skills }) {
  const { currentUserType } = useUserContext();
  const [isDescOpen, setIsDescOpen] = useState(false);
  const { setUpdateCourse } = useUpdateCourseContext();
  const history = useHistory();

  const handleEditCourseButtonClick = (e) => {
    e.stopPropagation();
    setUpdateCourse({ courseId, courseName, courseDesc, skills });
    history.push("update-course");
  };

  if (currentUserType === "STAFF" && (courseStatus === "Retired" || courseStatus === "Pending")) {
    return null;
  }

  return (
    <div className='container flex-col'>
      <div
        className='flex p-5 m-3 items-center justify-between bg-white rounded-lg shadow hover:shadow-lg cursor-pointer'
        onClick={() => setIsDescOpen(!isDescOpen)}
        aria-hidden='true'
      >
        <div className='flex items-center'>
          <BookOpenIcon className='fs-5 m-1 mr-2 h-5 w-5' aria-hidden='true' />
          <div className='ml-5'>
            <div className='flex md:flex-row flex-col md:space-x-5 items-start'>
              <div className='font-medium text-left '>{courseName}</div>
              {currentUserType === "STAFF" ? (
                <RegistrationStatusBadge staffId={staffId} courseId={courseId} />
              ) : null}
              {currentUserType === "HR" ? <CourseStatusBadge courseStatus={courseStatus} /> : null}
            </div>
            <div className='text-black text-sm text-left'>{courseId}</div>
          </div>
        </div>
        <div className='flex items-center'>
          {currentUserType === "HR" && courseStatus === "Active" && (
            <div className='flex flex-col'>
              <CreateEditCourseButton handleEditCourseButtonClick={handleEditCourseButtonClick} />
            </div>
          )}
          <CourseTileButton isDescOpen={isDescOpen} />
        </div>
      </div>
      <div className='mx-3'>
        {isDescOpen && <CourseDescription courseDesc={courseDesc} skills={skills} />}
      </div>
    </div>
  );
}

function CreateEditCourseButton({ handleEditCourseButtonClick }) {
  return (
    <button
      type='button'
      className='w-full flex items-center mr-5 justify-center ml-auto text-white bg-secondary hover:bg-primary focus:ring-2 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 text-center m-1'
      onClick={handleEditCourseButtonClick}
    >
      <PencilSquareIcon className='mr-2 h-5 w-5' aria-hidden='true' />
      <span>Edit</span>
    </button>
  );
}

function CourseTileButton({ isDescOpen }) {
  return (
    <button className='w-10 text-right flex justify-end' type='button'>
      {isDescOpen ? (
        <ChevronDownIcon className='w-5 h-5' aria-hidden='true' />
      ) : (
        <ChevronRightIcon className='w-5 h-5' aria-hidden='true' />
      )}
    </button>
  );
}

function CourseStatusBadge({ courseStatus }) {
  const badgeColour = {
    Active: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Retired: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`text-sm font-medium md:mx-3 my-1 md:my-0 px-2.5 py-0.5 rounded ${badgeColour[courseStatus]}`}
    >
      {courseStatus}
    </span>
  );
}

export default CourseTile;
