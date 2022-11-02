import React from "react";

export default function SearchBar({ title, searchBarPlaceholder }) {
  return (
    <div className='max-w-sm pl-12 pt-3'>
      <h1 className='text-md font-semibold mt-2 mb-3'>{title}</h1>
      <form className='flex items-center'>
        <div className='relative w-full'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <svg
              className='w-5 h-5 text-black dark:text-black'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <input
            type='text'
            id='simple-search'
            className='bg-gray-100 border border-gray-400 focus:border-gray-400 text-black text-sm rounded-lg focus:ring-2 focus:ring-gray-300 block w-full pl-10 p-2.5'
            placeholder={searchBarPlaceholder}
            required
          />
        </div>
        <button
          aria-label='Submit Button'
          type='submit'
          className='p-2.5 ml-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary focus:ring-2 focus:ring-gray-300'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
