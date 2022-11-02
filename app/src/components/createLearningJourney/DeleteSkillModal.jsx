import React from "react";

function DeleteSkillModal({ isDeleteSkillModalOpen, onDeleteSkillModalClose }) {
  const modalRef = React.createRef();

  if (!isDeleteSkillModalOpen) {
    return null;
  }

  const handleDeleteSkillModalClose = (e) => {
    e.stopPropagation();
    if (!(modalRef.current && modalRef.current.contains(e.target))) {
      onDeleteSkillModalClose();
    }
  };

  return (
    <div
      className='fixed top-0 left-0 h-screen w-screen scale-100 backdrop-grayscale backdrop-blur-xl z-8'
      aria-hidden='true'
      onClick={handleDeleteSkillModalClose}
    >
      <div
        className='absolute flex flex-col modal container justify-center space-y-5 mx-auto my-auto bg-gray-100 z-99 w-5/6 h-5/6 md:h-3/6 md:w-4/6 lg:h-3/6 lg:w-3/6 xl:h-2/6 xl:w-3/6 inset-0 shadow-lg rounded-lg px-8 py-8'
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'
        ref={modalRef}
      >
        <p className='text-3xl font-bold'>Warning</p>

        <p className='text-lg'>
          You <u>cannot</u> create a Learning Journey with no courses.
        </p>

        <p className='text-lg'>Please add another course before deleting selected course.</p>

        <div className='py-1 flex justify-end'>
          <CloseDeleteSkillModalButton onDeleteSkillModalClose={onDeleteSkillModalClose} />
        </div>
      </div>
    </div>
  );
}

function CloseDeleteSkillModalButton({ onDeleteSkillModalClose }) {
  return (
    <button
      type='button'
      className='text-white bg-accent2 hover:bg-accent3 font-medium rounded-lg text-sm px-5 py-2.5'
      data-modal-toggle='defaultModal'
      onClick={onDeleteSkillModalClose}
    >
      I understood
    </button>
  );
}

export default DeleteSkillModal;
