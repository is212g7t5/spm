import axios from "axios";
import { LEARNING_JOURNEY_ENDPOINT, LEARNING_JOURNEY_COURSE_ENDPOINT } from "./config";

const axiosLJInstance = axios.create({
  baseURL: LEARNING_JOURNEY_ENDPOINT,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

const axiosLJCourseInstance = axios.create({
  baseURL: LEARNING_JOURNEY_COURSE_ENDPOINT,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export const getLearningJourneys = async () => {
  try {
    const res = await axiosLJInstance.get("/all");
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getLearningJourneyByLJId = async (LJId) => {
  try {
    const res = await axiosLJInstance.get(`/${LJId}`);
    if (res) {
      return transformLJ(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return {};
  }
}

export const getLearningJourneysByStaffId = async (staffId) => {
  try {
    const res = await axiosLJInstance.get(`/Staff/${staffId}`);
    if (res) {
      console.log(transformLearningJourneys(res.data));
      return transformLearningJourneys(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createLearningJourneyWithJobId = async (jobId) => {
  try {
    const res = await axiosLJInstance.post(`/jobId=${jobId}`);
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteLJWithLJId = async (ljId) => {
  try {
    const [deleteLJCourseRes, deleteLJRes] = await Promise.all([
      await axiosLJCourseInstance.delete(`all/${ljId.LJId}`),
      await axiosLJInstance.delete(`/${ljId.LJId}`),
    ]);

    if (deleteLJCourseRes && deleteLJRes) {
      return deleteLJCourseRes.data && deleteLJRes.data
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Utility Functions
function transformLearningJourneys(snakeCaseLJs) {
  return snakeCaseLJs.map((LJ) => transformLJ(LJ));
}
function transformLJ(snakeCaseLJ) {
  return {
    LJId: snakeCaseLJ.lj_id,
    staffId: snakeCaseLJ.staff_id,
    jobId: snakeCaseLJ.job_id,
  };
}
