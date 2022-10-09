import { useState } from "react";
import { updateJob } from "src/api/jobs";
import { useUpdateJobContext } from "src/contexts/UpdateJobContext";
import UpdateJobSuccess from "./UpdateJobSuccess";

export default function HRUpdateJob() {
  const { updateJobRole } = useUpdateJobContext();

  const [jobName, setJobName] = useState(updateJobRole.jobName);
  const [jobDesc, setJobDesc] = useState(updateJobRole.jobDesc);
  const [jobIsActive, setJobIsActive] = useState(updateJobRole.isActive);
  const [errors, setErrors] = useState([]);
  const [displayPopup, setDisplayPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateJob(updateJobRole.jobId, jobName, jobDesc, jobIsActive);
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
  };

  const handleJobNameChange = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 50) {
      setJobName(e.target.value);
    }
  };

  const handleJobDescChange = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 255) {
      setJobDesc(e.target.value);
    }
  };

  const renderErrors = errors && errors.map && errors.map((error) => <p>{error}</p>);

  const handleJobIsActiveChange = (e) => {
    setJobIsActive(!jobIsActive);
  };

  return (
    <div className='relative flex flex-col container max-w-7xl mt-10 bg-white p-10 mx-auto rounded-lg shadow-lg shadow-blue-200'>
      <h1 className='text-3xl text-left font-bold'>Update Job</h1>
      <form onSubmit={handleSubmit} className='pt-10'>
        <div className='mb-6'>
          <label
            htmlFor='jobName'
            className='block mb-2 text-md font-medium text-gray-900 dark:text-gray-300 space-y-2'
          >
            <p>Job Name</p>
            <p className='italic font-light text-gray-400 text-sm'>
              At least 1 character, maximum 50 characters. Whitespaces at the front and back will be
              removed.
            </p>
            <input
              type='text'
              id='jobName'
              value={jobName}
              onChange={handleJobNameChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              placeholder='e.g. Sales Engineer'
            />
          </label>
        </div>
        <div className='mb-6'>
          <label
            htmlFor='jobDesc'
            className='block mb-2 text-md font-medium text-gray-900 dark:text-gray-300 space-y-2'
          >
            <p>Job Description</p>
            <p className='italic font-light text-gray-400 text-sm'>
              At least 1 character, maximum 255 characters.
            </p>
            <textarea
              id='jobDesc'
              rows={5}
              value={jobDesc}
              onChange={handleJobDescChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            />
            <p className='text-right text-sm'>{jobDesc.length}/255</p>
          </label>
        </div>
        <div className='mb-6'>
          <p className='block mb-2 text-md font-medium text-gray-900'>Job Status</p>
          <label
            htmlFor='checked-toggle'
            className='inline-flex relative items-center cursor-pointer'
            onChange={handleJobIsActiveChange}
          >
            <input
              type='checkbox'
              value=''
              id='checked-toggle'
              className='sr-only peer'
              checked={jobIsActive}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            <span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
              {jobIsActive ? "Active" : "Inactive"}
            </span>
          </label>
        </div>
        <button
          type='submit'
          className='text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          Update Job
        </button>
      </form>
      <div className='pt-5 text-red-500'>{renderErrors}</div>
      {displayPopup ? <UpdateJobSuccess jobName={jobName} /> : null}
    </div>
  );
}
