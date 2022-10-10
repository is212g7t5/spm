import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useLJCreationContext } from "src/contexts/LJCreationContext";

export default function CourseModal({ skillId, coursesAndSkillsMapping, isModalOpen, closeModal }) {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const { addCoursesToLJ } = useLJCreationContext();
  if (!isModalOpen) {
    return null;
  }

  const handleCloseModal = (e) => {
    e.stopPropagation();
    if (!(e.target.id === "modal-base")) {
      closeModal();
    }
  };

  const handleAddCoursesToLJ = (e) => {
    e.stopPropagation();
    addCoursesToLJ(selectedCourses);
    closeModal();
  };

  return (
    <div
      className='fixed top-0 left-0 h-screen w-screen scale-100 grayscale backdrop-blur-3xl z-8'
      aria-hidden='true'
      onClick={handleCloseModal}
    >
      <div
        className='absolute flex flex-col justify-center space-y-5 mx-auto my-auto w-3/4 h-3/4 bg-slate-100 z-99 inset-0 shadow-lg rounded-lg shadow-blue-200 items-center text-center'
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'
        id='modal-base'
      >
        <ModalHeader closeModal={closeModal} />
        <p className=''>Choose a course to add it to your Learning Journey!</p>
        <ModalBody
          skillId={skillId}
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
          coursesAndSkillsMapping={coursesAndSkillsMapping}
        />
        <button
          type='button'
          className='text-white bg-secondary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          onClick={handleAddCoursesToLJ}
        >
          Add Courses
        </button>
      </div>
    </div>
  );
}

function ModalHeader({ closeModal }) {
  return (
    <div className='flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600'>
      <CloseModalButton closeModal={closeModal} />
    </div>
  );
}

function CloseModalButton({ closeModal }) {
  return (
    <button
      type='button'
      className='absolute top-0 right-0 text-primary-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      data-modal-toggle='defaultModal'
      onClick={closeModal}
    >
      <XMarkIcon width={30} height={30} />
    </button>
  );
}

function ModalBody({ skillId, coursesAndSkillsMapping, selectedCourses, setSelectedCourses }) {
  const targetSkillWithCourses = coursesAndSkillsMapping.find((item) => item.skillId === skillId);

  const renderCourses = targetSkillWithCourses.courses.map((course, index) => (
    <CourseRow
      selectedCourses={selectedCourses}
      setSelectedCourses={setSelectedCourses}
      course={course}
      key={index}
    />
  ));

  return (
    <div
      id='dropdown'
      className='bg-white rounded divide-gray-100 shadow dark:bg-gray-700 position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 494.222px, 0px);'
      data-popper-reference-hidden=''
      data-popper-escaped=''
      data-popper-placement='bottom'
    >
      <ul
        className='w-full py-1 text-md text-black dark:text-gray-200'
        aria-labelledby='dropdownDefault'
      >
        {renderCourses}
      </ul>
    </div>
  );
}

function CourseRow({ setSelectedCourses, selectedCourses, course }) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (selectedCourses.filter((c) => c.courseId === course.courseId).length) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [selectedCourses]);

  let className;
  if (isActive) {
    className = "py-2 px-4 w-full text-dark bg-accent3 dark:hover:bg-primary dark:hover:text-white";
  } else {
    className =
      "py-2 px-4 w-full text-dark hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white  hover:cursor-pointer";
  }

  const handleClick = (course) => (e) => {
    e.stopPropagation();
    setSelectedCourses([course]);
  };

  return (
    <li className={className} aria-hidden='true' onClick={handleClick(course)}>
      {course.courseName}
    </li>
  );
}
