import axios from "axios";
import { SKILL_ENDPOINT } from "./config";

const axiosSkillInstance = axios.create({
  baseURL: SKILL_ENDPOINT,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export const getSkillById = async (skillId) => {
  try {
    const res = await axiosSkillInstance.get(`/${skillId}`);
    if (res) {
      return skillSnakeToCamel(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getSkills = async (activeOnly) => {
  try {
    const res = await axios.get(`${SKILL_ENDPOINT}/all?active_only=${activeOnly}`);
    if (res) {
      console.log(skillsSnakeToCamel(res.data));
      return skillsSnakeToCamel(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllSkillsAndCourses = async () => {
  try {
    const res = await axios.get(`${SKILL_ENDPOINT}/courses/all`);
    if (res) {
      return transformSkills(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getActiveSkillsAndCourses = async () => {
  try {
    const res = await axios.get(`${SKILL_ENDPOINT}/courses/active`);
    if (res) {
      return transformSkills(res.data);
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createSkill = async (skillName, skillDesc) => {
  try {
    const res = await axios.post(`${SKILL_ENDPOINT}`, {
      skill_name: skillName,
      skill_desc: skillDesc,
    });
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    return error.response.data;
  }
};

export const updateSkillDetails = async (skillId, skillName, skillDesc, isActive) => {
  try {
    const res = await axios.put(`${SKILL_ENDPOINT}/${skillId}`, {
      skill_name: skillName,
      skill_desc: skillDesc,
      is_active: isActive,
    });
    if (res) {
      return res.data;
    }
    throw new Error("No data returned from backend");
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Utility Functions
function skillsSnakeToCamel(snakeCaseSkills) {
  return snakeCaseSkills.map((skill) => skillSnakeToCamel(skill));
}

function skillSnakeToCamel(snakeCaseSkill) {
  return {
    skillId: snakeCaseSkill.skill_id,
    skillName: snakeCaseSkill.skill_name,
    skillDesc: snakeCaseSkill.skill_desc,
    isActive: snakeCaseSkill.is_active,
  };
}

function transformSkills(snakeCaseSkills) {
  return snakeCaseSkills.map((skill) => transformSkill(skill));
}

function transformSkill(snakeCaseSkill) {
  const transformedCourses = transformCourses(snakeCaseSkill.courses);
  return {
    skillId: snakeCaseSkill.skill_id,
    skillName: snakeCaseSkill.skill_name,
    skillDesc: snakeCaseSkill.skill_desc,
    isActive: snakeCaseSkill.is_active,
    courses: transformedCourses,
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
    courseCategory: snakeCaseCourse.course_category,
  };
}
