import { useHistory } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function UpdateJobSuccess({ jobName, jobIsActive }) {
  const history = useHistory();

  const redirectToJobPage = () => {
    history.push("/jobs");
  };

  return (
    // <div
    //   className='absolute flex flex-col justify-center space-y-5 mx-auto my-auto w-1/2 h-1/2 bg-gray-100 z-10 inset-0 shadow-lg rounded-lg items-center text-center'
    //   aria-labelledby='modal-title'
    //   role='dialog'
    //   aria-modal='true'
    // >
    //   <CheckCircleIcon className='mx-auto h-20 w-20 text-green-500' aria-hidden='true' />
    //   {jobIsActive===true ? <p className=''>Job {jobName} has been successfully updated!</p> :
    //   <p className=''>Job {jobName} is toggled to inactive. No other changes will be saved.</p>}
    //   <button
    //     type='button'
    //     className='relative inline-flex items-center rounded-md border border-transparent bg-accent2 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent3 focus:outline-none focus:ring-2 focus:ring-gray-300'
    //     onClick={redirectToJobPage}
    //   >
    //     <span>Return to Jobs</span>
    //   </button>
    // </div>
    <div
      className='flex justify-center fixed inset-0 h-screen items-center z-10 backdrop-grayscale backdrop-blur-xl p-5'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='flex-initial'>
        <div className='container shadow-lg px-7 py-5 grid rounded-lg bg-white'>
          <div className='grid-row py-3 text-3xl font-bold'>Note</div>

          {jobIsActive === false || jobIsActive === 0 ? (
            <div className='grid-row py-3 text-lg'>
              {jobName} is toggled to inactive. No other changes will be saved.
            </div>
          ) : (
            <div className='grid-row py-3 text-lg'>{jobName} has been successfully updated!</div>
          )}

          <div className='grid-row py-3 flex justify-end'>
            <button
              type='button'
              className='text-white bg-secondary hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              onClick={redirectToJobPage}
            >
              Return to Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
