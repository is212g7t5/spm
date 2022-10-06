import { useState, useEffect } from "react";
import { createJob } from "src/api/jobs";
import { getAllActiveSkills } from "src/api/skills";
import { createJobSkill } from "src/api/jobSkills";
import { useUserContext } from "src/contexts/UserContext";
import { XMarkIcon } from "@heroicons/react/20/solid";
import CreateJobSuccess from "./CreateJobSuccess";


export default function HRCreateJob() {
  const { currentUserType } = useUserContext();
  const [jobName, setJobName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [errors, setErrors] = useState([]);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [defaultSkillValue, setDefaultSkillValue] = useState("default");

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await createJob(jobName, jobDesc);
    if (res.detail) {
      const errorList = [];
      if (res.detail.map) {
        res.detail.map((errorMsg) => errorList.push(errorMsg.msg));
      } else {
        errorList.push(res.detail);
      }
      setErrors(errorList);
    } else {
      setErrors([]);
      selectedSkills.map(async (skillIndex) => {
        await createJobSkill(res.job_id, skills[skillIndex].skill_id);
      })
      setDisplayPopup(true);
    }
  }

  const handleJobNameChange = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 50) {
      setJobName(e.target.value);
    }
  }

  const handleJobDescChange = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 255) {
      setJobDesc(e.target.value);
    }
  }

  const renderErrors = errors && errors.map && errors.map((error) => (<p>{error}</p>));

  const resetFields = () => {
    setJobName("");
    setJobDesc("");
    setErrors([]);
    setDisplayPopup(false);
    setSelectedSkills([]);
  }

  const handleSkillChange = (e) => {
    e.preventDefault();
    setSelectedSkills([...selectedSkills, e.target.value])
    setDefaultSkillValue("default")
  }

  useEffect(() => {
    getAllSkills();

    async function getAllSkills() {
      const skillsReturnedFromBackend = await getAllActiveSkills();
      setSkills(skillsReturnedFromBackend);
      
    }
  }, []);

  const renderSkillsOptions = skills.map((skill, index) => (
    <option value={index}>{skill.skill_name}</option>
  ))

  const removeSkill = index => () => {
    setSelectedSkills(selectedSkills => selectedSkills.filter((_value, i) => i !== index));
  }

  const renderSelectedSkills = selectedSkills.map((skillIndex, index) => (
    <div className="flex bg-primaryColor text-textColor mr-2 px-3 py-1 space-x-2 rounded">
      <span>{skills[skillIndex].skill_name}</span>
      <button type="button" onClick={removeSkill(index)}>
        <XMarkIcon className="h-6 w-6 text-textColor2"/>
      </button>
    </div>
  ))

  switch (currentUserType) {
    case "HR":
      return (
        <div className='relative flex flex-col container max-w-7xl mt-10 bg-white p-10 mx-auto rounded-lg shadow-lg shadow-blue-200'>
          <h1 className='text-3xl text-left font-bold'>Create New Job</h1>
          <form onSubmit={handleSubmit} className="pt-10">
            <div className="mb-6">
              <label htmlFor="jobName" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300 space-y-2">
                <p>Job Name</p>
                <p className="italic font-light text-gray-400 text-sm">At least 1 character, maximum 50 characters. Whitespaces at the front and back will be removed.</p>
                <input type="text" id="jobName" value={jobName} onChange={handleJobNameChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="e.g. Sales Engineer"/>
              </label>
            </div>
            <div className="mb-6">
              <label htmlFor="jobDesc" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300 space-y-2">
                <p>Job Description</p>
                <p className="italic font-light text-gray-400 text-sm">At least 1 character, maximum 255 characters.</p>
                <textarea id="jobDesc" rows={5} value={jobDesc} onChange={handleJobDescChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                <p className="text-right text-sm">{jobDesc.length}/255</p>
              </label>
            </div>
            <div className="mb-6">
              <label htmlFor="jobDesc" className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300 space-y-2">
                <p>Skills</p>
                <p className="italic font-light text-gray-400 text-sm">At least 1 skill.</p>
                <select id="underline_select" onChange={handleSkillChange} className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" value={defaultSkillValue}>
                    <option selected value="default" disabled hidden>Add a skill</option>
                    {renderSkillsOptions}
                </select>
              </label>
              <div className="flex space-x-2">
                {renderSelectedSkills}
              </div>
            </div>
            <button type="submit" className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Create Job</button>
          </form>
          <div className="pt-5 text-red-500">
            {renderErrors}
          </div>
          {displayPopup ? <CreateJobSuccess jobName={jobName} resetFields={resetFields}/> : null}
        </div>
      )
    default:
      return <p>You are not logged in as HR so you cannot create job roles</p>;
  }
}
