import React, { useEffect, useState } from "react";
import { getJobs } from "src/api/jobs";

import JobTile from "./JobTile";

function Job() {
  const [jobs, setJobs] = useState([]);

  const renderJobList = () =>
    jobs.map((job, index) => (
      <JobTile
        key={index}
        id={index}
        jobId={job.job_id}
        jobName={job.job_name}
        jobDesc={job.job_desc}
      />
    ));

  useEffect(() => {
    getAllJobs();

    async function getAllJobs() {
      const jobsReturnedFromBackend = await getJobs();
      setJobs(jobsReturnedFromBackend);
    }
  }, []);

  return (
    <div className='flex flex-col container w-11/12 max-w-7xl mt-10 bg-white p-10 mx-auto w-full rounded-lg shadow-lg shadow-blue-200'>
      <h1 className='text-3xl text-left font-bold'>View All Job Roles</h1>
      {jobs.length === 0 ? "No Jobs Found" : renderJobList()}
    </div>
  );
}

export default Job;
