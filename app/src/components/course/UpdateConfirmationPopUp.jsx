import React from "react";
import { createSkillCourse, deleteSkillCourse } from "src/api/skillCourse";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function UpdateConfirmationPopUp({
  isConfirmPopUpOpen,
  setIsConfirmPopUpOpen,
  selectedSkills,
  setSelectedSkills,
  skills,
  courseId,
}) {
  const history = useHistory();

  const resetTrigger = (e) => {
    e.stopPropagation();
    setIsConfirmPopUpOpen(false);
  };

  const handleConfirm = async (e) => {
    // iterate through selectedSkills, create for action = "add", delete for action = "delete"
    e.preventDefault();
    for (let i = 0; i < selectedSkills.length; i += 1) {
      const checkIfIdExists = (obj) => obj.skillId === selectedSkills[i].skill_id;
      const result = skills.some(checkIfIdExists);
      console.log(result);
      if (selectedSkills[i].action === "delete" && result) {
        // call api to delete skill course if action = "delete"
        deleteSkillCourse(selectedSkills[i].skill_id, courseId);
      }

      if (selectedSkills[i].action === "add" && !result) {
        // call api to create skill course if action = "add"
        createSkillCourse(selectedSkills[i].skill_id, courseId);
      }
    }
    history.push("courses");

    toast.success("Skills were successfully re-assigned!");
    setIsConfirmPopUpOpen(false);
  };

  return isConfirmPopUpOpen ? (
    <div
      id='deletePopUp'
      className='flex justify-center fixed inset-0 h-screen items-center z-10 backdrop-grayscale backdrop-blur-xl p-5'
    >
      <div className='flex-initial'>
        <div className='container shadow-lg px-7 py-5 grid rounded-lg bg-white'>
          <div className='grid-row py-3 text-3xl font-bold'>Warning</div>

          <div className='grid-row py-3 text-lg'>
            Are you sure you want to re-assign skills to course?
          </div>

          <div className='grid-row py-3 flex justify-end'>
            <button
              type='button'
              className='text-white bg-secondary hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button
              type='button'
              className='text-white bg-accent2 hover:bg-accent3 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              onClick={resetTrigger}
            >
              Cancel
            </button>
            {/* <div className='pt-5 text-red-500'>{renderErrors}</div> */}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
