export const mockJobs = [
  {
    jobId: 1,
    jobName: "Software Engineer",
    jobDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit autem sequi quos deleniti vitae quasi nemo quia quam accusamus nobis a ducimus deserunt numquam earum, dignissimos mollitia tempora saepe magnam ex beatae unde dolorem? At ipsa placeat accusantium ea consequuntur. Laudantium beatae, sapiente cumque placeat dolores magni explicabo minima aliquam!",
    skills: [
      {
        skillId: 1,
        skillName: "Java",
        skillDesc:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit autem sequi quos deleniti vitae quasi nemo quia quam accusamus nobis a ducimus deserunt numquam earum, dignissimos mollitia tempora saepe magnam ex beatae unde dolorem? At ipsa placeat accusantium ea consequuntur. Laudantium beatae, sapiente cumque placeat dolores magni explicabo minima aliquam!",
      },
      {
        skillId: 2,
        skillName: "Python",
        skillDesc: "Python Description",
      },
      {
        skillId: 3,
        skillName: "C",
        skillDesc: "C Description",
      },
    ],
  },
  {
    jobId: 2,
    jobName: "Software Engineer",
    jobDesc: "Software Engineer Description",
    skills: [
      {
        skillId: 1,
        skillName: "Java",
        skillDesc: "Java Description",
      },
      {
        skillId: 2,
        skillName: "Python",
        skillDesc: "Python Description",
      },
      {
        skillId: 3,
        skillName: "C",
        skillDesc: "C Description",
      },
    ],
  },
  {
    jobId: 3,
    jobName: "Software Engineer",
    jobDesc: "Software Engineer Description",
    skills: [
      {
        skillId: 1,
        skillName: "Java",
        skillDesc: "Java Description",
      },
      {
        skillId: 2,
        skillName: "Python",
        skillDesc: "Python Description",
      },
      {
        skillId: 3,
        skillName: "C",
        skillDesc: "C Description",
      },
    ],
  },
];

export const mockJobAndSkills = {
  jobId: 1,
  jobName: "Data Analyst",
  jobDesc: "Turn data into meaningful insights",
  isActive: true,
  skills: [
    {
      skillId: 1,
      skillName: "Python Pandas",
      skillDesc: "Basic EDA",
      isActive: true,
    },
    {
      skillId: 2,
      skillName: "Tensorflow",
      skillDesc: "ML",
      isActive: true,
    },
    {
      skillId: 3,
      skillName: "Patience",
      skillDesc: "Data cleaning is lotsa work",
      isActive: true,
    },
  ],
};

export const mockCourses = [
  {
    courseId: "IS111",
    courseName: "Introduction to Information Systems",
    courseStatus: "Active",
    courseDesc:
      "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications.",
    registrationStatus: "Registered",
    completionStatus: "Completed",
  },
  {
    courseId: "IS112",
    courseName: "Data Management",
    courseStatus: "Retired",
    courseDesc:
      "This course will cover fundamentals of relational database theory, important data management concepts such as data modelling, database design, database implementation and searches in un-structured data (i.e., text) in current business information systems. A series of in-class exercises, tests, pop quiz and course project will help students understand covered topics. Students are expected to apply knowledge learned in the classroom to solve many problems based upon real-life business scenarios, while gaining hands-on experiences in designing, implementing, and managing database systems.",
    registrationStatus: "Registered",
    completionStatus: "Not Completed",
  },
  {
    courseId: "IS113",
    courseName: "Web Application Development 1",
    courseStatus: "Active",
    courseDesc:
      "Web applications are commonly used today by governments, enterprises, and even individuals to provide information, market products, etc. Ability to create web applications is thus a crucial skill for graduates in Information Systems. This course is designed to equip students with the knowledge and skill to develop well-styled database-driven web applications.",
    registrationStatus: "Waitlisted",
    completionStatus: "Not Completed",
  },
  {
    courseId: "IS212",
    courseName: "Software Project Management",
    courseStatus: "Active",
    courseDesc:
      "In this course, you will be exposed to Software Project management principles and techniques. Specifically, you will learn about Agile Methods to build software. You will be exposed to popular Agile methods such as Scrum. Techniques such as Pair Programming, C4 architecture, Test-Driven Development (TDD), Code Refactoring and Continuous Integration (CI). You will experience software development and project management by working in a team to develop a simple web application or an application that makes use of data analytics.",
    registrationStatus: "Rejected",
    completionStatus: "Not Completed",
  },
];

export const mockSkillAndCourses = [
  {
    skillId: 1,
    skillName: "Python Pandas",
    skillDesc: "Basic EDA",
    isActive: true,
    courses: [
      {
        courseId: 1,
        courseName: "Introduction to Information Systems 1",
        courseStatus: "Active",
        courseDesc:
          "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications.",
        registrationStatus: "Registered",
        completionStatus: "Completed",
      },
      {
        courseId: 2,
        courseName: "Introduction to Information Systems 2",
        courseStatus: "Active",
        courseDesc:
          "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications.",
        registrationStatus: "Registered",
        completionStatus: "Completed",
      },
      {
        courseId: 3,
        courseName: "Introduction to Information Systems 3",
        courseStatus: "Active",
        courseDesc:
          "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications.",
        registrationStatus: "Registered",
        completionStatus: "Completed",
      },
    ],
  },
  {
    skillId: 2,
    skillName: "Spring Boot",
    skillDesc: "Backend software engineering",
    isActive: false,
    courses: [
      {
        courseId: 1,
        courseName: "Introduction to Information Systems 1",
        courseStatus: "Active",
        courseDesc:
          "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications.",
        registrationStatus: "Registered",
        completionStatus: "Completed",
      },
      {
        courseId: 2,
        courseName: "Introduction to Information Systems 2",
        courseStatus: "Active",
        courseDesc:
          "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications.",
        registrationStatus: "Registered",
        completionStatus: "Completed",
      },
      {
        courseId: 3,
        courseName: "Introduction to Information Systems 3",
        courseStatus: "Active",
        courseDesc:
          "In this course students acquire foundational computer programming concepts and skills through Python, a widely-used programming language. Upon successful completion of this course, the students will understand and be able to appropriately apply fundamental programming concepts including variables, functions, parameters, loops and conditions as well as basic data structures including arrays (lists in Python) and hash tables (dictionaries in Python) in simple applications.",
        registrationStatus: "Registered",
        completionStatus: "Completed",
      },
    ],
  }
];

export const mockLearningJourneys = [
  {
    learningId: 1,
    jobName: "Visual Designer",
    jobDesc:
      "Designing visual elements that users see and interact with in order to create a good user experience.",
    isJobActive: true,
  },
  {
    learningId: 2,
    jobName: "Software Engineer",
    jobDesc:
      "Designing, developing, and testing software that runs on a computer or mobile device.",
    isJobActive: true,
  },
  {
    learningId: 3,
    jobName: "Accountant",
    jobDesc: "Accountants are responsible for preparing and examining financial records.",
    isJobActive: false,
  },
  {
    learningId: 4,
    jobName: "Data Scientist",
    jobDesc:
      "Data scientists are responsible for collecting, analyzing, and interpreting large amounts of data.",
    isJobActive: true,
  },
];
