import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useLJCreationContext } from "src/contexts/LJCreationContext";

import SkillBadge from "../job/SkillBadge";

export default function index() {
  const history = useHistory();
  const { selectedJobRole } = useLJCreationContext();

  useEffect(() => {
    if (!selectedJobRole) {
      history.push("/jobs");
      toast.error(
        "You have been redirected. Please select a Job Role to create a learning journey",
      );
    }
  }, []);

  if (!selectedJobRole) {
    return <div>Loading ...</div>;
  }

  return (
    <div className='flex flex-col container w-9/12 max-w-7xl mt-10 p-10 mx-auto w-full bg-white rounded-lg shadow-lg shadow-blue-200 justify-around'>
      <h1 className='text-3xl text-left font-bold'>Create your Learning Journey</h1>
      <CreateLearningJourney selectedJobRole={selectedJobRole} />
    </div>
  );
}

function CreateLearningJourney({ selectedJobRole }) {
  return (
    <div className='flex-grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 mt-5'>
      <p className='font-medium text-xl text-justify'>
        You have selected Role: {selectedJobRole.jobName}
      </p>
      <JobTileDescription jobDesc={selectedJobRole.jobDesc} />
      <JobSkills skills={selectedJobRole.skills} />
    </div>
  );
}

function JobTileDescription({ jobDesc }) {
  return (
    <div className='flex flex-col w-full p-3 px-5 bg-slate-100 rounded-lg mt-5'>
      <p className='text-lg font-bold text-gray-900 dark:text-white'>Job Description:</p>
      <p className='text-base text-gray-900 dark:text-white text-jusify'>{jobDesc}</p>
    </div>
  );
}

function JobSkills({ skills }) {
  const renderSkillsForJobRole = skills.map((skill, index) => (
    <SkillBody key={index} skill={skill} />
  ));

  return (
    <div className='flex-col mt-5'>
      <p className='text-lg font-bold text-gray-900 dark:text-white'>Skills Required:</p>
      <p className='text-sm font-light text-gray-900 dark:text-white italic'>Click on a skill to look for courses</p>
      {renderSkillsForJobRole}
    </div>
  );
}
function SkillBody({ skill }) {
  const { skillId, skillName, skillDesc } = skill;
  return (
    <div className='flex flex-col w-full p-3 px-5 bg-red-100 rounded-lg mt-5'>
      <p className='text-lg font-bold text-gray-900 dark:text-white'>{skillName}</p>
      <p className='text-base text-gray-900 dark:text-white text-jusify'>{skillDesc}</p>
    </div>
  );
}
