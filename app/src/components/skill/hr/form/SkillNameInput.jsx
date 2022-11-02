export default function SkillNameInput({ skillName, setSkillName }) {
  const handleSkillNameChange = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 50) {
      setSkillName(e.target.value);
    }
  };

  return (
    <label
      htmlFor='skillName'
      className='block mb-2 text-md font-medium text-gray-900 dark:text-gray-300 space-y-2'
    >
      <p>Skill Name</p>
      <p className='italic font-light text-gray-400 text-sm'>
        At least 1 character, maximum 50 characters. Whitespaces at the front and back will be
        removed.
      </p>
      <input
        type='text'
        id='skillName'
        value={skillName}
        onChange={handleSkillNameChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5'
        placeholder='e.g. Critical Thinking'
      />
    </label>
  );
}
