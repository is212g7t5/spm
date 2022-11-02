import React from "react";
import { useLJContext } from "src/contexts/LJContext";

export default function SubmitButton({ isEditing, createLJ, updateLJ }) {
  const { selectedCourseDetails } = useLJContext();

  const isDisabled = Object.keys(selectedCourseDetails).length === 0;
  const buttonClassNames = isDisabled
    ? "relative inline-flex items-center rounded-md border border-transparent text-white cursor-not-allowed bg-gray-400 px-4 py-2 text-sm font-medium shadow-sm"
    : "relative inline-flex items-center rounded-md border border-transparent bg-accent2 hover:bg-accent3 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300";
  const buttonText = isEditing ? "Update Learning Journey" : "Create Learning Journey";

  return (
    <div className='flex-shrink-0 items-center mt-5 mr-auto'>
      <button
        disabled={isDisabled}
        className={buttonClassNames}
        type='submit'
        onClick={isEditing ? updateLJ : createLJ}
      >
        {buttonText}
      </button>
    </div>
  );
}
