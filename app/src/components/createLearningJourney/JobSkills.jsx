export default function JobSkills({ skills, openModal, setCurrentSelectedSkill }) {
  const renderSkillsForJobRole = skills.map((skill, index) => (
    <SkillBody
      key={index}
      skill={skill}
      openModal={openModal}
      setCurrentSelectedSkill={setCurrentSelectedSkill}
    />
  ));

  return (
    <div className='flex-col mt-5'>
      <p className='text-lg font-bold text-black dark:text-white'>Skills Required:</p>
      <p className='text-sm font-light text-black dark:text-white italic'>
        Click on a skill to look for courses
      </p>
      {renderSkillsForJobRole}
    </div>
  );
}
function SkillBody({ skill, openModal, setCurrentSelectedSkill }) {
  const { skillId, skillName, skillDesc } = skill;

  const openModalAndSetSkillAsState = (e) => {
    openModal();
    setCurrentSelectedSkill(skillId);
  };

  return (
    <div
      className='flex flex-col w-full mt-5 p-3 px-5 justify-between bg-primary rounded-lg shadow hover:shadow-2xl hover:bg-secondary cursor-pointer'
      aria-hidden='true'
      onClick={openModalAndSetSkillAsState}
    >
      <p className='text-lg font-bold text-white dark:text-white'>{skillName}</p>
      <p className='text-base text-white text-jusify'>{skillDesc}</p>
    </div>
  );
}
