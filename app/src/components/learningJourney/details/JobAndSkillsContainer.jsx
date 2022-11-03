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
    <div className='flex flex-col w-full lg:w-48 mt-1 lg:ml-10 lg:col-span-1'>
      <h2 className='mb-1 text-xl font-semibold text-left lg:text-center'>Target Job Role:</h2>
      <JobBadge jobName={jobName} isActive={isJobActive} />

      <div className='flex flex-wrap lg:flex-col mt-2 rounded-lg shadow-lg'>
        {skillList.length === 0 ? noActiveSkillsMessage : skillList}
      </div>
    </div>
  );
}
