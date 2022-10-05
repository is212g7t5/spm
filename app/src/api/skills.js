import axios from "axios";
import { SKILL_ENDPOINT } from "./config";

export const getSkills = async () => {
  try {
    const res = await axios.get(`${SKILL_ENDPOINT}/all`);
    if (res) {
      console.log(transformSkills(res.data))
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
    if (skillsCombinedWithCorrespondingCourses[skillAndCourseInstance.skill_id]) {
      skillsCombinedWithCorrespondingCourses[skillAndCourseInstance.skill_id].courses.push({
        courseId: skillAndCourseInstance.course_id,
        courseName: skillAndCourseInstance.course_name,
        courseDesc: skillAndCourseInstance.course_desc,
        isActive: skillAndCourseInstance.is_course_active,
      });
    } else {
      skillsCombinedWithCorrespondingCourses[skillAndCourseInstance.skill_id] = {
        skillId: skillAndCourseInstance.skill_id,
        skillName: skillAndCourseInstance.skill_name,
        skillDesc: skillAndCourseInstance.skill_desc,
        isActive: skillAndCourseInstance.is_skill_active,
        courses: [
          {
            courseId: skillAndCourseInstance.course_id,
            courseName: skillAndCourseInstance.course_name,
            courseDesc: skillAndCourseInstance.course_desc,
            isActive: skillAndCourseInstance.is_course_active,
          },
        ],
      };
    }
  });

  return Object.values(skillsCombinedWithCorrespondingCourses);
}

// function combineJobsToSkills(jobsAndSkillsArray) {
//   const skillsCombinedWithCorrespondingJobs = {};

//   jobsAndSkillsArray.forEach((skillAndJobInstance) => {
//     if (skillsCombinedWithCorrespondingJobs[skillAndJobInstance.skill_id]) {
//       skillsCombinedWithCorrespondingJobs[skillAndJobInstance.skill_id].jobs.push({
//         jobId: skillAndJobInstance.job_id,
//         jobName: skillAndJobInstance.job_name,
//         jobDesc: skillAndJobInstance.job_desc,
//         isActive: skillAndJobInstance.is_job_active,
//       });
//     } else {
//       skillsCombinedWithCorrespondingJobs[skillAndJobInstance.job_id] = {
//         skillId: skillAndJobInstance.skill_id,
//         skillName: skillAndJobInstance.skill_name,
//         skillDesc: skillAndJobInstance.skill_desc,
//         isActive: skillAndJobInstance.is_skill_active,
//         skills: [
//           {
//             jobId: skillAndJobInstance.job_id,
//             jobName: skillAndJobInstance.job_name,
//             jobDesc: skillAndJobInstance.job_desc,
//             isActive: skillAndJobInstance.is_job_active,
//           },
//         ],
//       };
//     }
//   });

//   return Object.values(skillsCombinedWithCorrespondingJobs);
// }

// Schema for skills
// {
//   "skill_id": int
//   "skill_name" str
//   "skill_desc" str
//   "is_active" boolean
// }
