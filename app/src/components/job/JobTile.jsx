import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, BriefcaseIcon } from "@heroicons/react/20/solid";

function JobTile({ jobId, jobName, jobDesc }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  function createLJ(selectedId) {
    console.log(selectedId);
  }

  return (
    <div className='flex flex-col container  max-w-5xl mt-5 mx-auto w-full items-center justify-center bg-white rounded-lg shadow'>
      <ul className='flex flex-col divide-y w-full'>
        <li className='flex flex-row'>
          <div className='select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4'>
            <div className='flex flex-col w-10 h-10 justify-center items-center mr-4'>
              <BriefcaseIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
            </div>
            <div className='flex-1 pl-3'>
              <div className='font-medium text-left'>{jobName}</div>
              <div className='text-gray-600 text-sm text-left'>{jobDesc}</div>
            </div>
            <div className='flex flex-row justify-center'>
              {/* Create LJ button */}
              <button
                type='button'
                className='text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-1'
                onClick={() => createLJ(jobId)}
              >
                <span>Create Learning Journey</span>
              </button>
            </div>
            <div className='flex flex-row justify-center'>
              <button
                className='w-10 text-right flex justify-end'
                type='button'
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              >
                {isDetailsOpen ? (
                  <ChevronDownIcon className='w-5 h-5' aria-hidden='true' />
                ) : (
                  <ChevronRightIcon className='w-5 h-5' aria-hidden='true' />
                )}
              </button>
            </div>
          </div>
        </li>
      </ul>
      {isDetailsOpen ? "Details Open!!!" : null}
    </div>
  );
}

export default JobTile;
