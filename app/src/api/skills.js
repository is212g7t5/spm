import axios from "axios";
import { SKILL_ENDPOINT } from "./config";

const axiosSkillInstance = axios.create({
  baseURL: SKILL_ENDPOINT,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export const getSkills = async () => {
  try {
    const res = await axiosSkillInstance.get("/");
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

// BE to be updated
export const getSkillsByJobRole = async () => {
  try {
    const res = await axiosSkillInstance.get("/skills/role");
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};
