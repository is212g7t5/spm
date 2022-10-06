import axios from "axios";
import { JOB_SKILL_ENDPOINT } from "./config";

const axiosJobSkillInstance = axios.create({
  baseURL: JOB_SKILL_ENDPOINT,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export const getAllJobSkills = async () => {
  try {
    const res = await axiosJobSkillInstance.get("/all");
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createJobSkill = async (jobId, skillId) => {
  try {
    const res = await axiosJobSkillInstance.post("/", {
      job_id: jobId,
      skill_id: skillId
    });
    if (res) {
      console.log(res.data);
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
}

// BE to be updated
export const getSkillsByJobRole = async () => {
  try {
    const res = await axiosJobSkillInstance.get("/skills/role");
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};
