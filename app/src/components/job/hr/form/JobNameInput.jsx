import { useUpdateJobContext } from "src/contexts/UpdateJobContext";

export default function JobNameInput({ jobName, setJobName, jobIsActive }) {
  const { updateJobRole } = useUpdateJobContext();

  const handleJobNameChange = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 50) {
      setJobName(e.target.value);
    }
  };

  return (
    <label htmlFor='jobName' className='block mb-2 text-md font-medium text-black space-y-2'>
      <p>Job Name</p>
      <p className='italic font-light text-black text-sm'>
        At least 1 character, maximum 50 characters. Whitespaces at the front and back will be
        removed.
      </p>
      <input
        type='text'
        id='jobName'
        value={jobName}
        onChange={handleJobNameChange}
        className={`bg-gray-100 border border-gray-300 ${
          jobIsActive === false || jobIsActive === 0 ? "text-gray-500" : "text-black"
        } text-sm rounded-lg focus:ring-gray-400 focus:border-gray-500 block w-full p-2.5`}
        placeholder='e.g. Sales Engineer'
        disabled={jobIsActive === false || jobIsActive === 0}
      />
    </label>
  );
}
