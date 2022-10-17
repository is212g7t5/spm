import React from "react";
import { useUserContext } from "src/contexts/UserContext";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CourseContainer from "./CourseContainer";
import JobAndSkillsContainer from "./JobAndSkillsContainer";

function LearningJourneyDetails() {
  const { currentUserId } = useUserContext();
  const { LJId } = useParams();
  const history = useHistory();

  // Validation for LJ ID here if needed in future
  if (!LJId) {
    toast.error("No Learning Journey ID provided");
    history.push("/learning-journeys");
  }

  return (
    <>
      <h1 className='my-2 lg:text-2xl font-bold lg:text-center'>Learning Journey {LJId}</h1>
      <div className='grid grid-cols-4'>
        <CourseContainer LJId={LJId} staffId={currentUserId} />
        <JobAndSkillsContainer LJId={LJId} />
      </div>
    </>
  );
}

export default LearningJourneyDetails;
