import React from "react";

export default function CourseBadge({ courseName }) {
  return (
    <span className='bg-blue-200 text-blue-800 text-xl font-semibold mr-4 px-1 py-0.3 rounded dark:bg-blue-200 dark:text-blue-800'>
      {courseName}
    </span>
  );
}
