import axios from "axios";
import { JOB_ENDPOINT } from "./config";

export const getJobs = async () => {
  try {
    const res = await axios.get(`${JOB_ENDPOINT}/all`);
    if (res) {
      console.log(transformJobs(res.data));
      return transformJobs(res.data);
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
    const res = await axios.get(`${JOB_ENDPOINT}/jobId=${jobId}`);
    if (res) {
      console.log(transformJobs(res.data));
      return transformJobs(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Utility Functions
function transformJobs(snakeCaseJobs) {
  return snakeCaseJobs.map((job) => transformJob(job));
}
function transformJob(snakeCaseJob) {
  return {
    jobId: snakeCaseJob.job_id,
    jobName: snakeCaseJob.job_name,
    jobDesc: snakeCaseJob.job_desc,
    isActive: snakeCaseJob.is_active,
    skills: []
  };
}

function transformSkills(snakeCaseSkills) {
  return snakeCaseSkills.map((skill) => transformSkill(skill));
}
function transformSkill(snakeCaseSkill) {
  return {
    skillId: snakeCaseSkill.skill_id,
    skillName: snakeCaseSkill.skill_name,
    skillDesc: snakeCaseSkill.skill_desc,
    isActive: snakeCaseSkill.is_active,
  };
}

function combineSkillsToJobs(skillsAndJobsArray) {
  const jobsCombinedWithCorrespondingSkills = {};

  skillsAndJobsArray.forEach((jobAndSkillInstance) => {
    if (jobsCombinedWithCorrespondingSkills[jobAndSkillInstance.job_id]) {
      jobsCombinedWithCorrespondingSkills[jobAndSkillInstance.job_id].skills.push({
        skillId: jobAndSkillInstance.skill_id,
        skillName: jobAndSkillInstance.skill_name,
        skillDesc: jobAndSkillInstance.skill_desc,
        isActive: jobAndSkillInstance.is_skill_active,
      });
    } else {
      jobsCombinedWithCorrespondingSkills[jobAndSkillInstance.job_id] = {
        jobId: jobAndSkillInstance.job_id,
        jobName: jobAndSkillInstance.job_name,
        jobDesc: jobAndSkillInstance.job_desc,
        isActive: jobAndSkillInstance.is_job_active,
        skills: [
          {
            skillId: jobAndSkillInstance.skill_id,
            skillName: jobAndSkillInstance.skill_name,
            skillDesc: jobAndSkillInstance.skill_desc,
            isActive: jobAndSkillInstance.is_skill_active,
          },
        ],
      };
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
