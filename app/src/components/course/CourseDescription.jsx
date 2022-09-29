import React from "react";

export default function CourseDescription({ desc }) {
  return (
    <div className='flex flex-row w-full p-4 transition duration-150 ease-in-out'>
      <div className='flex flex-col w-full'>
        <div className='font-medium text-left'>{desc}</div>
      </div>
    </div>
  );
}
