import axios from "axios";
import { JOB_ENDPOINT } from "./config"

export const getJobs = async () => {
  try {
    const res = await axios.get(JOB_ENDPOINT);
    if (res) {
        return res.data;
    }
    throw res.error;
  } catch (error) {
    console.log(error);
    return []
  }
};
