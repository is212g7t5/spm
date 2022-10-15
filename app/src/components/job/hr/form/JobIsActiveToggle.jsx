export default function JobIsActiveToggle({ jobIsActive, setJobIsActive }) {
  const handleJobIsActiveChange = () => {
    setJobIsActive(!jobIsActive);
  };

  return (
    <label
      htmlFor='checked-toggle'
      className='inline-flex relative items-center cursor-pointer'
      onChange={handleJobIsActiveChange}
    >
      <input
        type='checkbox'
        value=''
        id='checked-toggle'
        className='sr-only peer'
        checked={jobIsActive}
      />
      <div className="w-11 h-6 bg-gray-100 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-100 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-200" />
      <span className='ml-3 text-sm font-medium text-black dark:text-black'>
        {jobIsActive ? "Active" : "Inactive"}
      </span>
    </label>
  )
}
