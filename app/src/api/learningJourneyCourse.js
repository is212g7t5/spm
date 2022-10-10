import axios from "axios";
import { LEARNING_JOURNEY_COURSE_ENDPOINT } from "./config";

const axiosLJCourseInstance = axios.create({
  baseURL: LEARNING_JOURNEY_COURSE_ENDPOINT,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export const createLJCourseMapping = async (LJId, courseIds) => {
  try {
    const LJCoursePromise = [];
    for (let i = 0; i < courseIds.length; i+=1) {
      LJCoursePromise.push(
        axiosLJCourseInstance.post('', {
          lj_id: LJId,
          course_id: courseIds[i],
        })
      );
    }
    const res = await Promise.all(LJCoursePromise);
    if (res) {
      return res;
    }
    throw new Error("Failed to create Learning Journey and Course mapping");
  } catch (error) {
    console.log(error);
    return [];
  }
};
