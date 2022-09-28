import axios from "axios";
import { JOB_ENDPOINT } from "./config";

export const getJobs = async () => {
  try {
    const res = await axios.get(`${JOB_ENDPOINT}/all`);
    if (res) {
      return transformJobs(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getJobsAndSkills = async () => {
  try {
    const res = await axios.get(`${JOB_ENDPOINT}/skills`);
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};


function transformJobs(snakeCaseJobs) {
  return snakeCaseJobs.map((job) => ({
    jobId: job.job_id,
    jobName: job.job_name,
    jobDesc: job.job_desc,
    isActive: job.is_active,
  }));
}

// Schema for jobs
// {
//   "job_id": int
//   "job_name" str
//   "job_desc" str
//   "is_active" boolean
// }
