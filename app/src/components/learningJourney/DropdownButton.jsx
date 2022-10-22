function DropdownButton({ onDeletionModalClick, navigateToLJDetails }) {
  const handleButtonClick = () => {
    navigateToLJDetails();
    console.log("clicking");
  };

  return (
    <div className='relative inset-y-10 -inset-x-9'>
      <div
        id='dropdown'
        className='absolute z-10 w-44 text-base list-none bg-white border border-gray-100 rounded divide-y divide-gray-100 opacity-100'
      >
        <ul className='py-1' aria-labelledby='dropdownButton'>
          <li>
            <button
              type='button'
              className='block w-100 py-2 px-4 text-sm text-black hover:bg-gray-100'
              onClick={handleButtonClick}
            >
              View
            </button>
          </li>
          <li>
            <a
              href='/#'
              className='block py-2 px-4 text-sm text-red-600 hover:bg-gray-100'
              onClick={onDeletionModalClick}
            >
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DropdownButton;
