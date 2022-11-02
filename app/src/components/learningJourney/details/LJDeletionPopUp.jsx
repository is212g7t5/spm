import React from "react";
import { deleteLJWithLJId } from "src/api/learningJourney";

function LJDeletionPopUp({
  LJId,
  isDeletionModalOpen,
  setIsDeletionModalOpen,
  onDeletionButtonClick,
}) {
  // Hide the popup when click on cancel
  const onDeletionModalClose = () => {
    setIsDeletionModalOpen(false);
  };

  if (!isDeletionModalOpen || !LJId) {
    return null;
  }

  const onDeleteLJButtonClick = (e) => {
    e.stopPropagation();
    deleteLJWithCourses();

    async function deleteLJWithCourses() {
      await deleteLJWithLJId(LJId);
      await setIsDeletionModalOpen(false);
      onDeletionButtonClick();
    }
  };

  const modalRef = React.createRef();

  const handleDeleteLJModalClose = (e) => {
    e.stopPropagation();
    if (!(modalRef.current && modalRef.current.contains(e.target))) {
      onDeletionModalClose();
    }
  };

  return (
    <div
      id='deletePopUp'
      className='flex justify-center fixed inset-0 h-screen items-center z-10 p-5 backdrop-grayscale backdrop-blur-xl z-8'
      aria-hidden='true'
      onClick={handleDeleteLJModalClose}
    >
      <div
        className='flex-initial'
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'
        ref={modalRef}
      >
        <div className='container shadow-lg px-7 py-5 grid rounded-lg bg-white'>
          <div className='grid-row py-3 text-3xl font-bold'>Warning</div>

          <div className='grid-row py-3 text-lg'>
            Are you sure you want to delete this learning journey?
          </div>

          <div className='grid-row py-3 flex justify-end'>
            <button
              type='button'
              className='text-white bg-secondary hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              onClick={onDeleteLJButtonClick}
            >
              Confirm
            </button>
            <button
              type='button'
              className='text-white bg-accent2 hover:bg-accent3 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              onClick={onDeletionModalClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LJDeletionPopUp;
