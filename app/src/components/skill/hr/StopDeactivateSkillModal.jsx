import React from "react";

function StopDeleteSkillModal({ isStopDeactivateSkillModalOpen, onStopDeactivateSkillModalClose }) {
  const modalRef = React.createRef();

  if (!isStopDeactivateSkillModalOpen) {
    return null;
  }

  const handleStopDeactivateSkillModalClose = (e) => {
    e.stopPropagation();
    if (!(modalRef.current && modalRef.current.contains(e.target))) {
      onStopDeactivateSkillModalClose();
    }
  };

  return (
    <div
      className='fixed top-0 left-0 h-screen w-screen scale-100 grayscale backdrop-blur-3xl z-8'
      aria-hidden='true'
      onClick={handleStopDeactivateSkillModalClose}
    >
      <div
        className='absolute flex flex-col modal container justify-center space-y-5 mx-auto my-auto bg-white z-99 w-5/6 h-3/6 md:h-3/6 md:w-4/6 lg:h-2/6 lg:w-3/6 xl:h-2/6 xl:w-2/6 inset-0 shadow-lg rounded-lg shadow-blue-200 px-8 py-8'
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'
        ref={modalRef}
      >
        <p className='text-3xl font-bold'>Warning</p>

        <p className='text-lg'>
          You cannot deactivate an <u>already</u> inactive skill.
        </p>

        <div className='py-1 flex justify-end'>
          <CloseStopDeactivateSkillModalButton
            onStopDeactivateSkillModalClose={onStopDeactivateSkillModalClose}
          />
        </div>
      </div>
    </div>
  );
}

function CloseStopDeactivateSkillModalButton({ onStopDeactivateSkillModalClose }) {
  return (
    <button
      type='button'
      className='text-white bg-accent1 hover:bg-accent2 font-medium rounded-lg text-sm px-5 py-2.5'
      data-modal-toggle='defaultModal'
      onClick={onStopDeactivateSkillModalClose}
    >
      I understood
    </button>
  );
}

export default StopDeleteSkillModal;
