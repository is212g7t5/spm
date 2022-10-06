import axios from "axios";
import { SKILL_ENDPOINT } from "./config";

const axiosSkillInstance = axios.create({
  baseURL: SKILL_ENDPOINT,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export const getAllSkills = async () => {
  try {
    const res = await axiosSkillInstance.get("/all");
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllActiveSkills = async () => {
  try {
    const res = await axiosSkillInstance.get("/all?active_only=true");
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
}