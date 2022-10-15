import { deleteLJWithLJId } from "src/api/learningJourney";

function LJDeletionPopUp({ LJId, isDeletionModalOpen, setIsDeletionModalOpen }) {
  // Hide the popup when click on cancel
  const onCancelButtonClick = () => {
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
      setIsDeletionModalOpen(false);
    }
  };

  return (
    <div
      id='deletePopUp'
      className='flex justify-center fixed inset-0 h-screen items-center z-10 bg-dimBackgroundColor bg-opacity-60 p-5'
    >
      <div className='flex-initial'>
        <div className='container shadow-2xl shadow-black-300 px-7 py-5 grid rounded-lg bg-white'>
          <div className='grid-row py-3 text-3xl font-bold'>Warning</div>

          <div className='grid-row py-3 text-lg'>
            Are you sure you want to delete this learning journey?
          </div>

          <div className='grid-row py-3 flex justify-end'>
            <button
              type='button'
              className='text-white bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              onClick={onDeleteLJButtonClick}
            >
              Confirm
            </button>
            <button
              type='button'
              className='text-white bg-accent2 hover:bg-accent2 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              onClick={onCancelButtonClick}
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
