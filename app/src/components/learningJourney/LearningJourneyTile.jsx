import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DropdownButton from "./DropdownButton";

function LearningJourneyTile({
  LJId,
  jobName,
  jobDesc,
  isJobActive,
  onDeletionModalOpen,
  setSelectedLJ,
  LJImgUrl,
}) {
  const [isDropdownButtonClicked, setIsDropdownButtonClicked] = useState(false);

  const history = useHistory();

  const onDropdownButtonClick = () => {
    setIsDropdownButtonClicked(!isDropdownButtonClicked);
    setSelectedLJ(LJId);
  };

  const navigateToLJDetails = () => {
    history.push(`/learning-journeys/${LJId}`);
  };

  return (
    <div className="w-sm flex-col">
      <div className='h-full object-fill bg-white rounded-lg border border-gray-100 hover:shadow-lg mx-auto'>
        <div className='flex justify-end px-4 pt-4'>
          <button
            id='dropdownButton'
            onClick={onDropdownButtonClick}
            className='inline-block text-black hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 rounded-lg text-sm p-1.5'
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

          {isDropdownButtonClicked && (
            <DropdownButton
              navigateToLJDetails={navigateToLJDetails}
              onDeletionModalOpen={onDeletionModalOpen}
              onDropdownButtonClick={onDropdownButtonClick}
            />
          )}
        </div>

        <div className='flex flex-col items-center pb-10'>
          <img
            className='mb-3 w-24 h-24 rounded-full shadow-lg'
            src={LJImgUrl}
            alt='Person'
          />
          <h5 className='mb-1 text-xl font-medium text-black'>Learning Journey {LJId}</h5>
          <span className={"text-md italic " + (isJobActive ? "text-black" : "text-gray-500")}>
            {jobName}
            {isJobActive ? "" : <CreateInactiveBadge />}
          </span>
          <span className='text-sm p-5 text-center'>{jobDesc}</span>
        </div>
      </div>
    </div>
  );
}

function CreateInactiveBadge() {
  return (
    <span className='ml-1 bg-gray-100 text-gray-400 mr-2 px-2.5 py-0.5 rounded'>Inactive</span>
  );
}

export default LearningJourneyTile;
