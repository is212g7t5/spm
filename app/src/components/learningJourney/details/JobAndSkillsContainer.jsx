import JobBadge from "./JobBadge";
import JobSkillBadge from "./JobSkillBadge";

export default function JobAndSkillsContainer({ LJId, skills, jobName, isJobActive }) {
  const skillList = skills.map((skill, index) => (
    <JobSkillBadge skillName={skill.skillName} key={index} />
  ));

  const noActiveSkillsMessage = <div className="text-sm italic text-center">
    No active skills for this job role
  </div>;

  return (
    <div className='flex flex-col w-48 mt-1 ml-9 lg:col-span-1 col-span-2'>
      <h2 className='mb-1 lg:text-lg font-bold text-center'>Target Job Role:</h2>
      <JobBadge jobName={jobName} isActive={isJobActive} />

      <div className='flex flex-col mt-2 rounded-lg shadow-lg'>
        {skillList.length === 0 ? noActiveSkillsMessage : skillList}
      </div>
    </div>
  );
}
