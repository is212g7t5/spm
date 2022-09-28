import React, { useEffect, useState } from "react";
import { getJobs } from "src/api/jobs";

import JobTile from "./JobTile";

const mockJobs = [
  {
    jobId: 1,
    jobName: "Software Engineer",
    jobDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit autem sequi quos deleniti vitae quasi nemo quia quam accusamus nobis a ducimus deserunt numquam earum, dignissimos mollitia tempora saepe magnam ex beatae unde dolorem? At ipsa placeat accusantium ea consequuntur. Laudantium beatae, sapiente cumque placeat dolores magni explicabo minima aliquam!",
    skills: [
      {
        skillId: 1,
        skillName: "Java",
        skillDesc:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit autem sequi quos deleniti vitae quasi nemo quia quam accusamus nobis a ducimus deserunt numquam earum, dignissimos mollitia tempora saepe magnam ex beatae unde dolorem? At ipsa placeat accusantium ea consequuntur. Laudantium beatae, sapiente cumque placeat dolores magni explicabo minima aliquam!",
      },
      {
        skillId: 2,
        skillName: "Python",
        skillDesc: "Python Description",
      },
      {
        skillId: 3,
        skillName: "C",
        skillDesc: "C Description",
      },
    ],
  },
  {
    jobId: 2,
    jobName: "Software Engineer",
    jobDesc: "Software Engineer Description",
    skills: [
      {
        skillId: 1,
        skillName: "Java",
        skillDesc: "Java Description",
      },
      {
        skillId: 2,
        skillName: "Python",
        skillDesc: "Python Description",
      },
      {
        skillId: 3,
        skillName: "C",
        skillDesc: "C Description",
      },
    ],
  },
  {
    jobId: 3,
    jobName: "Software Engineer",
    jobDesc: "Software Engineer Description",
    skills: [
      {
        skillId: 1,
        skillName: "Java",
        skillDesc: "Java Description",
      },
      {
        skillId: 2,
        skillName: "Python",
        skillDesc: "Python Description",
      },
      {
        skillId: 3,
        skillName: "C",
        skillDesc: "C Description",
      },
    ],
  },
];

function Job() {
  const [jobs, setJobs] = useState(mockJobs);

  const renderJobs = jobs.map(({ jobId, jobName, jobDesc, skills }, index) => (
    <JobTile
      key={index}
      jobId={jobId}
      jobName={jobName}
      jobDesc={jobDesc}
      skills={skills}
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
      {jobs.length === 0 ? "No Jobs Found" : renderJobs}
    </div>
  );
}

export default Job;
