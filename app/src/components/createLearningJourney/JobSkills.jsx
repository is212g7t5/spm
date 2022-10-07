// import { AcademicCapIcon } from "@heroicons/react/20/solid";
export default function JobSkills({ skills, openModal }) {
  const renderSkillsForJobRole = skills.map((skill, index) => (
    <SkillBody key={index} skill={skill} openModal={openModal} />
  ));

  return (
    <div className='flex-col mt-5'>
      <p className='text-lg font-bold text-gray-900 dark:text-white'>Skills Required:</p>
      <p className='text-sm font-light text-gray-900 dark:text-white italic'>
        Click on a skill to look for courses
      </p>
      {renderSkillsForJobRole}
    </div>
  );
}
function SkillBody({ skill, openModal }) {
  const { skillId, skillName, skillDesc } = skill;
  return (
    <div
      className='flex flex-col w-full mt-5 p-3 px-5 justify-between bg-primary rounded-lg shadow hover:shadow-2xl hover:bg-secondary cursor-pointer'
      aria-hidden='true'
      onClick={openModal}
    >
      <p className='text-lg font-bold text-white dark:text-white'>{skillName}</p>
      <p className='text-base text-white text-jusify'>{skillDesc}</p>
    </div>
  );
}