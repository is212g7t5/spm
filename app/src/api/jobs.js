import axios from "axios";
import { JOB_ENDPOINT } from "./config";

export const getJobs = async () => {
  try {
    const res = await axios.get(`${JOB_ENDPOINT}/all`);
    if (res) {
      console.log(transformJobsFromSnakeToCamel(res.data));
      return transformJobsFromSnakeToCamel(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllJobsAndSkills = async () => {
  try {
    const res = await axios.get(`${JOB_ENDPOINT}/skills`);
    if (res) {
      console.log(combineSkillsToJobs(res.data))
      return combineSkillsToJobs(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getJobById = async (jobId) => {
  try {
    const res = await axios.get(`${JOB_ENDPOINT}/${jobId}`);
    if (res) {
      return transformOneJob(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const createJob = async (jobName, jobDesc) => {
  try {
    const res = await axios.post(`${JOB_ENDPOINT}`, {
      job_name: jobName,
      job_desc: jobDesc,
    });
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    return error.response.data;
  }
};

export const updateJob = async (jobId, jobName, jobDesc, jobIsActive) => {
  try {
    const res = await axios.put(`${JOB_ENDPOINT}/${jobId}`, {
      job_name: jobName,
      job_desc: jobDesc,
      is_active: jobIsActive,
    });
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    return error.response.data;
  }
};

// Utility Functions
function transformJobsFromSnakeToCamel(snakeCaseJobs) {
  return snakeCaseJobs.map((job) => transformOneJob(job));
}
function transformOneJob(snakeCaseJob) {
  return {
    jobId: snakeCaseJob.job_id,
    jobName: snakeCaseJob.job_name,
    jobDesc: snakeCaseJob.job_desc,
    isActive: snakeCaseJob.is_active,
    skills: [],
  };
}

function transformSkillsFromSnakeToCamel(snakeCaseSkills) {
  return snakeCaseSkills.map((skill) => transformOneSkill(skill));
}
function transformOneSkill(snakeCaseSkill) {
  return {
    skillId: snakeCaseSkill.skill_id,
    skillName: snakeCaseSkill.skill_name,
    skillDesc: snakeCaseSkill.skill_desc,
    isActive: snakeCaseSkill.is_skill_active,
  };
}

function combineSkillsToJobs(skillsAndJobsArray) {
  const jobsCombinedWithCorrespondingSkills = {};

  skillsAndJobsArray.forEach((jobAndSkillInstance) => {
    const skillInstance = {
      skillId: jobAndSkillInstance.skill_id,
      skillName: jobAndSkillInstance.skill_name,
      skillDesc: jobAndSkillInstance.skill_desc,
      isActive: jobAndSkillInstance.is_skill_active,
    };

    if (!(jobAndSkillInstance.job_id in jobsCombinedWithCorrespondingSkills)) {
      jobsCombinedWithCorrespondingSkills[jobAndSkillInstance.job_id] = {
        jobId: jobAndSkillInstance.job_id,
        jobName: jobAndSkillInstance.job_name,
        jobDesc: jobAndSkillInstance.job_desc,
        isActive: jobAndSkillInstance.is_job_active,
        skills: [],
      };
    }

    if (skillInstance.skillId) {
      jobsCombinedWithCorrespondingSkills[jobAndSkillInstance.job_id].skills.push(skillInstance);
    }
  });

  return Object.values(jobsCombinedWithCorrespondingSkills);
}

// Schema for jobs
// {
//   "job_id": int
//   "job_name" str
//   "job_desc" str
//   "is_active" boolean
// }
