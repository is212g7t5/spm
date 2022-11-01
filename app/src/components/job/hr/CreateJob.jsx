import { useState } from "react";
import { createJob } from "src/api/jobs";
import { useUserContext } from "src/contexts/UserContext";
import CreateJobSuccess from "./CreateJobSuccess";
import JobNameInput from "./form/JobNameInput";
import JobDescTextArea from "./form/JobDescTextArea";

export default function HRCreateJob() {
  const { currentUserType } = useUserContext();
  const [jobName, setJobName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [errors, setErrors] = useState([]);
  const [displayPopup, setDisplayPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createJob(jobName, jobDesc);
    // If detail key exists in response, there are schematic errors in the request
    if (res.detail && res.detail.length > 0) {
      const errorList = [];
      if (res.detail.forEach) {
        res.detail.forEach((error) => {
          errorList.push(error.msg);
        }); 
      } else {
        errorList.push(res.detail);
      }
      setErrors(errorList);
    } else {
      setErrors([]);
      setDisplayPopup(true);
    }
  };

  const renderErrors = errors && errors.map && errors.map((error) => <p key={error}>{error}</p>);

  const resetFields = () => {
    setJobName("");
    setJobDesc("");
    setErrors([]);
    setDisplayPopup(false);
  };

  switch (currentUserType) {
    case "HR":
      return (
        <div className='relative flex flex-col container max-w-7xl mt-10 bg-white p-10 mx-auto rounded-lg shadow-lg shadow-blue-200'>
          <h1 className='text-3xl text-left font-bold'>Create New Job</h1>
          <form onSubmit={handleSubmit} className='pt-10'>
            <div className='mb-6'>
              <JobNameInput jobName={jobName} setJobName={setJobName} />
            </div>
            <div className='mb-6'>
              <JobDescTextArea jobDesc={jobDesc} setJobDesc={setJobDesc} />
            </div>
            <button
              type='submit'
              className='text-white bg-accent2 hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              Create Job
            </button>
          </form>
          <div className='pt-5 text-red-500'>{renderErrors}</div>
          {displayPopup ? <CreateJobSuccess jobName={jobName} resetFields={resetFields} /> : null}
        </div>
      );
    default:
      return <p>You are not logged in as HR so you cannot create job roles</p>;
  }
}
