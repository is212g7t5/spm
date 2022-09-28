// jobs schema returned from BE
const jobs = {
    "job_id": 1,
    "job_name": "test_job",
    "job_desc": "test_desc",
    "is_active": true
}

// Schema for jobs and skills
const jobsAndSkills = {
  "job_id": 1,
  "job_name": "test",
  "job_desc": "test",
  "is_active": true,
  "skills": [
    {
      "skill_id": 1,
      "skill_name": "test_skill",
      "skill_desc": "test_desc",
      "is_active": true
    }
  ]
}

// course schema returned from BE
const course = [
    {
      "course_id": "string",
      "course_name": "string",
      "course_desc": "string",
      "course_status": "string",
      "course_type": "string",
      "course_category": "string"
    }
  ]
