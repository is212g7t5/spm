export default function JobSkills({ skills }) {
  const renderSkillsForJobRole = skills.map((skill, index) => (
    <SkillBody key={index} skill={skill} />
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
function SkillBody({ skill }) {
  const { skillId, skillName, skillDesc } = skill;
  return (
    <div className='flex flex-col w-full p-3 px-5 bg-primary rounded-lg mt-5'>
      <p className='text-lg font-bold text-white dark:text-white'>{skillName}</p>
      <p className='text-base text-white text-jusify'>{skillDesc}</p>
    </div>
  );
}
