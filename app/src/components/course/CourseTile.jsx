import React from 'react'
import { ArrowRightIcon, BookOpenIcon } from '@heroicons/react/20/solid'

function CourseTile ({courseId, courseName}) {
  return (
    <div className="flex flex-col container w-8/12 max-w-5xl mt-5 mx-auto w-full items-center justify-center bg-white rounded-lg shadow">
      <ul className="flex flex-col divide-y w-full">
        <li className="flex flex-row">
          <div className="select-none cursor-pointer hover:bg-gray-100 flex flex-1 items-center p-4">
            <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
              <BookOpenIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            </div>
            <div className="flex-1 pl-3">
              <div className="font-medium text-left">{courseName}</div>
              <div className="text-gray-600 text-sm text-left">{courseId}</div>
            </div>
            <div className="flex flex-row justify-center">
              <button className="w-10 text-right flex justify-end" type="button">
                <ArrowRightIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CourseTile;
