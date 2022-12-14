import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useLJContext } from "src/contexts/LJContext";

export default function CourseModal({ skillId, coursesAndSkillsMapping, isModalOpen, closeModal }) {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const { addCoursesToLJ } = useLJContext();
  if (!isModalOpen) {
    return null;
  }

  const handleCloseModal = (e) => {
    if (e.target.id === "modal-outer") {
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
      className='fixed top-0 left-0 h-screen w-screen scale-100 backdrop-grayscale backdrop-blur-xl z-50'
      aria-hidden='true'
      onClick={handleCloseModal}
      id='modal-outer'
    >
      <div
        className='absolute flex flex-col justify-center space-y-5 mx-auto my-auto w-3/4 h-3/4 bg-gray-100 z-99 inset-0 shadow-lg rounded-lg items-center text-center'
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'
      >
        <ModalHeader closeModal={closeModal} />
        <p className='font-bold text-2xl'>Choose a course to add it to your Learning Journey!</p>
        <ModalBody
          skillId={skillId}
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
          coursesAndSkillsMapping={coursesAndSkillsMapping}
          handleAddCoursesToLJ={handleAddCoursesToLJ}
        />
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
      className='absolute top-0 right-0 text-primary-400 hover:bg-gray-100 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-100 dark:hover:text-white'
      data-modal-toggle='defaultModal'
      onClick={closeModal}
    >
      <XMarkIcon width={30} height={30} />
    </button>
  );
}

function ModalBody({
  skillId,
  coursesAndSkillsMapping,
  selectedCourses,
  setSelectedCourses,
  handleAddCoursesToLJ,
}) {
  const targetSkillWithCourses = coursesAndSkillsMapping.find((item) => item.skillId === skillId);

  if (!coursesAndSkillsMapping || !targetSkillWithCourses) {
    return <p className='font-bold text-red-500'>No courses currently active for this skill</p>;
  }

  const renderCourses = targetSkillWithCourses.courses.map((course, index) => {
    if (course.courseStatus === "Active") {
      return (
        <CourseRow
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
          course={course}
          key={index}
        />
      );
    }
    return null;
  });

  return (
    <div>
      <div
        className='bg-white rounded divide-gray-100 shadow position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 494.222px, 0px);'
        data-popper-reference-hidden=''
        data-popper-escaped=''
        data-popper-placement='bottom'
      >
        <ul
          className='w-full py-1 text-md text-black'
          aria-labelledby='dropdownDefault'
        >
          {renderCourses}
        </ul>
      </div>
      <AddCourseButton handleAddCoursesToLJ={handleAddCoursesToLJ} />
    </div>
  );
}

function AddCourseButton({ handleAddCoursesToLJ }) {
  return (
    <button
      type='button'
      className='text-white bg-secondary hover:bg-primary focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm mt-5 px-5 py-2.5 mr-2 mb-2'
      onClick={handleAddCoursesToLJ}
    >
      Add Courses
    </button>
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
    className = "py-2 px-4 w-full text-accent2 bg-white hover:bg-gray-200 text-start";
  } else {
    className =
      "py-2 px-4 w-full text-dark hover:bg-gray-200 hover:cursor-pointer text-start";
  }

  const handleClick = (course) => (e) => {
    e.stopPropagation();
    setSelectedCourses([course]);
  };

  return (
    <li className={className} aria-hidden='true' onClick={handleClick(course)}>
      <span className='font-bold'>{course.courseName}</span>
      <span className='bg-accent4 text-accent1 text-sm font-semibold ml-2 px-2.5 py-0.5 rounded'>
        {course.courseCategory}
      </span>
    </li>
  );
}
