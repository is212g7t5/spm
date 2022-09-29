import React, { useEffect, useState } from "react";
import { getAllJobsAndSkills } from "src/api/jobs";

import JobTile from "./JobTile";

function Job() {
  const [jobs, setJobs] = useState([]);

  const renderJobs = jobs.map(({ jobId, jobName, jobDesc, skills }, index) => (
    <JobTile key={index} jobId={jobId} jobName={jobName} jobDesc={jobDesc} skills={skills} />
  ));

  useEffect(() => {
    getAllJobs();

    async function getAllJobs() {
      const jobsReturnedFromBackend = await getAllJobsAndSkills();
      setJobs(jobsReturnedFromBackend);
    }
  }, []);

  return (
    <div className='flex flex-col container w-11/12 max-w-7xl mt-10 bg-white p-10 mx-auto w-full rounded-lg shadow-lg shadow-blue-200'>
      <h1 className='text-3xl text-left font-bold'>View All Job Roles</h1>
      {jobs.length === 0 ? "No Jobs Found" : renderJobs}
    </div>
  );
}

export default Job;
