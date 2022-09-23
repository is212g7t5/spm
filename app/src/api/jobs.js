import axios from "axios";

const { REACT_APP_API_BASE_ENDPOINT } = process.env;

const JOB_ENDPOINT = `${REACT_APP_API_BASE_ENDPOINT}/api/v1/jobs`;

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
