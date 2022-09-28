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
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};