import React from "react";
import { PencilIcon } from "@heroicons/react/20/solid";

export default function AddCourseButton({ startLJEditProcess, isJobActive }) {

  return (
    <button
      type='button'
      className={(isJobActive ? "bg-accent2 hover:bg-accent3" : "bg-gray-400 cursor-not-allowed") + " my-5 flex items-center place-content-center w-48 h-12 text-white rounded-lg shadow-md"}
      onClick={(isJobActive ? startLJEditProcess : () => {})}
    >
      <PencilIcon className='h-4 w-6' />
      <span>Edit Learning Journey</span>
    </button>
  );
}
