export default function JobNameInput({ jobName, setJobName}) {
  const handleJobNameChange = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 50) {
      setJobName(e.target.value);
    }
  };

  return (
    <label
      htmlFor='jobName'
      className='block mb-2 text-md font-medium text-gray-900 dark:text-gray-300 space-y-2'
    >
      <p>Job Name</p>
      <p className='italic font-light text-gray-400 text-sm'>
        At least 1 character, maximum 50 characters. Whitespaces at the front and back
        will be removed.
      </p>
      <input
        type='text'
        id='jobName'
        value={jobName}
        onChange={handleJobNameChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        placeholder='e.g. Sales Engineer'
      />
    </label>
  )
}