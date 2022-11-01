import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllJobsAndSkills } from "src/api/jobs";
import { BriefcaseIcon } from "@heroicons/react/20/solid";
import JobTile from "../JobTile";

function HRJob() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getAllJobs();

    async function getAllJobs() {
      const jobsReturnedFromBackend = await getAllJobsAndSkills();
      setJobs(jobsReturnedFromBackend);
    }
  }, []);

  const history = useHistory();

  const renderJobs = jobs.map(({ jobId, jobName, jobDesc, skills, isActive }, index) => (
    <JobTile
      key={index}
      jobId={jobId}
      jobName={jobName}
      jobDesc={jobDesc}
      skills={skills}
      isActive={isActive}
      setJobs={setJobs}
    />
  ));

  const redirectToCreateJobPage = () => {
    history.push("/create-job");
  };

  return (
    <div className='flex flex-col container mt-10 bg-white p-10 mt-10 w-10/12 max-w-7xl mx-auto rounded-lg shadow-lg'>
      <div className='flex justify-between mb-5'>
        <h1 className='text-3xl text-left font-bold'>View All Job Roles</h1>
        <button
          type='button'
          className='relative inline-flex items-center rounded-md border border-accent2 bg-transparent px-4 py-2 text-sm font-medium text-accent2 shadow-sm hover:text-white hover:bg-accent2 focus:ring-2 focus:ring-gray-300'
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
