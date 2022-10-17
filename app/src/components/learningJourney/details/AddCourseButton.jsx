import React from "react";
import { PencilIcon } from "@heroicons/react/20/solid";

export default function AddCourseButton({ startLJEditProcess }) {

  return (
    <button
      type='button'
      className='inline-flex items-center place-content-center bg-secondary text-white outline-gray-400 w-48 h-12 rounded-lg shadow-md hover:underline underline-offset-2'
      onClick={startLJEditProcess}
    >
      <PencilIcon className='h-4 w-6' />
      <span>Edit Learning Journey</span>
    </button>
  );
}
