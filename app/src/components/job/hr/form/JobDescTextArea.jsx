export default function JobDescTextArea({ jobDesc, setJobDesc }) {
  const handleJobDescChange = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 255) {
      setJobDesc(e.target.value);
    }
  };

  return (
    <label
      htmlFor='jobDesc'
      className='block mb-2 text-md font-medium text-gray-900 dark:text-gray-300 space-y-2'
    >
      <p>Job Description</p>
      <p className='italic font-light text-gray-400 text-sm'>
        At least 1 character, maximum 255 characters.
      </p>
      <textarea
        id='jobDesc'
        rows={5}
        value={jobDesc}
        onChange={handleJobDescChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
      />
      <p className='text-right text-sm'>{jobDesc.length}/255</p>
    </label>
  )
}