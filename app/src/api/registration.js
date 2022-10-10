import axios from "axios";
import { REGISTRATION_ENDPOINT } from "./config";

const axiosRegistrationInstance = axios.create({
    baseURL: REGISTRATION_ENDPOINT,
    timeout: 5000,
    headers: { "X-Custom-Header": "foobar" },
});

export const getRegistrationByStaffAndCourseId = async (staffId, courseId) => {
    try {
        const res = await axiosRegistrationInstance.get(`/staff_and_course/${staffId}&${courseId}`);
        if (res) {
            return transformRegistration(res.data);
        }
        throw new Error("No data returned from backend");
    } catch (error) {
        console.log(error);
        return {};
    }
};

function transformRegistration(snakeCaseRegistration) {
    return {
      regId: snakeCaseRegistration.reg_id,
      courseId: snakeCaseRegistration.course_id,
      staffId: snakeCaseRegistration.staff_id,
      regStatus: snakeCaseRegistration.reg_status,
      completionStatus: snakeCaseRegistration.completion_status
    };
  }
