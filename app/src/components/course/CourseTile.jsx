import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, BookOpenIcon } from "@heroicons/react/20/solid";
import { useUserContext } from "src/contexts/UserContext";
import CourseDescription from "./CourseDescription";
import RegistrationStatusBadge from "./RegistrationStatusBadge";

function CourseTile({
  staffId,
  courseId,
  courseName,
  courseDesc,
  courseStatus,
  registrationStatus,
  completionStatus,
  skills,
}) {
  const { currentUserType } = useUserContext();
  const [isDescOpen, setIsDescOpen] = useState(false);

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
            <div className='flex space-x-5 items-center'>
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
          <CourseTileButton isDescOpen={isDescOpen} />
        </div>
      </div>
      <div className='mx-3'>
        {isDescOpen && <CourseDescription courseDesc={courseDesc} skills={skills} />}
      </div>
    </div>

    /* <div className='flex flex-col container w-8/12 max-w-5xl mt-5 mx-auto w-full items-center justify-center bg-white rounded-lg shadow transition duration-150'>
      <ul className='flex flex-col divide-y w-full'>
        <li className='flex flex-row'>
          <div className='select-none cursor-pointer hover:bg-gray-100 flex flex-1 items-center p-4'>
            <div className='flex flex-col w-10 h-10 justify-center items-center mr-4'>
              <BookOpenIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
            </div>
            <div className='flex-1 pl-3'>
              <div className='font-medium text-left'>
                {courseName}
                {currentUserType === "STAFF" ? (
                  <RegistrationStatusBadge staffId={staffId} courseId={courseId} />
                ) : null}
                {currentUserType === "HR" ? (
                  <CourseStatusBadge courseStatus={courseStatus} />
                ) : null}
              </div>
              <div className='text-black text-sm text-left'>{courseId}</div>
            </div>
            <div className='flex flex-row justify-center'>
              <button
                className='w-10 text-right flex justify-end'
                type='button'
                onClick={() => setIsDescOpen(!isDescOpen)}
              >
                {isDescOpen ? (
                  <ArrowDownIcon className='w-5 h-5 transition ease-in-out' aria-hidden='true' />
                ) : (
                  <ArrowRightIcon className='w-5 h-5 transition ease-in-out' aria-hidden='true' />
                )}
              </button>
            </div>
          </div>
        </li>
      </ul>
      {isDescOpen ? <CourseDescription desc={courseDesc} /> : null}
    </div> */
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
    <span className={`text-sm font-medium mx-3 px-2.5 py-0.5 rounded ${badgeColour[courseStatus]}`}>
      {courseStatus}
    </span>
  );
}

export default CourseTile;
