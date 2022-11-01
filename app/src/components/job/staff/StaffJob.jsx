import React, { useEffect, useState } from "react";
import { getAllJobsAndSkills } from "src/api/jobs";
import { toast } from "react-toastify";
import JobTile from "../JobTile";

function StaffJob() {
  const [jobs, setJobs] = useState([]);

  const renderJobs = jobs.map(({ jobId, jobName, jobDesc, skills, isActive }, index) => {
    if (isActive === 1) {
      return <JobTile
      key={index}
      jobId={jobId}
      jobName={jobName}
      jobDesc={jobDesc}
      skills={skills}
      isActive={isActive}
      /> ;
    }
    return null;
  });

  useEffect(() => {
    getAllJobs();

    async function getAllJobs() {
      const jobsReturnedFromBackend = await getAllJobsAndSkills(true);
      // const jobsReturnedFromBackend = [];
      if (jobsReturnedFromBackend.length === 0) {
        toast.warning("There are no jobs to display");
      }
      setJobs(jobsReturnedFromBackend);
    }
  }, []);

  return (
    <div className='flex flex-col container mt-10 bg-white p-10 mx-auto rounded-lg shadow-lg'>
      <h1 className='text-3xl text-left font-bold mb-5'>View All Job Roles</h1>
      {jobs.length === 0 ? "No Jobs Found" : renderJobs}
    </div>
  );
}

export default StaffJob;
