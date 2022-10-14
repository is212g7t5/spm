import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllJobsAndSkills } from "src/api/jobs";
import { BriefcaseIcon } from "@heroicons/react/20/solid";
import JobTile from "../JobTile";

function HRJob() {
  const [jobs, setJobs] = useState([]);

  const renderJobs = jobs.map(({ jobId, jobName, jobDesc, skills, isActive }, index) => (
    <JobTile
      key={index}
      jobId={jobId}
      jobName={jobName}
      jobDesc={jobDesc}
      skills={skills}
      isActive={isActive}
    />
  ));

  useEffect(() => {
    getAllJobs();

    async function getAllJobs() {
      const jobsReturnedFromBackend = await getAllJobsAndSkills();
      setJobs(jobsReturnedFromBackend);
    }
  }, []);

  const history = useHistory();

  const redirectToCreateJobPage = () => {
    history.push("/create-job");
  };

  return (
    <div className='flex flex-col container mt-10 bg-white p-10 mx-auto rounded-lg shadow-lg shadow-blue-200'>
      <div className="flex justify-between">
        <h1 className='text-3xl text-left font-bold'>View All Job Roles</h1>
        <button
          type='button'
          className='relative inline-flex items-center rounded-md border border-accent2 bg-transparent px-4 py-2 text-sm font-medium text-accent2 shadow-sm hover:text-tertiary hover:border-tertiary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800'
          onClick={redirectToCreateJobPage}
        >
          <BriefcaseIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
          <span>Create New Job</span>
        </button>
      </div>
      {jobs.length === 0 ? "No Jobs Found" : renderJobs}
    </div>
  );
}

export default HRJob;
