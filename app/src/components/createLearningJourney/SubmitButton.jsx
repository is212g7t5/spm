import React from "react";
import { useLJCreationContext } from "src/contexts/LJCreationContext";

export default function SubmitButton({onClick}) {
  const { selectedCourseDetails } = useLJCreationContext();

  return (
    <div className="flex-shrink-0 items-center mt-5 mr-auto">
      {
        Object.keys(selectedCourseDetails).length === 0
          ? <button disabled className="relative inline-flex items-center rounded-md border border-transparent text-white bg-gray-300 cursor-not-allowed bg-grey-500 px-4 py-2 text-sm font-medium shadow-sm" type="submit">
            Create Learning Journey
          </button>
          : <button 
              className="relative inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              type="submit"
              onClick={onClick}
            >
            Create Learning Journey
          </button>
      }
    </div>
  )
}
