import React, { useState } from "react";
import "flowbite";
import LJDeletionPopUp from "./details/LJDeletionPopUp";

function DropdownButton(LJId) {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative inset-y-10 -inset-x-9'>
      <div
        id='dropdown'
        className='absolute z-10 w-44 text-base list-none bg-white border border-gray-100 rounded divide-y divide-gray-100 opacity-100'
      >
        <ul className='py-1' aria-labelledby='dropdownButton'>
          <li>
            <a href='/#' className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100'>
              Edit
            </a>
          </li>
          <li>
            <a
              href='/#'
              className='block py-2 px-4 text-sm text-red-600 hover:bg-gray-100'
              onClick={onClick}
            >
              Delete
            </a>
          </li>
        </ul>
      </div>

      {isOpen && <LJDeletionPopUp LJId={LJId} />}
    </div>
  );
}

export default DropdownButton;
