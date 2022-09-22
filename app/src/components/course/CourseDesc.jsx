import React from 'react';

export default function CourseDesc({desc}) {
  return (
    <div className="flex flex-row w-full bg-gray-100 p-4">
      <div className="flex flex-col w-full">
        <div className="font-medium text-left">{desc}</div>
      </div>
    </div>
  );
}
