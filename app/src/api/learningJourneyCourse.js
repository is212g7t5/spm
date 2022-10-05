import axios from "axios";
import { LEARNING_JOURNEY_COURSE_ENDPOINT } from "./config";

const axiosLJInstance = axios.create({
    baseURL: LEARNING_JOURNEY_COURSE_ENDPOINT,
    timeout: 5000,
    headers: { "X-Custom-Header": "foobar" },
});

export const getLearningJourneyCoursesById = async (ljId) => {
    try {
        const res = await axiosLJInstance.get(`/${ljId}`);
        if (res) {
            return extractCourseIds(res.data);
        }
        throw new Error("No data returned from backend");
    } catch (error) {
        console.log(error);
        return [];
    }
};

function extractCourseIds(ljAndCourseIdsArray) {
    const courseIdArray = [];
    ljAndCourseIdsArray.forEach((ljAndCourseIdInstance) => {
        courseIdArray.push(ljAndCourseIdInstance.course_id);
    });
    return courseIdArray;
}
