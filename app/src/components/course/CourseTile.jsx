import React, { useState } from "react";
import { ArrowRightIcon, ArrowDownIcon, BookOpenIcon } from "@heroicons/react/20/solid";
import CourseDescription from "./CourseDescription";
import CourseStatusBadge from "./CourseStatusBadge";

function CourseTile({
  staffId,
  courseId,
  courseName,
  courseDesc,
  courseStatus,
  registrationStatus,
  completionStatus,
}) {
  const [isDescOpen, setIsDescOpen] = useState(false);

  if (courseStatus !== "Active") {
    return null;
  }

  return (
    <div className='flex flex-col container w-10/12 max-w-5xl mt-5 mx-auto w-full items-center justify-center bg-white rounded-lg shadow'>
      <div className="hover:shadow-lg w-full">
        <ul className='flex flex-col divide-y'>
          <li className='flex flex-row'>
            <div className='select-none cursor-pointer flex flex-1 items-center p-4'>
              <div className='flex flex-col w-10 h-10 justify-center items-center mr-4'>
                <BookOpenIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
              </div>
              <div className='flex-1 pl-3'>
                <div className='font-medium text-left'>
                  {courseName}
                  <CourseStatusBadge staffId={staffId} courseId={courseId} />
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
                    <ArrowDownIcon className='w-5 h-5' aria-hidden='true' />
                  ) : (
                    <ArrowRightIcon className='w-5 h-5' aria-hidden='true' />
                  )}
                </button>
              </div>
            </div>
          </li>
        </ul>
        {isDescOpen ? <CourseDescription desc={courseDesc} /> : null}
      </div>
    </div>
  );
}

export default CourseTile;
