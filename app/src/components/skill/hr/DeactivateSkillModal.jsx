import React from "react";
import { updateSkillDetails } from "src/api/skills";

function DeactivateSkillModal({
  selectedSkill,
  isDeactivateSkillModalOpen,
  onDeactivateSkillModalClose,
  isDeactivateSkillButtonClick,
  setDeactivateSkillButtonClick,
}) {
  const modalRef = React.createRef();

  if (!isDeactivateSkillModalOpen) {
    return null;
  }

  const handleDeactivateSkillModalClose = (e) => {
    e.stopPropagation();
    if (!(modalRef.current && modalRef.current.contains(e.target))) {
      onDeactivateSkillModalClose();
    }
  };

  const onDeactivateSkillButtonClick = (e) => {
    e.stopPropagation();
    deactivateSkill();

    async function deactivateSkill() {
      await updateSkillDetails(
        selectedSkill.skillId,
        selectedSkill.skillName,
        selectedSkill.skillDesc,
        0,
      );
      await onDeactivateSkillModalClose();
      setDeactivateSkillButtonClick(!isDeactivateSkillButtonClick);
    }
  };

  return (
    <div
      className='fixed top-0 left-0 h-screen w-screen scale-100 backdrop-grayscale backdrop-blur-xl z-50'
      aria-hidden='true'
      onClick={handleDeactivateSkillModalClose}
    >
      <div
        className='absolute flex flex-col modal container justify-center space-y-5 mx-auto my-auto bg-white z-99 w-5/6 h-3/6 md:h-3/6 md:w-4/6 lg:h-2/6 lg:w-3/6 xl:h-2/6 xl:w-2/6 inset-0 shadow-lg rounded-lg px-8 py-8'
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'
        ref={modalRef}
      >
        <p className='text-3xl font-bold'>Warning</p>

        <p className='text-lg'>Are you sure you want to deactivate this skill?</p>

        <div className='py-1 flex justify-end'>
          <button
            type='button'
            className='text-white bg-secondary hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 mx-2'
            data-modal-toggle='defaultModal'
            onClick={onDeactivateSkillButtonClick}
          >
            Confirm
          </button>

          <CloseDeactivateSkillModalButton
            onDeactivateSkillModalClose={onDeactivateSkillModalClose}
          />
        </div>
      </div>
    </div>
  );
}

function CloseDeactivateSkillModalButton({ onDeactivateSkillModalClose }) {
  return (
    <button
      type='button'
      className='text-white bg-accent2 hover:bg-accent3 font-medium rounded-lg text-sm px-5 py-2.5'
      data-modal-toggle='defaultModal'
      onClick={onDeactivateSkillModalClose}
    >
      Cancel
    </button>
  );
}

export default DeactivateSkillModal;
