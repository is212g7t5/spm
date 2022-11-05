import React from "react";
import { createSkillCourse, deleteSkillCourse } from "src/api/skillCourse";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function UpdateConfirmationPopUp({
  isConfirmPopUpOpen,
  setIsConfirmPopUpOpen,
  selectedSkills,
  skills,
  courseId,
  courseName,
}) {
  const history = useHistory();

  const handleConfirm = async (e) => {
    e.preventDefault();
    for (let i = 0; i < selectedSkills.length; i += 1) {
      const checkIfIdExists = (obj) => obj.skillId === selectedSkills[i].skill_id;
      const result = skills.some(checkIfIdExists);
      console.log(result);
      if (selectedSkills[i].action === "delete" && result) {
        deleteSkillCourse(selectedSkills[i].skill_id, courseId);
      }

      if (selectedSkills[i].action === "add" && !result) {
        createSkillCourse(selectedSkills[i].skill_id, courseId);
      }
    }
    history.push("courses");

    setIsConfirmPopUpOpen(false);
  };

  return isConfirmPopUpOpen ? (
    <div
      id='deletePopUp'
      className='flex justify-center fixed inset-0 h-screen items-center z-10 backdrop-grayscale backdrop-blur-xl p-5'
    >
      <div className='flex-initial'>
        <div className='container shadow-lg px-7 py-5 grid rounded-lg bg-white'>
          <div className='grid-row py-3 text-3xl font-bold'>Success!</div>

          <div className='grid-row py-3 text-lg'>
            Skills has successfully been re-assigned to {courseName}!
          </div>

          <div className='grid-row py-3 flex justify-center'>
            <button
              type='button'
              className='text-white bg-secondary hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              onClick={handleConfirm}
            >
              Return to Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
