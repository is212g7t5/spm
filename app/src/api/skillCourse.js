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

function extractSkillIds(courseAndSkillIdsArray) {
  const skillIdArray = [];
  courseAndSkillIdsArray.forEach((skillAndCourseIdInstance) => {
    skillIdArray.push(skillAndCourseIdInstance.skill_id);
  });
  return skillIdArray;
}
