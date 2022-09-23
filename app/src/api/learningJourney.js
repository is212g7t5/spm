import axios from "axios";
import { LEARNING_JOURNEY_ENDPOINT } from "./config";

const axiosLJInstance = axios.create({
  baseURL: LEARNING_JOURNEY_ENDPOINT,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export const getLearningJourney = async () => {
  try {
    const res = await axiosLJInstance.get("/");
    if (res) {
      return res.data;
    }
    throw res.error;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createLearningJourneyWithJobId = async () => {
  try {
    const res = await axiosLJInstance.post("/");
    if (res) {
      return res.data;
    }
    throw res.error;
  } catch (error) {
    console.log(error);
    return [];
  }
};
