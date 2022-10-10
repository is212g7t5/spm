import axios from "axios";
import { SKILL_ENDPOINT } from "./config";

export const getSkills = async () => {
  try {
    const res = await axios.get(`${SKILL_ENDPOINT}/all`);
    if (res) {
      console.log(transformSkills(res.data));
      return transformSkills(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllSkillsAndCourses = async () => {
  try {
    const res = await axios.get(`${SKILL_ENDPOINT}/courses`);
    if (res) {
      return combineCoursesToSkills(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

function combineCoursesToSkills(coursesAndSkillsArray) {
  const transformedSkills = transformSkills(coursesAndSkillsArray)
  return transformedSkills
}

// Utility Functions
function transformSkills(snakeCaseSkills) {
  return snakeCaseSkills.map((skill) => transformSkill(skill));
}
function transformSkill(snakeCaseSkill) {
  const transformedCourses = transformCourses(snakeCaseSkill.courses)
  return {
    skillId: snakeCaseSkill.skill_id,
    skillName: snakeCaseSkill.skill_name,
    skillDesc: snakeCaseSkill.skill_desc,
    isActive: snakeCaseSkill.is_active,
    courses: transformedCourses
  };
}

function transformCourses(snakeCaseCourses) {
  return snakeCaseCourses.map((course) => transformCourse(course));
}
function transformCourse(snakeCaseCourse) {
  return {
    courseId: snakeCaseCourse.course_id,
    courseName: snakeCaseCourse.course_name,
    courseDesc: snakeCaseCourse.course_desc,
    courseStatus: snakeCaseCourse.course_status,
    courseType: snakeCaseCourse.course_type,
    courseCategory: snakeCaseCourse.course_category
  };
}




