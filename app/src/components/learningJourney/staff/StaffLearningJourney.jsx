import React, { useEffect, useState } from "react";
import { getJobById } from "src/api/jobs";
import { getLearningJourneysByStaffId } from "src/api/learningJourney";
import { mockLearningJourneys } from "src/utils/mocks";
import LearningJourneyTile from "../LearningJourneyTile";

function StaffLearningJourney(staffId) {
  const [learningJourneys, setLearningJourneys] = useState([]);

  const renderLearningJourneys = learningJourneys.map(
    ({ LJId, jobName, jobDesc, isJobActive }, index) => (
      <LearningJourneyTile
        key={index}
        LJId={LJId}
        jobName={jobName}
        jobDesc={jobDesc}
        isJobActive={isJobActive}
      />
    ),
  );

  useEffect(() => {
    let result;
    const jobsPromise = [];
    getAllLearningJourneysAndDetails(); // TODO: Change to getAllActiveJobs, Staff should not retrieve active jobs

    async function getAllLearningJourneysAndDetails() {
      const learningJourneysReturnedFromBackend = await getLearningJourneysByStaffId(staffId);
      for (let i = 0; i < learningJourneysReturnedFromBackend.length; i += 1) {
        jobsPromise.push(getJobById(learningJourneysReturnedFromBackend[i].jobId));
      }

      result = await Promise.all(jobsPromise);
      for (let i = 0; i < jobsPromise.length; i += 1) {
        learningJourneysReturnedFromBackend[i].jobName = result[i].jobName;
        learningJourneysReturnedFromBackend[i].jobDesc = result[i].jobDesc;
        learningJourneysReturnedFromBackend[i].isJobActive = result[i].isActive;
      }

      setLearningJourneys(mockLearningJourneys)

      // setLearningJourneys(learningJourneysReturnedFromBackend);
    }
  }, []);

  return (
    <div className='flex flex-col container w-9/12 max-w-7xl mt-10 p-10 mx-auto w-full bg-white rounded-lg shadow-lg shadow-blue-200'>
      <h1 className='text-3xl text-left font-bold'>My Learning Journeys</h1>
      <div className='flex grid lg:grid-cols-2 2xl:grid-cols-3 gap-4'>
        {learningJourneys.length === 0 ? "No Learning Journeys Found" : renderLearningJourneys}
      </div>
    </div>
  );
}

export default StaffLearningJourney;
