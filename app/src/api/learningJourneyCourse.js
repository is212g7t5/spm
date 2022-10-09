import axios from "axios";
import { LEARNING_JOURNEY_COURSE_ENDPOINT } from "./config";

const axiosLJCourseInstance = axios.create({
  baseURL: LEARNING_JOURNEY_COURSE_ENDPOINT,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export const createLearningJourneyCourseMapping = async (LJId, courseIds) => {
  try {
    const LJCoursePromise = [];
    for (let i = 0; i < courseIds.length; i++) {
      LJCoursePromise.push(
        await axiosLJCourseInstance.post(`/learningJourneyId=${LJId}&courseId=${courseIds[i]}`)
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
