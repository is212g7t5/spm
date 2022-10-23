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
    Object.keys(courseIds).forEach((courseId) => {
      LJCoursePromise.push(
        axiosLJCourseInstance.post("", {
          lj_id: LJId,
          course_id: courseId,
        }),
      );
    });

    const res = await Promise.all(LJCoursePromise);
    console.log(res);
    if (res) {
      return res;
    }
    throw new Error("Failed to create Learning Journey and Course mapping");
  } catch (error) {
    console.log(error);
    return { error: "Failed to create Learning Journey and Course mapping" };
  }
};

export const getCourseIdsFromLJId = async (LJId) => {
  try {
    const res = await axiosLJCourseInstance.get(`/${LJId}`);
    if (res) {
      console.log(res);
      return extractCourseIdsFromLJAndCourseIdsObjects(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

function extractCourseIdsFromLJAndCourseIdsObjects(LJAndCourseIds) {
  const courseIdArray = [];
  LJAndCourseIds.forEach((LJAndCourseIdInstance) => {
    courseIdArray.push(LJAndCourseIdInstance.course_id);
  });
  return courseIdArray;
}

export const deleteLJCourseWithLJId = async (LJId) => {
  try {
    const res = await axiosLJCourseInstance.delete(`all/${LJId}`);
    if (res) {
      console.log(res);
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return { error: "Failed to delete all LJ-Course mapping from LJ: " + LJId };
  }
};
