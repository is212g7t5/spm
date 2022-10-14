import { useState } from "react";
import SkillNameInput from "./form/SkillNameInput";
import SkillDescTextArea from "./form/SkillDescTextArea";

export default function HRCreateSkill() {
  const [skillName, setSkillName] = useState("");
  const [skillDesc, setSkillDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className='relative flex flex-col container max-w-7xl mt-10 bg-white p-10 mx-auto rounded-lg shadow-lg shadow-blue-200'>
      <h1 className='text-3xl text-left font-bold'>Create New Skill</h1>
      <form onSubmit={handleSubmit} className='pt-10'>
        <div className='mb-6'>
          <SkillNameInput skillName={skillName} setSkillName={setSkillName} />
        </div>
        <div className='mb-6'>
          <SkillDescTextArea skillDesc={skillDesc} setSkillDesc={setSkillDesc} />
        </div>
        <button
          type='submit'
          className='text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
        >
          Create Skill
        </button>
      </form>
    </div>
  );
}
