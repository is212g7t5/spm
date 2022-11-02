import axios from "axios";
import { COURSE_ENDPOINT } from "./config";

const axiosCourseInstance = axios.create({
  baseURL: COURSE_ENDPOINT,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export const getCourses = async () => {
  try {
    const res = await axiosCourseInstance.get("/all");
    if (res) {
      return transformSnakeCourses(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCourseById = async (courseId) => {
  try {
    const res = await axiosCourseInstance.get(`/${courseId}`);
    if (res) {
      return courseSnakeToCamel(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getCoursesandActiveSkills = async () => {
  try {
    const res = await axiosCourseInstance.get("/skills/active");
    if (res) {
      console.log(res);
      return transformSnakeCourses(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

function transformSnakeCourses(snakeCourses) {
  return snakeCourses.map((course) => courseSnakeToCamel(course));
}
function courseSnakeToCamel(snakeCaseCourse) {
  return {
    courseId: snakeCaseCourse.course_id,
    courseName: snakeCaseCourse.course_name,
    courseDesc: snakeCaseCourse.course_desc,
    courseStatus: snakeCaseCourse.course_status,
    courseType: snakeCaseCourse.course_type,
    courseCategory: snakeCaseCourse.course_category,
    skills: snakeCaseCourse.skills,
  };
}
