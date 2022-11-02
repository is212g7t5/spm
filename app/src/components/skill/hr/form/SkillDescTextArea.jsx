export default function SkillDescTextArea({ skillDesc, setSkillDesc }) {
  const handleSkillDescChange = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 255) {
      setSkillDesc(e.target.value);
    }
  };

  return (
    <label
      htmlFor='skillDesc'
      className='block mb-2 text-md font-medium text-gray-900 dark:text-gray-300 space-y-2'
    >
      <p>Skill Description</p>
      <p className='italic font-light text-gray-400 text-sm'>
        At least 1 character, maximum 255 characters.
      </p>
      <textarea
        id='skillDesc'
        rows={5}
        value={skillDesc}
        onChange={handleSkillDescChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5'
      />
      <p className='text-right text-sm'>{skillDesc.length}/255</p>
    </label>
  );
}
