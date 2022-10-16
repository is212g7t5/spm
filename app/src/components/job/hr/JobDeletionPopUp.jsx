import React, { useState } from "react";
import { softDelete } from "src/api/jobs";
import "../JobTile";

function DeletePopUp(props){

    // const [jobName, setJobName] = useState(props.jobName);
    // const [jobDesc, setJobDesc] = useState(props.jobDesc);
    const [jobIsActive, setJobIsActive] = useState(false);
    const [errors, setErrors] = useState([]);
    const [displayPopup, setDisplayPopup] = useState(false);


    const handleConfirm = async (e) => {
        e.preventDefault();
        const res = await softDelete(props.jobId, jobIsActive)
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
            setDisplayPopup(true);
          }
          props.setTrigger(false);
    }

    return (props.trigger) ? (
<div
      id='deletePopUp'
      className='flex justify-center fixed inset-0 h-screen items-center z-10 bg-dimBackgroundColor bg-opacity-60 p-5'
    >
      <div className='flex-initial'>
        <div className='container shadow-2xl shadow-black-300 px-7 py-5 grid rounded-lg bg-white'>
          <div className='grid-row py-3 text-3xl font-bold'>Warning</div>

          <div className='grid-row py-3 text-lg'>
            Are you sure you want to delete this job?
          </div>

          <div className='grid-row py-3 flex justify-end'>
            <button
              type='button'
              className='text-white bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              onClick={() => handleConfirm}
            >
              Confirm
            </button>
            <button
              type='button'
              className='text-white bg-accent2 hover:bg-accent2 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              onClick={() => props.setTrigger(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    ) : "";
}

// function DeletePopUp({ showPopUp, isPopUpOpen, setIsPopUpOpen}) {
//   // Hide the popup when click on cancel
// //   const [isPopUpOpen, setIsPopUpOpen] = useState(true);
//   const onClick = () => {
//     setIsPopUpOpen(!isPopUpOpen);
//   };

//   function refreshPage() {
//     window.location.reload(false);
//   }

//   if (!isPopUpOpen) {
//     return null;
//   }

//   const DeleteJobButtonClick = (e) => {
//     e.stopPropagation();
//     const res = updateJob(jobId); // how to call updateJob API and change active to false?
//     const onClick = setIsPopUpOpen(!isPopUpOpen);
//     refreshPage();
//   };

//   return ( //pop up is not showing up when clicking "Delete Button"
//     <div
//       id='deletePopUp'
//       className='flex justify-center fixed inset-0 h-screen items-center z-10 bg-dimBackgroundColor bg-opacity-60 p-5'
//     >
//       <div className='flex-initial'>
//         <div className='container shadow-2xl shadow-black-300 px-7 py-5 grid rounded-lg bg-white'>
//           <div className='grid-row py-3 text-3xl font-bold'>Warning</div>

//           <div className='grid-row py-3 text-lg'>
//             Are you sure you want to delete this job?
//           </div>

//           <div className='grid-row py-3 flex justify-end'>
//             <button
//               type='button'
//               className='text-white bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
//               onClick={DeleteJobButtonClick}
//             >
//               Confirm
//             </button>
//             <button
//               type='button'
//               className='text-white bg-accent2 hover:bg-accent2 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
//               onClick={onClick}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default DeletePopUp;
