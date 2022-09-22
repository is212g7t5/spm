import React from 'react'

function CourseTile ({courseId, courseName}) {
  return (
    <div className="flex flex-col container max-w-md mt-10 mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
      <ul className="flex flex-col divide-y w-full">
        <li className="flex flex-row">
          <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
            <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
              <a href="/#" className="block relative">
                <img alt="profil" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80" className="mx-auto object-cover rounded-full h-10 w-10" />
              </a>
            </div>
            <div className="flex-1 pl-1">
              <div className="font-medium dark:text-white">{courseId}</div>
              <div className="text-gray-600 dark:text-gray-200 text-sm">{courseName}</div>
            </div>
            <div className="flex flex-row justify-center">
              <div className="text-gray-600 dark:text-gray-200 text-xs">6:00 AM</div>
              <button className="w-10 text-right flex justify-end" type="button">
                <svg width="20" fill="currentColor" height="20" className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"/>
                </svg>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CourseTile;
