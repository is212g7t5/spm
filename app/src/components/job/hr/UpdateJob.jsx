import { useState } from "react";
import { updateJob } from "src/api/jobs";
import { createJobSkill, deleteAllSkillsUnderJob } from "src/api/jobSkill";
import { useUpdateJobContext } from "src/contexts/UpdateJobContext";
import { useUserContext } from "src/contexts/UserContext";
import UpdateJobSuccess from "./UpdateJobSuccess";
import JobNameInput from "./form/JobNameInput";
import JobDescTextArea from "./form/JobDescTextArea";
import JobIsActiveToggle from "./form/JobIsActiveToggle";
import JobSkillSelection from "./form/JobSkillSelection";

export default function HRUpdateJob() {
  const { currentUserType } = useUserContext();
  const { updateJobRole } = useUpdateJobContext();

  const [jobName, setJobName] = useState(updateJobRole.jobName);
  const [jobDesc, setJobDesc] = useState(updateJobRole.jobDesc);
  const [jobIsActive, setJobIsActive] = useState(updateJobRole.isActive);
  const [errors, setErrors] = useState([]);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateJob(updateJobRole.jobId, jobName, jobDesc, jobIsActive);
    if (res.detail) {
      const errorList = [];
      if (Array.isArray(res.detail)) {
        res.detail.map((errorMsg) => errorList.push(errorMsg.msg));
      } else {
        errorList.push(res.detail);
      }
      setErrors(errorList);
    } else if (jobIsActive === false || jobIsActive === 0) {
      setDisplayPopup(true);
    } else {
      setErrors([]);
      await deleteAllSkillsUnderJob(updateJobRole.jobId);
      selectedSkills.map(async (skillId) => {
        await createJobSkill(res.job_id, skillId);
      });
      setDisplayPopup(true);
    }
  };

  const renderErrors =
    errors && errors.map && errors.map((error, index) => <p key={index}>{error}</p>);

  switch (currentUserType) {
    case "HR":
      return (
        <div className='relative flex flex-col container max-w-7xl mt-10 bg-white p-10 mx-auto rounded-lg shadow-lg'>
          <h1 className='text-3xl text-left font-bold'>Update Job</h1>
          <form onSubmit={handleSubmit} className='pt-10'>
            <div className='mb-6'>
              <JobNameInput jobName={jobName} setJobName={setJobName} jobIsActive={jobIsActive} />
            </div>
            <div className='mb-6'>
              <JobDescTextArea
                jobDesc={jobDesc}
                setJobDesc={setJobDesc}
                jobIsActive={jobIsActive}
              />
            </div>

            <JobSkillSelection
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
              jobIsActive={jobIsActive}
              jobId={updateJobRole.jobId}
            />

            <div className='mb-6'>
              <p className='block mb-2 text-md font-medium text-black'>Job Status</p>
              <JobIsActiveToggle jobIsActive={jobIsActive} setJobIsActive={setJobIsActive} />
            </div>
            <button
              type='submit'
              className='text-white bg-accent2 hover:bg-accent3 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              Update Job
            </button>
          </form>
          <div className='pt-5 text-red-500'>{renderErrors}</div>
          {displayPopup ? <UpdateJobSuccess jobName={jobName} jobIsActive={jobIsActive} /> : null}
        </div>
      );
    default:
      return <p>You are not logged in as HR so you cannot update job roles</p>;
  }
}
