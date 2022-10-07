import axios from "axios";
import { LEARNING_JOURNEY_COURSE_ENDPOINT } from "./config";

const axiosLJInstance = axios.create({
    baseURL: LEARNING_JOURNEY_COURSE_ENDPOINT,
    timeout: 5000,
    headers: { "X-Custom-Header": "foobar" },
});

export const getLearningJourneyCoursesById = async (LJId) => {
    try {
        const res = await axiosLJInstance.get(`/${LJId}`);
        if (res) {
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
