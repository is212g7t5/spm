import { useState } from "react";
import { useUpdateCourseContext } from "src/contexts/UpdateCourseContext";
import { useUserContext } from "src/contexts/UserContext";
import { getSkillIdsForCourse } from "src/api/skillCourse";
// import UpdateCourseSuccess from "./UpdateCourseSuccess";

export default function HRUpdateCourse() {
    const { currentUserType } = useUserContext();
    const { updateCourse } = useUpdateCourseContext();

    const [courseId, setCourseId] = useState(updateCourse.courseId);
    const [courseName, setCourseName] = useState(updateCourse.courseName);
    const [courseDesc, setCourseDesc] = useState(updateCourse.courseDesc);

    console.log(courseName);
    console.log(courseDesc);

    const handleSubmit = async (e) =>{
        // to be filled in. Use Create Skill Course API
    }

    switch(currentUserType) {
        case "HR":
            return (
                <div className='relative flex flex-col container max-w-7xl mt-10 bg-white p-10 mx-auto rounded-lg shadow-lg shadow-blue-200'>
                    <h1 className='text-3xl text-left font-bold'>Update Course</h1>
                    <p className='font-medium text-xl text-justify'>
        You have selected Course: {courseName}
      </p>
                    <form onSubmit={handleSubmit} className='pt-10'>
                    <div className = 'mb-6'>
                    test
                    </div>
                    </form>
                </div>
            );
        default:
            return <p>FK!!!!</p>
    }

}