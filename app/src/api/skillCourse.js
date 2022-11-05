import axios from "axios";
import { SKILL_COURSE_ENDPOINT } from "./config";

const axiosSkillCourseInstance = axios.create({
  baseURL: SKILL_COURSE_ENDPOINT,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export const getSkillIdsForCourse = async (courseId) => {
  try {
    const res = await axiosSkillCourseInstance.get(`/courses/${courseId}`);
    if (res) {
      return extractSkillIds(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createSkillCourse = async (skillId, courseId) => {
  try {
    const res = await axios.post(`${SKILL_COURSE_ENDPOINT}`, {
      skill_id: skillId,
      course_id: courseId,
    });
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    return error.response.data;
  }
};

export const deleteSkillCourse = async (skillId, courseId) => {
  try {
    const res = await axios.delete(`${SKILL_COURSE_ENDPOINT}/${skillId}&${courseId}`);
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    return error.response.data;
  }
};

function extractSkillIds(courseAndSkillIdsArray) {
  const skillIdArray = [];
  courseAndSkillIdsArray.forEach((skillAndCourseIdInstance) => {
    skillIdArray.push(skillAndCourseIdInstance.skill_id);
  });
  return skillIdArray;
}
