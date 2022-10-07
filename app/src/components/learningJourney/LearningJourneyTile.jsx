import React from "react";
import DropdownButton from "./DropdownButton";

function LearningJourneyTile({ LJId, jobName, jobDesc, isJobActive }) {
  if (!isJobActive) {
    return null;
  }

  return (
    <div className='max-w-sm bg-white rounded-lg border border-gray-100 hover:shadow-lg hover:shadow-orange-200 mt-10 mx-auto'>
      <DropdownButton />

      <div className="flex flex-col items-center pb-10">
      <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3580&q=80" alt="Person" />
        <h5 className="mb-1 text-xl font-medium text-gray-900">Learning Journey {LJId}</h5>
        <span className="text-md text-gray-500 italic">{jobName}</span>
        <span className="text-sm p-5 text-center">{jobDesc}</span>
      </div>
    </div>
  );
}

export default LearningJourneyTile;
