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
        readOnly
      />
      <div className="w-11 h-6 bg-gray-100 rounded-full peer peer-focus:ring-2 peer-focus:ring-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent3" />
      <span className='ml-3 text-sm font-medium text-black'>
        {jobIsActive ? "Active" : "Inactive"}
      </span>
    </label>
  )
}
