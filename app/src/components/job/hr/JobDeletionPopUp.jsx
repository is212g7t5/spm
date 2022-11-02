import React, { useState, useEffect } from "react";
import { softDelete, getAllJobsAndSkills } from "src/api/jobs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function JobDeletionPopUp({
  trigger,
  setTrigger,
  jobId,
  isActive,
  jobName,
  setJobs,
}) {
  const [jobIsActive, setJobIsActive] = useState(false);
  const [errors, setErrors] = useState([]);

  const resetTrigger = (e) => {
    e.stopPropagation();
    setTrigger(false);
  };

  const handleConfirm = async (e) => {
    e.stopPropagation();

    const res = await softDelete(jobId, jobIsActive);
    if (res.detail) {
      const errorList = [];
      errorList.push(res.detail);
      setErrors(errorList);
    } else {
      setErrors([]);
    }
    const jobsReturnedFromBackend = await getAllJobsAndSkills();
    setJobs(jobsReturnedFromBackend);
    toast.success("Job was successfully deleted!");
    setTrigger(false);
  };

  const renderErrors = errors && errors.map((error) => <p>{error}</p>);

  return trigger ? (
    <div
      id='deletePopUp'
      className='flex justify-center fixed inset-0 h-screen items-center z-10 backdrop-grayscale backdrop-blur-xl p-5'
    >
      <div className='flex-initial'>
        <div className='container shadow-lg px-7 py-5 grid rounded-lg bg-white'>
          <div className='grid-row py-3 text-3xl font-bold'>Warning</div>

          <div className='grid-row py-3 text-lg'>Are you sure you want to delete this job?</div>

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
            <div className='pt-5 text-red-500'>{renderErrors}</div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
