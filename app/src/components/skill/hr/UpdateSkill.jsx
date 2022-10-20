import { useState } from "react";
import { useUpdateSkillContext } from "src/contexts/UpdateSkillContext";
import { useUserContext } from "src/contexts/UserContext";
import UpdateSkillSuccess from "./UpdateSkillSuccess";
import SkillNameInput from "./form/SkillNameInput";
import SkillDescTextArea from "./form/SkillDescTextArea";
import SkillIsActiveToggle from "./form/SkillIsActiveToggle";

export default function HRUpdateSkill() {
    const { currentUserType } = useUserContext();
    const { updateSkill } = useUpdateSkillContext();

    const [skillName, setSkillName] = useState(updateSkill.skillName);
    const [skillDesc, setSkillDesc] = useState(updateSkill.skillDesc);
    const [skillIsActive, setSkillIsActive] = useState(updateSkill.isActive);
    const [errors, setErrors] = useState([]);
    const [displayPopup, setDisplayPopup] = useState(false);

    const handleSubmit = async (e) => { // TODO (Charmaine): call API
        e.preventDefault();
        console.log("submit pressed");
    }

    const renderErrors = errors && errors.map && errors.map((error) => <p>{error}</p>);

    switch (currentUserType) {
        case "HR":
            return (
                <div className='relative flex flex-col container max-w-7xl mt-10 bg-white p-10 mx-auto rounded-lg shadow-lg shadow-blue-200'>
                    <h1 className='text-3xl text-left font-bold'>Update Skill</h1>
                    <form onSubmit={handleSubmit} className='pt-10'>
                        <div className='mb-6'>
                            <SkillNameInput skillName={skillName} setSkillName={setSkillName} />
                        </div>
                        <div className='mb-6'>
                            <SkillDescTextArea skillDesc={skillDesc} setSkillDesc={setSkillDesc} />
                        </div>
                        <div className='mb-6'>
                            <p className='block mb-2 text-md font-medium text-black'>Skill Status</p>
                            <SkillIsActiveToggle skillIsActive={skillIsActive} setSkillIsActive={setSkillIsActive} />
                        </div>
                        <button
                            type='submit'
                            className='text-white bg-accent2 hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                        >
                            Update Skill
                        </button>
                    </form>
                    <div className='pt-5 text-red-500'>{renderErrors}</div>
                    {displayPopup ? <UpdateSkillSuccess skillName={skillName} /> : null}
                </div>
            );
        default:
            return <p>You are not logged in as HR so you cannot update skills</p>;
    }
}