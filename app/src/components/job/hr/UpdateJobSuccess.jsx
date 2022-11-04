import { useHistory } from "react-router-dom";

export default function UpdateJobSuccess({ jobName, jobIsActive }) {
  const history = useHistory();

  const redirectToJobPage = () => {
    history.push("/jobs");
  };

  return (
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
