import { useHistory } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function CreateSkillSuccess({ skillName, resetFields }) {
  const redirectToCreateSkillPage = () => {
    resetFields();
  };

  const history = useHistory();

  const redirectToSkillPage = () => {
    history.push("/skills");
  };

  return (
    <div
      className='absolute flex flex-col justify-center space-y-5 mx-auto my-auto w-1/2 h-1/2 bg-gray-100 z-10 inset-0 shadow-lg rounded-lg shadow-blue-200 items-center text-center'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <CheckCircleIcon className='mx-auto h-20 w-20 text-green-500' aria-hidden='true' />
      <p className=''>Skill {skillName} has been successfully created!</p>
      <div className='flex space-x-5'>
        <button
          type='button'
          className='relative inline-flex items-center rounded-md border border-accent2 bg-transparent px-4 py-2 text-sm font-medium text-accent2 shadow-sm hover:text-tertiary hover:border-tertiary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800'
          onClick={redirectToCreateSkillPage}
        >
          <span>Create Another Skill</span>
        </button>
        <button
          type='button'
          className='relative inline-flex items-center rounded-md border border-transparent bg-accent2 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800'
          onClick={redirectToSkillPage}
        >
          <span>Return to Skills</span>
        </button>
      </div>
    </div>
  );
}
