import React from "react";
import "flowbite";
import LJDeletionPopUpButton from "./details/LJDeletionPopUpButton";

function DropdownButton(ljId) {
  return (
    <div className="flex justify-end px-4 pt-4">
      <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded-lg text-sm p-1.5" type="button">
        <span className="sr-only">Open dropdown</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/></svg>
      </button>

      <div id="dropdown" className="hidden z-10 w-44 text-base list-none bg-white border border-gray-100 rounded divide-y divide-gray-100">
        <ul className="py-1" aria-labelledby="dropdownButton">
        <li>
          <a href="/#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
        </li>
        <li>
          <LJDeletionPopUpButton ljId={ljId}/>
        </li>
        </ul>
      </div>
    </div>
  );
}

export default DropdownButton;
