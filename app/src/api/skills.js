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
      console.log(combineCoursesToSkills(res.data));
      return combineCoursesToSkills(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Utility Functions
function transformSkills(snakeCaseSkills) {
  return snakeCaseSkills.map((skill) => transformSkill(skill));
}
function transformSkill(snakeCaseSkill) {
  return {
    skillId: snakeCaseSkill.skill_id,
    skillName: snakeCaseSkill.skill_name,
    skillDesc: snakeCaseSkill.skill_desc,
    isActive: snakeCaseSkill.is_active,
    courses: []
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
    isActive: snakeCaseCourse.is_active,
  };
}

function combineCoursesToSkills(coursesAndSkillsArray) {
  const skillsCombinedWithCorrespondingCourses = {};

  coursesAndSkillsArray.forEach((skillAndCourseInstance) => {
      skillsCombinedWithCorrespondingCourses[skillAndCourseInstance.skill_id] = {
        skillId: skillAndCourseInstance.skill_id,
        skillName: skillAndCourseInstance.skill_name,
        skillDesc: skillAndCourseInstance.skill_desc,
        isActive: skillAndCourseInstance.is_active,
        courses: skillAndCourseInstance.courses
      };
// how to populate course_name for each array of course related to skill?
  });

  return Object.values(skillsCombinedWithCorrespondingCourses);
}


