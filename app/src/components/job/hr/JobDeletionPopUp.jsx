import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { softDelete } from "src/api/jobs";

function DeletePopUp({ trigger, setTrigger, jobId, isActive, jobName }) {
  const [jobIsActive, setJobIsActive] = useState(false);
  const [errors, setErrors] = useState([]);

  const resetTrigger = (e) => {
    setTrigger(false);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const handleConfirm = async (e) => {
    e.preventDefault();

    const res = await softDelete(jobId, jobIsActive);
    if (res.detail) {
      const errorList = [];
      if (res.detail.map) {
        res.detail.map((errorMsg) => errorList.push(errorMsg.msg));
      } else {
        errorList.push(res.detail);
      }
      setErrors(errorList);
    } else {
      setErrors([]);
    }
    swal({
      title: "Success!",
      text: "Job has been successfully deleted!",
      icon: "success",
      button: "OK",
    }).then(() => {
      window.location.reload();
    });
    // refreshPage();
    setTrigger(false);
  };

  const renderErrors = errors && errors.map && errors.map((error) => <p>{error}</p>);

  return trigger ? (
    <div
      id='deletePopUp'
      className='flex justify-center fixed inset-0 h-screen items-center z-10 bg-dimBackgroundColor bg-opacity-60 p-5'
    >
      <div className='flex-initial'>
        <div className='container shadow-2xl shadow-black-300 px-7 py-5 grid rounded-lg bg-white'>
          <div className='grid-row py-3 text-3xl font-bold'>Warning</div>

          <div className='grid-row py-3 text-lg'>Are you sure you want to delete this job?</div>

          <div className='grid-row py-3 flex justify-end'>
            <button
              type='button'
              className='text-white bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button
              type='button'
              className='text-white bg-accent2 hover:bg-accent2 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              onClick={resetTrigger}
            >
              Cancel
            </button>
            <div className='pt-5 text-red-500'>{renderErrors}</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default DeletePopUp;
