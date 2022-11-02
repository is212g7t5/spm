import React from "react";

export default function CourseBadge({ courseName }) {
  return (
    <span className='bg-accent4 text-accent1 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded'>
      {courseName}
    </span>
  );
}
