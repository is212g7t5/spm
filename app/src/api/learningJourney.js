import axios from "axios";
import { LEARNING_JOURNEY_ENDPOINT } from "./config";
import { deleteLearningJourneyCourseWithLJId } from "./learningJourneyCourse"

const axiosLJInstance = axios.create({
  baseURL: LEARNING_JOURNEY_ENDPOINT,
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
    const deleteLJCourseRes = deleteLearningJourneyCourseWithLJId(ljId);
    if (deleteLJCourseRes) {
      try {
        const deleteLJRes = await axiosLJInstance.delete(`/${ljId}`);
        if (!deleteLJRes) {
          throw new Error("No data returned from backend");
        }
      }
      catch (error) {
        console.log(error);
    }
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
