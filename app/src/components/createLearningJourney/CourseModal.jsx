import { XMarkIcon } from "@heroicons/react/20/solid";

export default function CourseModal({ coursesToRender, isModalOpen, closeModal }) {
  if (!isModalOpen) {
    return null;
  }

  const handleCloseModal = (e) => {
    e.stopPropagation();

    if (!(e.target.id === "modal-base")) {
      closeModal();
    }
  };

  return (
    <div
      className='fixed top-0 left-0 h-screen w-screen scale-100 grayscale backdrop-blur-3xl z-8'
      aria-hidden='true'
      onClick={handleCloseModal}
    >
      <div
        className='absolute flex flex-col justify-center space-y-5 mx-auto my-auto w-3/4 h-3/4 bg-slate-100 z-99 inset-0 shadow-lg rounded-lg shadow-blue-200 items-center text-center'
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'
        id='modal-base'
      >
        <ModalHeader closeModal={closeModal} />
        <p className=''>Choose courses to add it to your Learning Journey!</p>
        <ModalBody coursesToRender={coursesToRender} />
      </div>
    </div>
  );
}

function ModalBody({ coursesToRender }) {
  const handleClick = (e) => {
    console.log("Hello world");
  };

  const renderCourses = coursesToRender.map((course, index) => (
    <li
      className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
      aria-hidden='true'
      onClick={handleClick}
    >
      {course.courseName}
    </li>
  ));
  return (
    <div
      id='dropdown'
      className='hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 494.222px, 0px);'
      data-popper-reference-hidden=''
      data-popper-escaped=''
      data-popper-placement='bottom'
    >
      <ul
        className='py-1 text-sm text-gray-700 dark:text-gray-200'
        aria-labelledby='dropdownDefault'
      >
        {renderCourses}
      </ul>
    </div>
  );
}

function ModalHeader({ closeModal }) {
  return (
    <div className='flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600'>
      <CloseModalButton closeModal={closeModal} />
    </div>
  );
}

function CloseModalButton({ closeModal }) {
  return (
    <button
      type='button'
      className='absolute top-0 right-0 text-primary-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      data-modal-toggle='defaultModal'
      onClick={closeModal}
    >
      <XMarkIcon width={30} height={30} />
    </button>
  );
}