import { useHistory } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function CreateJobSuccess({ jobName, resetFields }) {
  const redirectToCreateJobPage = () => {
    resetFields();
  };

  const history = useHistory();

  const redirectToJobPage = () => {
    history.push("/jobs");
  };


  return (
    <div className="absolute flex flex-col justify-center space-y-5 mx-auto my-auto w-1/2 h-1/2 bg-slate-100 z-10 inset-0 shadow-lg rounded-lg shadow-blue-200 items-center text-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <CheckCircleIcon className='mx-auto h-20 w-20 text-green-500' aria-hidden='true'/>
      <p className="">Job {jobName} has been successfully created!</p>
      <div className="flex space-x-5">
        <button
          type='button'
          className='relative inline-flex items-center rounded-md border border-orange-500 bg-transparent px-4 py-2 text-sm font-medium text-orange-500 shadow-sm hover:text-orange-600 hover:border-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800'
          onClick={redirectToCreateJobPage}
        >
          <span>Create Another Job</span>
        </button>
        <button
          type='button'
          className='relative inline-flex items-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800'
          onClick={redirectToJobPage}
        >
          <span>Return to Jobs</span>
        </button>
      </div>
    </div>
  )
}