import axios from "axios";
import { SKILL_ENDPOINT } from "./config";
// import { JOB_ENDPOINT } from "./config";

export const getSkills = async () => {
  try {
    const res = await axios.get(`${SKILL_ENDPOINT}/all`);
    if (res) {
      console.log(transformSkills(res.data))
      return transformSkills(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

// export const getAllJobsAndSkills = async () => {
//   try {
//     const res = await axios.get(`${JOB_ENDPOINT}/skills`);
//     if (res) {
//       return combineSkillsToJobs(res.data);
//     }
//     throw new Error("No data returned from backend");
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// Utility Functions
function transformSkills(snakeCaseSkills) {
  return snakeCaseSkills.map((skill) => transformSkill(skill));
}
function transformSkill(snakeCaseSkill) {
  return {
    skillId: snakeCaseSkill.skill_id,
    skillName: snakeCaseSkill.skill_name,
    skillDesc: snakeCaseSkill.skill_desc,
    isActive: snakeCaseSkill.is_active,
    jobs: []
  };
}

function transformJobs(snakeCaseJobs) {
  return snakeCaseJobs.map((job) => transformJob(job));
}
function transformJob(snakeCaseJob) {
  return {
    jobId: snakeCaseJob.job_id,
    jobName: snakeCaseJob.job_name,
    jobDesc: snakeCaseJob.job_desc,
    isActive: snakeCaseJob.is_active,
  };
}

// function combineJobsToSkills(jobsAndSkillsArray) {
//   const skillsCombinedWithCorrespondingJobs = {};

//   jobsAndSkillsArray.forEach((skillAndJobInstance) => {
//     if (skillsCombinedWithCorrespondingJobs[skillAndJobInstance.skill_id]) {
//       skillsCombinedWithCorrespondingJobs[skillAndJobInstance.skill_id].jobs.push({
//         jobId: skillAndJobInstance.job_id,
//         jobName: skillAndJobInstance.job_name,
//         jobDesc: skillAndJobInstance.job_desc,
//         isActive: skillAndJobInstance.is_job_active,
//       });
//     } else {
//       skillsCombinedWithCorrespondingJobs[skillAndJobInstance.job_id] = {
//         skillId: skillAndJobInstance.skill_id,
//         skillName: skillAndJobInstance.skill_name,
//         skillDesc: skillAndJobInstance.skill_desc,
//         isActive: skillAndJobInstance.is_skill_active,
//         skills: [
//           {
//             jobId: skillAndJobInstance.job_id,
//             jobName: skillAndJobInstance.job_name,
//             jobDesc: skillAndJobInstance.job_desc,
//             isActive: skillAndJobInstance.is_job_active,
//           },
//         ],
//       };
//     }
//   });

//   return Object.values(skillsCombinedWithCorrespondingJobs);
// }

// Schema for skills
// {
//   "skill_id": int
//   "skill_name" str
//   "skill_desc" str
//   "is_active" boolean
// }
