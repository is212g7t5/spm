import React from "react";
import { mockLearningJourneys }  from "src/utils/mocks";
import LearningJourneyTile from "./LearningJourneyTile";

function LearningJourney() {


  const learningJourneyList = mockLearningJourneys.map((learningJourney, index) => (
    <LearningJourneyTile 
      key={index}
      learningId={learningJourney.learningId}
      jobName={learningJourney.jobName}
      jobDesc={learningJourney.jobDesc}
      isJobActive={learningJourney.isJobActive}
    />
  ));

  return (
    <div className='flex flex-col container w-9/12 max-w-7xl mt-10 p-10 mx-auto w-full bg-white rounded-lg shadow-lg shadow-blue-200'>
      <h1 className='text-3xl text-left font-bold'>My Learning Journeys</h1>
      <div className='flex grid lg:grid-cols-2 2xl:grid-cols-3 gap-4'>
        {learningJourneyList}
      </div>
    </div>
  );
}

export default LearningJourney;
