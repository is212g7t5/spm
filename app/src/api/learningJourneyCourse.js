import axios from "axios";
import { LEARNING_JOURNEY_COURSE_ENDPOINT } from "./config";

const axiosLJCourseInstance = axios.create({
  baseURL: LEARNING_JOURNEY_COURSE_ENDPOINT,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});


export const deleteLearningJourneyCourseWithLJId = async (ljId) => {
  try {
    const res = await axiosLJCourseInstance.delete(`all/lj_id=${ljId}`);
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};