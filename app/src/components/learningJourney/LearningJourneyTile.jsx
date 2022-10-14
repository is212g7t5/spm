import React, { useState } from "react";
import DropdownButton from "./DropdownButton";

function LearningJourneyTile({ LJId, jobName, jobDesc, isJobActive }) {
  if (!isJobActive) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='max-w-sm bg-white rounded-lg border border-gray-100 hover:shadow-lg hover:shadow-accent2 mt-10 mx-auto'>
      <div className='flex justify-end px-4 pt-4'>
        <button
          id='dropdownButton'
          onClick={onClick}
          className='inline-block text-black hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded-lg text-sm p-1.5'
          type='button'
        >
          <span className='sr-only'>Open dropdown</span>
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
          </svg>
        </button>

        {isOpen && <DropdownButton LJId={LJId} />}
      </div>

      <div className='flex flex-col items-center pb-10'>
        <img
          className='mb-3 w-24 h-24 rounded-full shadow-lg'
          src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3580&q=80'
          alt='Person'
        />
        <h5 className='mb-1 text-xl font-medium text-black'>Learning Journey {LJId}</h5>
        <span className='text-md text-black italic'>{jobName}</span>
        <span className='text-sm p-5 text-center'>{jobDesc}</span>
      </div>
    </div>
  );
}

export default LearningJourneyTile;
